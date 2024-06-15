"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  createImagePaths,
  insertContents,
  removeFilesIfExist,
  saveFiles,
} from "./server-utils";

export const createArticle = async (
  formData: FormData,
  article: ArticleFormState
): Promise<{ error: string } | number> => {
  const imageFiles = [...(formData.getAll("images") as File[])];
  if (
    imageFiles.length - 1 !==
    article.contents.filter((c) => c.type === "image").length
  ) {
    console.error(
      "files",
      imageFiles.length,
      "vs",
      "image in form data",
      article.contents.filter((c) => c.type === "image").length
    );
    return { error: "Missing images, Please try again later." };
  }
  const filePaths = createImagePaths(imageFiles);
  console.log("image paths", filePaths);

  let articleId: number;
  try {
    const res = await db.insert(articleTable).values({
      title: article.title,
      thumbnail: filePaths[0],
    });
    articleId = res[0].insertId;
    console.log("inserted article");
  } catch (e) {
    console.error(e);
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to save article" + errString };
  }

  const res = await insertContents(articleId, article, filePaths);
  if (res && res.error) return res;
  console.log("inserted contents");

  try {
    await saveFiles(imageFiles, filePaths);
  } catch (e) {
    console.error(e);
    await db.delete(contentTable).where(eq(contentTable.articleId, articleId));
    await db.delete(articleTable).where(eq(articleTable.id, articleId));
    await removeFilesIfExist(filePaths);
    return { error: "Failed to save images" };
  }
  console.log("Successful save articleId =", articleId);
  return articleId;
};
