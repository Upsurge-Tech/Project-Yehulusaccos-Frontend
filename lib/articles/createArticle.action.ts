"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable } from "@/db/schema";
import { errorIfNotLoggedIn, insertContents } from "./server-utils";

export const createArticle = async (
  article: ArticleFormState
): Promise<{ error: string } | number> => {
  console.log("starting creating article" + article.title);
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) {
    console.error("session error", sessionError);
    return sessionError;
  }

  if (!article.thumbnail.src) {
    return { error: "Thumbnail is required" };
  }
  let articleId: number;
  try {
    const res = await db.insert(articleTable).values({
      title: article.title,
      thumbnail: article.thumbnail.src,
    });

    console.log("inserted article");
    articleId = res[0].insertId;
    const res2 = await insertContents(articleId, article);
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
