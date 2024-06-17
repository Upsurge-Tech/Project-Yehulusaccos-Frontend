"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  errorIfNotLoggedIn,
  insertContents,
  removeImages,
  uploadImages,
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

  const oldUrls = article.contents
    .map((c) => (c.type === "image" ? c.previousSrc ?? "" : ""))
    .filter((s) => s !== "");

  try {
    const res = await uploadImages(imageFiles);
    if ("error" in res) return res;
    const newUrls = res;

    await db
      .update(articleTable)
      .set({ title: article.title, thumbnail: newUrls[0] })
      .where(eq(articleTable.id, articleId));

    await db.delete(contentTable).where(eq(contentTable.articleId, articleId));
    await insertContents(articleId, article, newUrls);
    await removeImages(oldUrls);
  } catch (e) {
    console.error(e);
    return { error: "Failed to save images" };
  }
  console.log("Successful edit articleId =", articleId);
};
