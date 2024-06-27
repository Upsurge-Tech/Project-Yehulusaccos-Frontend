"use server";
import { Article, ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getArticle from "./getArticle";
import {
  deleteArticleLangs,
  deleteContents,
  errorIfNotLoggedIn,
  insertArticleLangs,
  insertContents,
  removeImages,
} from "./server-utils";

const removeUnneededImages = async (
  oldArticle: Article,
  article: ArticleFormState
) => {
  const oldSrc: string[] = [
    oldArticle.thumbnail,
    ...oldArticle.contents
      .map((c) => (c.type === "image" ? c.src || "" : ""))
      .filter((s) => s !== ""),
  ];

  const newSrc = new Set<string>([
    article.thumbnail.src || "",
    ...article.contents
      .map((c) => (c.type === "image" ? c.src || "" : ""))
      .filter((s) => s !== ""),
  ]);

  const imagesToRemove = oldSrc.filter((x) => !newSrc.has(x));
  const res = await removeImages(imagesToRemove);
  if (res) throw new Error(res.error);
};

export const editArticle = async (
  articleId: number,
  article: ArticleFormState
): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;

  if (!article.thumbnail.src) {
    return { error: "Thumbnail is required" };
  }
  try {
    const res1 = await getArticle(articleId, false);
    if ("error" in res1) throw res1.error;

    //to react to client side image related errors before doing anything
    await removeUnneededImages(res1.article, article),
      await Promise.all([
        db
          .update(articleTable)
          .set({ thumbnail: article.thumbnail.src })
          .where(eq(articleTable.id, articleId)),

        deleteContents(articleId),
        deleteArticleLangs(articleId),
      ]);
    //after delete
    await Promise.all([
      insertContents(articleId, article),
      insertArticleLangs(articleId, article.langs),
    ]);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return { error: "Failed to edit article: " + e.message };
    } else {
      return { error: "Failed to edit article." + JSON.stringify(e) };
    }
  }
};
