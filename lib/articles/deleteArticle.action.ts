"use server";

import db from "@/db";
import { ContentSQL, articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { removeFilesIfExist } from "./server-utils";

const deleteArticle = async (id: number): Promise<{ error: string } | void> => {
  let contents: ContentSQL[];
  try {
    contents = await db
      .select()
      .from(contentTable)
      .where(eq(contentTable.id, id));
  } catch (e) {
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to delete article" + errString };
  }

  const imagePaths = contents.map((content) => content.data);
  await removeFilesIfExist(
    imagePaths.map((imagePath) => path.join(process.cwd(), "public", imagePath))
  );
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
