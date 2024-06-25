"use server";
import { Article, ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getArticle from "./getArticle";
import {
  errorIfNotLoggedIn,
  insertContents,
  removeImages,
} from "./server-utils";

const removeUnneededImages = async (
  oldArticle: Article,
  article: ArticleFormState
): Promise<void | { error: string }> => {
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
  await removeImages(imagesToRemove);
};

export const editArticle = async (
  articleId: number,
  article: ArticleFormState
): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;
  console.log("starting editing article" + article.title);

  if (!article.thumbnail.src) {
    return { error: "Thumbnail is required" };
  }
  try {
    const res1 = await getArticle(articleId, false);
    if ("error" in res1) return res1;

    await Promise.all([
      db
        .update(articleTable)
        .set({ title: article.title, thumbnail: article.thumbnail.src })
        .where(eq(articleTable.id, articleId)),
      removeUnneededImages(res1.article, article),
      db.delete(contentTable).where(eq(contentTable.articleId, articleId)),
    ]);
    await insertContents(articleId, article);
  } catch (e) {
    if (e instanceof Error) {
      return { error: "Failed to edit article: " + e.message };
    } else {
      return { error: "Failed to edit article." + JSON.stringify(e) };
    }
  }
  console.log("Successful edit articleId =", articleId);
};
