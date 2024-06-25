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
    const limitedArticle = db
      .select()
      .from(articleTable)
      .limit(size)
      .offset(size * (page - 1) + offset)
      .orderBy(desc(articleTable.id))
      .as("limited");

    //article--contentId
    const articleWithContentId = db
      .select()
      .from(limitedArticle)
      .innerJoin(
        articleContentTable,
        eq(articleContentTable.articleId, limitedArticle.id)
      )
      .orderBy(asc(articleContentTable.id))
      .as("with_content_id");

    //article--contentId--content
    const articleWithContent = await db
      .select({
        article: articleWithContentId.limited,
        content: contentTable,
      })
      .from(articleWithContentId)
      .innerJoin(
        contentTable,
        eq(articleWithContentId.article_content.id, contentTable.id)
      );

    //article--contentId--content
    //risky thing is, articles that dont have contents or langs will be filtered out
    const articleWithLang = await db
      .select({
        articleId: limitedArticle.id,
        langId: articleLangTable.langId,
      })
      .from(limitedArticle)
      .innerJoin(
        articleLangTable,
        eq(limitedArticle.id, articleLangTable.articleId)
      );

    const res2 = await db.select({ count: count() }).from(articleTable);
    const numPages = Math.ceil(res2[0].count / size);

    // console.log("res is", res);

    const result = extractArticles(articleWithContent, articleWithLang);
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
