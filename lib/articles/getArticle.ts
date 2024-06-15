import { Article } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { extractArticles } from "./server-utils";

const getArticle = async (
  id: number,
  withRelatedArticles: boolean
): Promise<
  | { article: Article; relatedArticles: Article[] }
  | { error: "Not Found" | string }
> => {
  const res = await db
    .select()
    .from(articleTable)
    .where(eq(articleTable.id, id))
    .leftJoin(contentTable, eq(articleTable.id, contentTable.articleId));

  if (res.length === 0) {
    return { error: "Not Found" };
  }

  const result = extractArticles(res);
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
    const limitQuery = db
      .select()
      .from(articleTable)
      .limit(3)
      .orderBy(sql`ABS(${articleTable.id} - ${id})`)
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

    const result = extractArticles(res);
    if ("error" in result) {
      return result;
    }
    relatedArticles = result;
  }

  return { article, relatedArticles };
};

export default getArticle;
