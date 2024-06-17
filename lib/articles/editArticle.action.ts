"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  createImagePaths,
  errorIfNotLoggedIn,
  insertContents,
  removeFilesIfExist,
  saveFiles,
} from "./server-utils";

export const editArticle = async (
  articleId: number,
  formData: FormData,
  article: ArticleFormState
): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;

  const imageFiles = [...(formData.getAll("images") as File[])];
  if (
    imageFiles.length - 1 !==
    article.contents.filter((c) => c.type === "image").length
  ) {
    return { error: "Missing images, Please try again later." };
  }

  const oldFilePaths = article.contents
    .map((c) => (c.type === "image" ? c.previousSrc ?? "" : ""))
    .filter((s) => s !== "");
  const filePaths = createImagePaths(imageFiles);

  console.log("article title is", article.title);
  try {
    //update article, replace contents
    await db
      .update(articleTable)
      .set({ title: article.title, thumbnail: filePaths[0] })
      .where(eq(articleTable.id, articleId));

    await db.delete(contentTable).where(eq(contentTable.articleId, articleId));
    await insertContents(articleId, article, filePaths);

    //remove old files, save new files
    await saveFiles(imageFiles, filePaths);
    await removeFilesIfExist(oldFilePaths);
  } catch (e) {
    console.error(e);
    await db.delete(articleTable).where(eq(articleTable.id, articleId));
    return { error: "Failed to save images" };
  }
  console.log("Successful edit articleId =", articleId);
};
