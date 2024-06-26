import { Article } from "@/data-types/Article";
import db from "@/db";
import {
  articleContentTable,
  articleLangTable,
  articleTable,
  contentTable,
} from "@/db/schema";
import { asc, eq, sql } from "drizzle-orm";
import { extractArticles } from "./server-utils";

const getArticle = async (
  id: number,
  withRelatedArticles: boolean
): Promise<
  | { article: Article; relatedArticles: Article[] }
  | { error: "Not Found" | string }
> => {
  const withLink = db
    .select()
    .from(articleTable)
    .innerJoin(
      articleContentTable,
      eq(articleContentTable.articleId, articleTable.id)
    )
    .as("with_link");

  const withContent = await db
    .select({
      article: withLink.article,
      content: contentTable,
      articleContent: withLink.article_content,
    })
    .from(withLink)
    .innerJoin(
      contentTable,
      eq(withLink.article_content.id, contentTable.contentId)
    );

  const withLang = await db
    .select({ articleLang: articleLangTable })
    .from(withLink)
    .innerJoin(
      articleLangTable,
      eq(withLink.article.id, articleLangTable.articleId)
    );

  if (withContent.length === 0) {
    return { error: "Not Found" };
  }

  const result = extractArticles(withContent, withLang);
  if ("error" in result) {
    return result;
  }
  const article = result[0];

  // const res2 = await db.se;
  /*
SELECT *
FROM my_table
WHERE id <> :given_row_id
ORDER BY ABS(id - :given_row_id)
LIMIT 5;
*/
  let relatedArticles: Article[] = [];
  if (withRelatedArticles) {
    const limited = db
      .select()
      .from(articleTable)
      .limit(4)
      .orderBy(sql`ABS(${articleTable.id} - ${id})`)
      .as("limited");

    const withLink = db
      .select()
      .from(limited)
      .innerJoin(
        articleContentTable,
        eq(articleContentTable.articleId, limited.id)
      )
      .orderBy(asc(articleContentTable.id))
      .as("with_link");

    const withContent = await db
      .select({
        article: withLink.limited,
        content: contentTable,
        articleContent: withLink.article_content,
      })
      .from(withLink)
      .innerJoin(
        contentTable,
        eq(withLink.article_content.id, contentTable.contentId)
      );

    //risky thing is, articles that dont have contents or langs will be filtered out
    const withLang = await db
      .select({ articleLang: articleLangTable })
      .from(limited)
      .innerJoin(articleLangTable, eq(limited.id, articleLangTable.articleId));

    const result = extractArticles(withContent, withLang);
    if ("error" in result) {
      return result;
    }
    relatedArticles = result.filter((a) => a.id !== id);
  }

  return { article, relatedArticles };
};

export default getArticle;
