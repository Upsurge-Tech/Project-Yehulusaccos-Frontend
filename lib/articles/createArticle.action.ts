"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable } from "@/db/schema";
import {
  errorIfNotLoggedIn,
  insertArticleLangs,
  insertContents,
} from "./server-utils";

export const createArticle = async (
  article: ArticleFormState
): Promise<{ error: string } | number> => {
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
      thumbnail: article.thumbnail.src,
    });

    articleId = res[0].insertId;
    const res2 = await insertContents(articleId, article);
    if (res2 && res2.error) return res2;

    insertArticleLangs(articleId, article.langs);
  } catch (e) {
    console.error(e);
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to create article" + errString };
  }

  return articleId;
};
