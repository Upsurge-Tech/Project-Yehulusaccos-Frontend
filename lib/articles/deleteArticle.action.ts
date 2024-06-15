"use server";

import db from "@/db";
import { ContentSQL, articleTable, contentTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { removeFilesIfExist } from "./server-utils";

const deleteArticle = async (id: number): Promise<{ error: string } | void> => {
  let contents: ContentSQL[];
  try {
    contents = await db
      .select()
      .from(contentTable)
      .where(and(eq(contentTable.id, id), eq(contentTable.type, "image")));
  } catch (e) {
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to delete article" + errString };
  }

  const imagePaths = contents.map((content) => content.data);
  await removeFilesIfExist(imagePaths);
  try {
    await db.delete(contentTable).where(eq(contentTable.id, id));
    await db.delete(articleTable).where(eq(articleTable.id, id));
  } catch (e) {
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to delete article" + errString };
  }
};

export default deleteArticle;
