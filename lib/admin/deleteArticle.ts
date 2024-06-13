"use server";

import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import path from "path";
import { removeFilesIfExist } from "./image";

const deleteArticle = async (id: number): Promise<{ error: string } | void> => {
  const contents = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, id));

  const imagePaths = contents.map((content) => content.data);
  await removeFilesIfExist(
    imagePaths.map((imagePath) => path.join(process.cwd(), "public", imagePath))
  );
  await db.delete(contentTable).where(eq(contentTable.id, id));
  await db.delete(articleTable).where(eq(articleTable.id, id));
};
