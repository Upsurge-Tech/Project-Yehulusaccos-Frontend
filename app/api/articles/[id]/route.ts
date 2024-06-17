import getArticle from "@/lib/articles/getArticle";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  const res = await getArticle(Number(id), true);
  if ("error" in res) {
    if (res.error === "Not Found") {
      return Response.json({ error: "Article not found" }, { status: 404 });
    } else {
      return Response.json({ error: res.error }, { status: 500 });
    }
  }

  return Response.json({ data: res });
};
