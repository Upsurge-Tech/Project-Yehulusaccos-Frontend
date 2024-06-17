"use server";

import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getArticle from "./getArticle";
import { errorIfNotLoggedIn, removeFilesIfExist } from "./server-utils";

const deleteArticle = async (id: number): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;

  try {
    const result = await getArticle(id, false);
    if ("error" in result) return result;

    const { article } = result;
    const imagePaths: string[] = [
      article.thumbnail,
      ...article.contents
        .map((c) => (c.type === "image" ? c.src : ""))
        .filter((src) => src !== ""),
    ];
    await removeFilesIfExist(imagePaths);
    await db.delete(contentTable).where(eq(contentTable.articleId, id));
    await db.delete(articleTable).where(eq(articleTable.id, id));
  } catch (e) {
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to delete article" + errString };
  }
};

export default deleteArticle;
