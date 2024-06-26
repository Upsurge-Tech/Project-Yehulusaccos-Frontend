import { Article } from "@/data-types/Article";
import db from "@/db";
import {
  articleContentTable,
  articleLangTable,
  articleTable,
  contentTable,
} from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { extractArticles } from "./server-utils";

const getArticle = async (
  id: number,
  withRelatedArticles: boolean
): Promise<
  | { article: Article; relatedArticles: Article[] }
  | { error: "Not Found" | string }
> => {
  try {
    const res = await db
      .select({
        articleId: articleTable.id,
        thumbnail: articleTable.thumbnail,
        articleCreatedAt: articleTable.createdAt,
        contentId: contentTable.contentId,
        data: contentTable.data,
        alt: contentTable.alt,
        type: articleContentTable.type,
        lang: contentTable.langId,
      })
      .from(articleTable)
      .innerJoin(
        articleContentTable,
        eq(articleTable.id, articleContentTable.articleId)
      )
      .innerJoin(
        contentTable,
        eq(articleContentTable.id, contentTable.contentId)
      );

    const withLang = await db
      .select({
        articleId: articleLangTable.articleId,
        lang: articleLangTable.langId,
      })
      .from(articleLangTable)
      .where(eq(articleLangTable.articleId, id));

    if (res.length === 0) {
      return { error: "Not Found" };
    }

    const article = (await extractArticles(res, withLang))[0];

    let relatedArticles: Article[] = [];
    if (withRelatedArticles) {
      const limited = db
        .select()
        .from(articleTable)
        .limit(4)
        .orderBy(sql`ABS(${articleTable.id} - ${id})`)
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

      const result = await extractArticles(res, withLang);
      relatedArticles = result.filter((a) => a.id !== id);
    }

    return { article, relatedArticles };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "An error occurred: " + JSON.stringify(e) };
    }
  }
};

export default getArticle;
