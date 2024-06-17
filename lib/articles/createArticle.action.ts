"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable } from "@/db/schema";
import {
  errorIfNotLoggedIn,
  insertContents,
  uploadImages,
} from "./server-utils";

export const createArticle = async (
  formData: FormData,
  article: ArticleFormState
): Promise<{ error: string } | number> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;

  const imageFiles = [...(formData.getAll("images") as File[])];
  if (
    imageFiles.length - 1 !==
    article.contents.filter((c) => c.type === "image").length
  ) {
    return { error: "Missing images, Please try again later." };
  }

  let articleId: number;
  try {
    const resUpload = await uploadImages(imageFiles);
    if ("error" in resUpload) return resUpload;
    const imageUrls = resUpload;

    const res = await db.insert(articleTable).values({
      title: article.title,
      thumbnail: imageUrls[0],
    });

    console.log("inserted article");
    articleId = res[0].insertId;
    const res2 = await insertContents(articleId, article, imageUrls);
    if (res2 && res2.error) return res2;
    console.log("inserted contents");
  } catch (e) {
    console.error(e);
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to create article" + errString };
  }

  console.log("Successful save articleId =", articleId);
  return articleId;
};
