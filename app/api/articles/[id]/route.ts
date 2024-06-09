import { Article } from "@/data-types/Article";
import { NextRequest } from "next/server";
import { articles } from "@/data/articles";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const id = params.id;
  const article = articles.find((article) => article.id === Number(id));
  if (!article) {
    return Response.json({ error: "Article not found" }, { status: 404 });
  } else {
    return Response.json({ data: article });
  }
};
