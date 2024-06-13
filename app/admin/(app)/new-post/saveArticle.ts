"use server";
import { ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { articleTable, contentTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import path from "node:path";

const removeArticle = async (articleId: number) => {
  await db.delete(contentTable).where(eq(contentTable.articleId, articleId));
  await db.delete(articleTable).where(eq(articleTable.id, articleId));
};

const getVideoId = (link: string): string | null => {
  try {
    if (!link.includes("https://www.youtube.com/watch?v")) {
      return null;
    }
    const url = new URL(link);
    const params = new URLSearchParams(url.search);
    const videoId = params.get("v");
    return videoId || null;
  } catch (e) {
    // console.log(e);
    return null;
  }
};

const saveFiles = async (files: File[], filePaths: string[]) => {
  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const absolutePath = path.join(process.cwd(), "public", filePaths[i]);
      await fs.writeFile(absolutePath, buffer);
    })
  );
};

const removeFilesIfExist = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        const absolutePath = path.join(process.cwd(), "public", filePath);
        await fs.unlink(absolutePath);
      } catch (e) {
        if (e instanceof Error && "code" in e && e.code === "ENOENT") {
          return;
        } else {
          //let it crash if it can't delete the file
          console.error("cant delte", e);
          throw e;
        }
      }
    })
  );
};

export async function saveArticle(
  formData: FormData,
  article: ArticleFormState
): Promise<{ error: string } | number> {
  const imageFiles = [...(formData.getAll("images") as File[])];
  const filePaths = imageFiles.map((file) => {
    const path = `article-images/__${Math.round(Math.random() * 1000)}_${file.name}`;
    return path;
  });
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

  try {
    await db.insert(contentTable).values(
      article.contents.map((content, i) => {
        const type = content.type;
        let data: string = "";
        let alt: string = "";
        if (type === "image") {
          data = filePaths[i + 1];
          alt = content.alt;
        } else if (type === "heading") {
          data = content.heading;
        } else if (type === "paragraph") {
          data = content.paragraph;
        } else if (type === "youtube") {
          const videoId = getVideoId(content.youtubeLink);
          if (videoId === null) {
            throw new Error(`Invalid youtube link at ${i + 1}th block`);
          }
          data = videoId;
        }

        if (data === "") {
          throw new Error(`Empty content in ${type} at ${i + 1}th block`);
        }

        return { articleId, type, data, alt };
      })
    );
    console.log("inserted contents");
  } catch (e) {
    console.error(e);
    let errString = "";
    if (e instanceof Error) errString = e.message;
    return { error: "Failed to save article -" + errString };
  }

  try {
    await saveFiles(imageFiles, filePaths);
  } catch (e) {
    console.error(e);
    await removeArticle(articleId);
    await removeFilesIfExist(filePaths);
    return { error: "Failed to save images" };
  }
  console.log("Successful save articleId =", articleId);
  return articleId;
}
