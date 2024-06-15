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
  const afterOffsetArticles = articles.slice(offset);
  const numArticles = afterOffsetArticles.length;
  const numPages = Math.ceil(numArticles / size);

  const startIndex = (page - 1) * size;
  const endIndex = Math.min(startIndex + size, numArticles);
  const slicedArticles = afterOffsetArticles.slice(startIndex, endIndex);

  return { articles: slicedArticles, numPages };
};

export default getArticles;
