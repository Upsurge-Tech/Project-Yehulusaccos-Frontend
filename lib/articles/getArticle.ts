import { Article } from "@/data-types/Article";
import articles from "@/data/articles";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { extractArticles } from "./server-utils";

const getArticle = async (
  id: number
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

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return { article, relatedArticles };
};

export default getArticle;
