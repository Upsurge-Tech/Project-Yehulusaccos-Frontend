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
  contentTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { getVideoId } from "./utils";

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
): Promise<{ error: string } | void> => {
  try {
    const allContents: FormContent[] = [article.title, ...article.contents];

    await db
      .insert(articleContentTable)
      .values(allContents.map((c) => ({ articleId, type: c.type })));

    const articleContentLinks = await db
      .select()
      .from(articleContentTable)
      .where(eq(articleContentTable.articleId, articleId));

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

export const deleteContents = async (
  articleId: number
): Promise<void | { error: string }> => {
  //cascade delete does not work, not sure why
  const links = db
    .select()
    .from(articleContentTable)
    .where(eq(articleContentTable.articleId, articleId))
    .as("links");

  try {
    await db
      .with(links)
      .delete(contentTable)
      .where(eq(contentTable.contentId, links.id));

    await db
      .with(links)
      .delete(articleContentTable)
      .where(eq(links.articleId, articleId));
  } catch (e) {
    if (e instanceof Error) return { error: e.message };
    else return { error: "Something went wrong" + JSON.stringify(e) };
  }
};

const makeExcrept = (data: string): string => {
  const maxWords = 7;
  return data.split(" ").slice(0, maxWords).join(" ");
};

//res is assumed to be orderd by articleId (reversed), then by contentId
const errorIfInvalidArticles = (articles: Article[]) => {
  //to prevent unsorted articles
  let lastArticleId = Infinity;
  for (const article of articles) {
    if (article.id > lastArticleId) {
      return {
        error: `Articles are not ordered by id, id:${article.id} appeard after id:${lastArticleId}`,
      };
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
    articleLangsMap[articleId].push(lang);
  }

  const articles: Article[] = [];

  let i = 0;
  console.log("ac length is", ac.length);
  console.log("ac is", ac);
  console.log("outer outer - i is", i);

  while (i < ac.length) {
    // await new Promise((r) => setTimeout(r, 1000));
    console.log("outer- i is", i);

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

    //pause for article
    const article = articles[articles.length - 1];

    console.log(
      i < ac.length,
      ac[i].articleId === article.id,
      "article id is",
      article.id
    );
    while (i < ac.length && ac[i].articleId === article.id) {
      // await new Promise((r) => setTimeout(r, 1000));
      console.log("inner- i is", i);
      //pause for content with df langs
      const langToData: { [key in Lang]: string } = { en: "", am: "" };
      const { type, contentId } = ac[i];
      while (i < ac.length && ac[i].contentId === contentId) {
        const { lang, data, alt } = ac[i];
        // await new Promise((r) => setTimeout(r, 1000));
        console.log("inner most- i is", i);
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
