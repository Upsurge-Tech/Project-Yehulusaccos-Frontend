import { Article } from "@/data-types/Article";
import db from "@/db";
import {
  articleContentTable,
  articleLangTable,
  articleTable,
  contentTable,
} from "@/db/schema";
import { asc, count, desc, eq } from "drizzle-orm";
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
  try {
    //counted articles
    const limited = db
      .select()
      .from(articleTable)
      .limit(size)
      .offset(size * (page - 1) + offset)
      .as("limited");

    const res = await db
      .select({
        articleId: limited.id,
        thumbnail: limited.thumbnail,
        articleCreatedAt: limited.createdAt,
        contentId: contentTable.contentId,
        data: contentTable.data,
        alt: contentTable.alt,
        type: articleContentTable.type,
        lang: contentTable.langId,
      })
      .from(limited)
      .orderBy(desc(limited.id), asc(contentTable.contentId))
      .innerJoin(
        articleContentTable,
        eq(limited.id, articleContentTable.articleId)
      )
      .innerJoin(
        contentTable,
        eq(articleContentTable.id, contentTable.contentId)
      );

    const withLang = await db
      .select({ articleId: limited.id, lang: articleLangTable.langId })
      .from(articleLangTable)
      .innerJoin(limited, eq(limited.id, articleLangTable.articleId));

    const res2 = await db.select({ count: count() }).from(articleTable);
    const numPages = Math.ceil(res2[0].count / size);

    const articles = await extractArticles(res, withLang);
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
