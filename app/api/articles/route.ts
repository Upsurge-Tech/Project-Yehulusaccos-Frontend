import { Article } from "@/data-types/Article";
import { NextRequest } from "next/server";
import { articles } from "@/data/articles";

export const GET = async (request: NextRequest) => {
  return Response.json({ data: articles });
};
