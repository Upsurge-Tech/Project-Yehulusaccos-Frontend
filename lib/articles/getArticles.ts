import { Article } from "@/data-types/Article";
import articles from "@/data/articles";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

const getArticles = async ({
  page,
  size,
  offset,
}: {
  page: number;
  size: number;
  offset: number;
}): Promise<{ articles: Article[]; numPages: number } | { error: string }> => {
  //not yet connected to backend

  /*
    SELECT *
  FROM (
    SELECT DISTINCT id
    FROM ${articleTable}
    LIMIT ${size}
  ) AS unique_ids
  LEFT JOIN ${contentTable}
  ON unique_ids.id = ${contentTable}.id
  OFFSET ${size * (page - 1) + offset}
`
  */

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
        article: {
          id: articleTable.id,
          title: articleTable.title,
          thumbnail: articleTable.thumbnail,
          createdAt: articleTable.createdAt,
        },
        content: {
          id: contentTable.id,
          type: contentTable.type,
          data: contentTable.data,
          alt: contentTable.alt,
        },
      })
      .from(limitQuery)
      .leftJoin(contentTable, eq(articleTable.id, contentTable.articleId));

    const articles = { a: 1, b: 2 };
    for (let i = 0; i < res.length; i++) {
      const a = res[i].article;
    }

    // res.forEach(({ article }) => {
    //   if (article && visitedIds.has(article.id)) return;
    //   const contents: ArticleContent[] = [];
    //   articles.push({
    //     ...article,
    //     createdAt: article.createdAt.toISOString(),
    //     contents,
    //     excerpt: "",
    //   });
    //   visitedIds.add(article.id);
    // });

    // res.forEach(({ content }) => {});

    console.log("res is", res);
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "An error occurred" + JSON.stringify(e) };
    }
  }
  const afterOffsetArticles = articles.slice(offset);
  const numArticles = afterOffsetArticles.length;
  const numPages = Math.ceil(numArticles / size);

  const startIndex = (page - 1) * size;
  const endIndex = Math.min(startIndex + size, numArticles);
  const slicedArticles = afterOffsetArticles.slice(startIndex, endIndex);

  return { articles: slicedArticles, numPages };
};

export default getArticles;
