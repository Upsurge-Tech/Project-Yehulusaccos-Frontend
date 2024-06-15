import getArticles from "@/lib/articles/getArticles";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest): Promise<Response> => {
  //not yet connected to backend
  const params = request.nextUrl.searchParams;
  const pageParam = params.get("page");
  const sizeParam = params.get("size");
  const offsetParam = params.get("offset");

  if (pageParam === null) {
    return Response.json(
      { error: "page query parameter is required" },
      { status: 400 }
    );
  }
  if (sizeParam === null) {
    return Response.json(
      { error: "size query parameter is required" },
      { status: 400 }
    );
  }

  const page = parseInt(pageParam);
  const size = parseInt(sizeParam);
  const offset = offsetParam ? parseInt(offsetParam) : 0;

  const res = await getArticles({ page, size, offset });
  if ("error" in res) {
    return Response.json(res, { status: 500 });
  } else {
    return Response.json(
      { data: res.articles, numPages: res.numPages },
      { status: 200 }
    );
  }
};
