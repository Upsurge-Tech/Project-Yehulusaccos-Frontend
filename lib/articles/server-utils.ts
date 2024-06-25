import { cloudinary } from "@/cloudinary.config";
import { Article, ArticleFormState, FormContent } from "@/data-types/Article";
import { langs } from "@/data-types/Languages";
import db from "@/db";
import {
  ArticleContentSQL,
  ContentSQL,
  adminTable,
  articleContentTable,
  contentTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { attachExcrept, getVideoId } from "./utils";

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
      type: content.type,
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
      .values(allContents.map(() => ({ articleId })));

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

interface Res {
  article: {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: Date;
  };
  content: {
    id: number;
    data: string;
    articleId: number;
    type: "heading" | "paragraph" | "image" | "youtube";
    alt: string | null;
  } | null;
}
export const extractArticles = (res: Res[]): Article[] | { error: string } => {
  const articles: Article[] = [];
  for (let i = 0; i < res.length; i++) {
    const { article } = res[i];
    articles.push({
      ...article,
      createdAt: article.createdAt.toLocaleString("en-Us", {
        timeZone: "UTC",
      }),
      excerpt: "",
      contents: [],
    });

    while (
      i < res.length &&
      articles[articles.length - 1].id === res[i].article.id
    ) {
      const content = res[i].content;
      if (!content) break;

      const { data, alt, id, articleId, type } = content;
      const lastArticle = articles[articles.length - 1];
      if (type === "heading") {
        lastArticle.contents.push({ type, heading: data, id, articleId });
      } else if (type === "image") {
        const content = { type, src: data, alt: alt || "", id, articleId };
        lastArticle.contents.push(content);
      } else if (type === "paragraph") {
        lastArticle.contents.push({ type, paragraph: data, id, articleId });
      } else if (type === "youtube") {
        lastArticle.contents.push({ type, youtubeId: data, id, articleId });
      } else {
        return { error: `Unknown type ${type} in article id ${articleId}` };
      }
      i++;
    }
  }

  articles.map(attachExcrept);
  articles.forEach((a) => a.contents.sort((a, b) => a.id - b.id));
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
