"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getArticle from "./getArticle";
import {
  errorIfNotLoggedIn,
  insertContents,
  removeImages,
} from "./server-utils";

export const editArticle = async (
  articleId: number,
  article: ArticleFormState
): Promise<{ error: string } | void> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) return sessionError;
  console.log("starting editing article" + article.title);

  try {
    const res1 = await getArticle(articleId, false);
    if ("error" in res1) return res1;

    await db
      .update(articleTable)
      .set({ title: article.title, thumbnail: article.thumbnail.src })
      .where(eq(articleTable.id, articleId));

    await db.delete(contentTable).where(eq(contentTable.articleId, articleId));
    await insertContents(articleId, article);

    const oldArticle = res1.article;
    const oldSrcs = [
      oldArticle.thumbnail,
      ...article.contents
        .map((c) => (c.type === "image" ? c.src : ""))
        .filter((s) => s !== ""),
    ];
    await removeImages(oldSrcs);
  } catch (e) {
    if (e instanceof Error) {
      return { error: "Failed to edit article: " + e.message };
    } else {
      return { error: "Failed to edit article." + JSON.stringify(e) };
    }
  }
  console.log("Successful edit articleId =", articleId);
};
