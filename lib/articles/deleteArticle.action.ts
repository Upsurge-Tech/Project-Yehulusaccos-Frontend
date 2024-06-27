"use server";

import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getArticle from "./getArticle";
import {
  deleteArticleLangs,
  deleteContents,
  errorIfNotLoggedIn,
  removeImages,
} from "./server-utils";

const deleteArticle = async (id: number): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;

  try {
    const result = await getArticle(id, false);
    if ("error" in result) throw new Error(result.error);

    const { article } = result;
    const imageUrls: string[] = [
      article.thumbnail,
      ...article.contents
        .map((c) => (c.type === "image" ? c.src : ""))
        .filter((src) => src !== ""),
    ];
    await Promise.all([
      removeImages(imageUrls),
      db.delete(articleTable).where(eq(articleTable.id, id)),
      deleteContents(id),
      deleteArticleLangs(id),
    ]);
  } catch (e) {
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to delete article" + errString };
  }
};

export default deleteArticle;
