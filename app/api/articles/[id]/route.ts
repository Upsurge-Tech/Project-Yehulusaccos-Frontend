import { articles } from "@/data/articles";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const article = articles.find((article) => article.id === Number(id));
  if (!article) {
    return Response.json({ error: "Article not found" }, { status: 404 });
  } else {
    const relatedArticles = articles
      .filter((a) => a.id !== article.id)
      .slice(0, 3);
    return Response.json({ data: { article, relatedArticles } });
  }
};
