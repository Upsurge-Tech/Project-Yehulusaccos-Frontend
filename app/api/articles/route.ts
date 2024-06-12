import { articles } from "@/data/articles";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  //not yet connected to backend
  const params = request.nextUrl.searchParams;
  const pageParam = params.get("page");
  const sizeParam = params.get("size");
  const offsetParam = params.get("offset");

  if (pageParam === null) {
    return Response.json(
      { error: "page query parameter is required" },
      { status: 200 }
    );
  }
  if (sizeParam === null) {
    return Response.json(
      { error: "size query parameter is required" },
      { status: 200 }
    );
  }

  const page = parseInt(pageParam);
  const size = parseInt(sizeParam);
  const offset = offsetParam ? parseInt(offsetParam) : 0;

  const afterOffsetArticles = articles.slice(offset);
  const numArticles = afterOffsetArticles.length;
  const numPages = Math.ceil(numArticles / size);

  const startIndex = (page - 1) * size;
  const endIndex = Math.min(startIndex + size, numArticles);
  const slicedArticles = afterOffsetArticles.slice(startIndex, endIndex);

  console.log("pagination status:", JSON.stringify({ numPages, numArticles }));
  return Response.json({ data: slicedArticles, numPages });
};

