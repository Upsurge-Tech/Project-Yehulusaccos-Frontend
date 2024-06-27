import { cloudinary } from "@/cloudinary.config";
import {
  Article,
  ArticleContent,
  ArticleFormState,
  FormContent,
} from "@/data-types/Article";
import { Lang, langs } from "@/data-types/Languages";
import db from "@/db";
import {
  ArticleContentSQL,
  ArticleSQL,
  ContentSQL,
  LangSQL,
  adminTable,
  articleContentTable,
  articleLangTable,
  contentTable,
} from "@/db/schema";
import { asc, eq, or } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { getVideoId, sortLang } from "./utils";

export const removeImages = async (
  fileUrls: string[]
): Promise<{ error: string } | void> => {
  try {
    await Promise.all(
      fileUrls.map(async (url) => {
        const publicId = url.split("/")?.pop()?.split(".")[0];
        if (!publicId)
          throw new Error("Could not extract cloudinary public id from" + url);
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
      })
    );
  } catch (e) {
    if (e instanceof Error) return { error: e.message };
    else return { error: "Something went wrong" + JSON.stringify(e) };
  }
};

const mapToDbContent = (
  contents: FormContent[],
  articleContentLinks: ArticleContentSQL[]
): ContentSQL[] => {
  const inserts: ContentSQL[] = [];
  for (let i = 0; i < contents.length; i++) {
    const content = contents[i];
    const insert: ContentSQL = {
      id: -1,
      data: "",
      contentId: articleContentLinks[i].id,
      langId: "en",
      alt: "",
    };
    if (content.type === "image") {
      if (!content.src) throw new Error(`Empty image src at ${i + 1}th block`);
      inserts.push({ ...insert, data: content.src, alt: content.alt });
    } else if (content.type === "youtube") {
      const videoId = getVideoId(content.youtubeLink);
      if (!videoId) throw new Error(`Invalid youtube link at ${i + 1}th block`);
      inserts.push({ ...insert, data: videoId });
    } else if (content.type === "heading") {
      for (const lang of langs) {
        inserts.push({ ...insert, data: content.heading[lang], langId: lang });
      }
    } else if (content.type === "paragraph") {
      for (const lang of langs) {
        inserts.push({
          ...insert,
          data: content.paragraph[lang],
          langId: lang,
        });
      }
    } else if (content.type === "title") {
      for (const lang of langs) {
        inserts.push({ ...insert, data: content.title[lang], langId: lang });
      }
    } else {
      throw new Error(`Unknown type  at ${i + 1}th block`);
    }
  }

  return inserts;
};

export const insertContents = async (
  articleId: number,
  article: ArticleFormState
) => {
  try {
    const allContents: FormContent[] = [article.title, ...article.contents];

    await db
      .insert(articleContentTable)
      .values(allContents.map((c) => ({ articleId, type: c.type })));

    const articleContentLinks = await db
      .select()
      .from(articleContentTable)
      .orderBy(asc(articleContentTable.id))
      .where(eq(articleContentTable.articleId, articleId));

    if (articleContentLinks.length !== allContents.length) {
      throw new Error(
        `Article content links and contents are not equal for
         ${articleId}, ${articleContentLinks.length} ${allContents.length}`
      );
    }

    await db.insert(contentTable).values(
      mapToDbContent(allContents, articleContentLinks).map((c) => ({
        ...c,
        id: undefined,
      }))
    );
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "Something went wrong" + JSON.stringify(e) };
    }
  }
};

export const deleteContents = async (articleId: ArticleSQL["id"]) => {
  //cascade delete does not work, not sure why

  const res = await db
    .select()
    .from(articleContentTable)
    .where(eq(articleContentTable.articleId, articleId));

  await db
    .delete(contentTable)
    .where(or(...res.map((r) => eq(contentTable.contentId, r.id))));

  await db
    .delete(articleContentTable)
    .where(eq(articleContentTable.articleId, articleId));
};

export const deleteArticleLangs = async (articleId: ArticleSQL["id"]) => {
  await db
    .delete(articleLangTable)
    .where(eq(articleLangTable.articleId, articleId));
};

export const insertArticleLangs = async (
  articleId: ArticleSQL["id"],
  langs: Lang[]
) => {
  await db
    .insert(articleLangTable)
    .values(langs.map((lang) => ({ articleId, langId: lang })));
};

const makeExcrept = (data: string): string => {
  const maxWords = 7;
  return data.split(" ").slice(0, maxWords).join(" ") + "...";
};

//res is assumed to be orderd by articleId (reversed), then by contentId
const errorIfInvalidArticles = (articles: Article[]) => {
  //to prevent unsorted articles

  let lastArticleId = Infinity;
  for (const article of articles) {
    if (!article.langIds || article.langIds.length === 0) {
      throw new Error(`Article ${article.id} has no lang`);
    }
    if (article.id > lastArticleId) {
      throw new Error(
        `Articles are not ordered by id, id:${article.id} appeard after id:${lastArticleId}`
      );
    }

    //db content with same id but different lang, should be merged in content
    const contentIds = new Set<ArticleContent["id"]>();
    for (const content of article.contents) {
      if (contentIds.has(content.id)) {
        throw new Error(
          `Duplicate content id, ${content.id} in article ${article.id}`
        );
      }
    }
  }
};

interface FlatArticleContentRes {
  articleId: ArticleSQL["id"];
  thumbnail: ArticleSQL["thumbnail"];
  articleCreatedAt: ArticleSQL["createdAt"];
  contentId: ArticleContentSQL["id"];
  data: ContentSQL["data"];
  alt: ContentSQL["alt"];
  type: ArticleContentSQL["type"];
  lang: ContentSQL["langId"];
}
interface FlatArticleLangRes {
  articleId: ArticleSQL["id"];
  lang: LangSQL["id"];
}
export const extractArticles = async (
  ac: FlatArticleContentRes[],
  al: FlatArticleLangRes[]
): Promise<Article[]> => {
  const articleLangsMap: { [key: number]: Lang[] } = {};
  for (const { lang, articleId } of al) {
    if (!articleLangsMap[articleId]) articleLangsMap[articleId] = [];
    //consistent sorting is nicer
    articleLangsMap[articleId].push(lang);
    articleLangsMap[articleId] = sortLang(articleLangsMap[articleId]);
  }
  console.log(
    "articel langs map",
    articleLangsMap,
    "article langs",
    articleLangsMap[4]
  );

  const articles: Article[] = [];

  let i = 0;

  while (i < ac.length) {
    articles.push({
      id: ac[i].articleId,
      thumbnail: ac[i].thumbnail,

      createdAt: ac[i].articleCreatedAt.toLocaleString("en-US", {
        timeZone: "UTC",
      }),
      title: { en: "", am: "" },
      langIds: articleLangsMap[ac[i].articleId],
      excerpt: { en: "", am: "" },
      contents: [],
    });

    const article = articles[articles.length - 1];

    while (i < ac.length && ac[i].articleId === article.id) {
      //pause for content with df langs
      const langToData: { [key in Lang]: string } = { en: "", am: "" };
      const { type, contentId } = ac[i];
      while (i < ac.length && ac[i].contentId === contentId) {
        const { lang, data, alt } = ac[i];

        if (type === "title") {
          article.title[lang] = data;
          console.log(
            "article.title = ",
            article.title,
            "lang",
            lang,
            "data",
            data
          );
        } else if (type === "heading" || type === "paragraph") {
          langToData[lang] = data;
          if (!article.excerpt[lang]) article.excerpt[lang] = makeExcrept(data);
        } else if (type === "image") {
          article.contents.push({
            type,
            src: data,
            alt: alt || "",
            id: contentId,
          });
        } else if (type === "youtube") {
          article.contents.push({ type, youtubeId: data, id: contentId });
        } else {
          throw new Error(`Unknown type ${type}`);
        }
        i++;
      }
      if (type === "heading") {
        article.contents.push({ type, heading: langToData, id: contentId });
      } else if (type === "paragraph") {
        article.contents.push({ type, paragraph: langToData, id: contentId });
      }
    }
  }

  errorIfInvalidArticles(articles);

  return articles;
};

export const errorIfNotLoggedIn = async (): Promise<{
  error: string;
} | void> => {
  const session = await getServerSession();
  if (session === null) {
    return { error: "You are not logged in" };
  } else if (session && session.user.id) {
    try {
      const res = await db
        .select()
        .from(adminTable)
        .where(eq(adminTable.id, session.user.id));
      if (!res.length) return { error: "Logged in user does not exist" };
    } catch (e) {
      if (e instanceof Error) {
        return { error: e.message };
      } else {
        return { error: `Something went wrong ${JSON.stringify(e)}` };
      }
    }
  }
  return;
};

export const errorIfBadArticle = (article: ArticleFormState) => {
  if (article.langs.length === 0) throw new Error("No langs selected");
  if (!article.thumbnail.src) throw new Error("Thumbnail is required");
  //check lang not empty
  for (const content of [article.title, ...article.contents]) {
    const t = content.type;
    let langMap: { [key in Lang]: string };
    if (t === "heading") langMap = content.heading;
    else if (t === "paragraph") langMap = content.paragraph;
    else if (t === "title") langMap = content.title;
    else {
      continue;
    }
    for (const lang of article.langs) {
      if (!langMap[lang]) throw new Error(`Empty ${t} in ${lang}`);
    }
  }

  for (let i = 0; i < article.contents.length; i++) {
    const content = article.contents[i];
    if (content.type === "youtube") {
      if (!content.youtubeLink)
        throw new Error(`Empty youtube link at ${i + 1}th block`);
    } else if (content.type === "image") {
      if (!content.src) throw new Error(`Empty image at ${i + 1}th block`);
    }
  }
};
