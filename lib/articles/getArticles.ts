import { Article } from "@/data-types/Article";
import articles from "@/data/articles";

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

  // try {
  //   const res = await db
  //     .select()
  //     .from(articleTable)
  //     .leftJoin(
  //       contentTable,
  //       on(articleTable.id, eq(articleTable.id, contentTable.id))
  //     )
  //     .limit(size)
  //     .offset(size * (page - 1) + offset);
  // } catch (e) {
  //   if (e instanceof Error) {
  //     return { error: e.message };
  //   } else {
  //     return { error: "An error occurred" + JSON.stringify(e) };
  //   }
  // }
  const afterOffsetArticles = articles.slice(offset);
  const numArticles = afterOffsetArticles.length;
  const numPages = Math.ceil(numArticles / size);

  const startIndex = (page - 1) * size;
  const endIndex = Math.min(startIndex + size, numArticles);
  const slicedArticles = afterOffsetArticles.slice(startIndex, endIndex);

  return { articles: slicedArticles, numPages };
};

export default getArticles;
