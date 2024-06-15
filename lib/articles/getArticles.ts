import { Article } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { attachExcrept } from "./utils";

const getArticles = async ({
  page,
  size,
  offset,
}: {
  page: number;
  size: number;
  offset: number;
}): Promise<{ articles: Article[]; numPages: number } | { error: string }> => {
  try {
    const limitQuery = db
      .select()
      .from(articleTable)
      .limit(size)
      .offset(size * (page - 1) + offset)
      .orderBy(desc(articleTable.id))
      .as("limit query");

    const res = await db
      .select({
        dbArticle: {
          id: limitQuery.id,
          title: limitQuery.title,
          thumbnail: limitQuery.thumbnail,
          createdAt: limitQuery.createdAt,
        },
        dbContent: {
          id: contentTable.id,
          articleId: contentTable.articleId,
          type: contentTable.type,
          data: contentTable.data,
          alt: contentTable.alt,
        },
      })
      .from(limitQuery)
      .leftJoin(contentTable, eq(limitQuery.id, contentTable.articleId));

    const articles: Article[] = [];
    for (let i = 0; i < res.length; i++) {
      const { dbArticle } = res[i];
      articles.push({
        ...dbArticle,
        createdAt: dbArticle.createdAt.toISOString(),
        excerpt: "",
        contents: [],
      });

      while (
        i < res.length &&
        articles[articles.length - 1].id !== dbArticle.id
      ) {
        const content = res[i].dbContent;
        if (!content) {
          i++;
          break;
        }

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

    const res2 = await db.select({ count: count() }).from(articleTable);
    const numPages = Math.ceil(res2[0].count / size);

    console.log("res is", res);

    return { articles, numPages };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "An error occurred" + JSON.stringify(e) };
    }
  }
};

export default getArticles;
