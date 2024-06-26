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
      .orderBy(desc(articleTable.id))
      .as("limited");

    //article--contentId
    const withLink = db
      .select({
        contentId: articleContentTable.id,
        type: articleContentTable.type,
      })
      .from(limited)
      .innerJoin(
        articleContentTable,
        eq(articleContentTable.articleId, limited.articleId)
      )
      .orderBy(asc(articleContentTable.id))
      .as("with_link");

    //article--contentId--content
    const withContent = await db
      .select({})
      .from(withLink)
      .innerJoin(contentTable, eq(withLink.contentId, contentTable.contentId));

    //article--contentId--content
    //risky thing is, articles that dont have contents or langs will be filtered out
    const withLang = await db
      .select({ articleLang: articleLangTable })
      .from(limited)
      .innerJoin(
        articleLangTable,
        eq(limited.articleId, articleLangTable.articleId)
      );

    const res2 = await db.select({ count: count() }).from(articleTable);
    const numPages = Math.ceil(res2[0].count / size);

    // console.log("res is", res);

    const result = extractArticles(withContent, withLang);
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
