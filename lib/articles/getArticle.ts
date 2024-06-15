import { Article } from "@/data-types/Article";
import articles from "@/data/articles";

const getArticle = async (
  id: number
): Promise<
  | { article: Article; relatedArticles: Article[] }
  | { error: "Not Found" | string }
> => {
  const article = articles.find((article) => article.id === Number(id));
  if (!article) {
    return { error: "Not Found" };
  }

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return { article, relatedArticles };
};

export default getArticle;
