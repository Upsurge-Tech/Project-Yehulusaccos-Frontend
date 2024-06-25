import { Article } from "@/data-types/Article";
import articles from "@/data/articles";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { extractArticles } from "./server-utils";

const getArticles = async ({
  page,
  size,
  offset,
}: {
  page: number;
  size: number;
  offset: number;
}): Promise<{ articles: Article[]; numPages: number } | { error: string }> => {
  //not yet connected to new db
  //pagination logic is also not yet implemented, no problem, only focus on correctly diplaying the articles
  return { articles, numPages: 1 };
};

const _getArticles = async ({
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
      .as("limit_query");

    const res = await db
      .select({
        article: {
          id: limitQuery.id,
          title: limitQuery.title,
          thumbnail: limitQuery.thumbnail,
          createdAt: limitQuery.createdAt,
        },
        content: {
          id: contentTable.id,
          articleId: contentTable.articleId,
          type: contentTable.type,
          data: contentTable.data,
          alt: contentTable.alt,
        },
      })
      .from(limitQuery)
      .leftJoin(contentTable, eq(limitQuery.id, contentTable.articleId));

    const res2 = await db.select({ count: count() }).from(articleTable);
    const numPages = Math.ceil(res2[0].count / size);

    // console.log("res is", res);

    const result = extractArticles(res);
    if ("error" in result) return result;
    return { articles: result, numPages };
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
