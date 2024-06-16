import { Article, ArticleFormState } from "@/data-types/Article";
import db from "@/db";
import { contentTable } from "@/db/schema";
import fs from "node:fs/promises";
import path from "path";
import { attachExcrept, getVideoId } from "./utils";

const toAbsolutePath = (filePath: string) => {
  const segments = filePath.split("/");
  const absolutePath = path.join(process.cwd(), "public", ...segments);
  return absolutePath;
};

export const createImagePaths = (imageFiles: File[]): string[] => {
  const filePaths = imageFiles.map((file) => {
    const path = `/article-images/__${Math.round(Math.random() * 1000)}_${file.name}`;
    return path;
  });
  return filePaths;
};

export const saveFiles = async (files: File[], filePaths: string[]) => {
  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(toAbsolutePath(filePaths[i]), buffer);
    })
  );
};

export const removeFilesIfExist = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        await fs.unlink(toAbsolutePath(filePath));
      } catch (e) {
        if (e instanceof Error && "code" in e && e.code === "ENOENT") {
          console.log("file not found", filePath);
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

export const insertContents = async (
  articleId: number,
  article: ArticleFormState,
  imagePaths: string[]
): Promise<{ error: string } | void> => {
  try {
    let imageIndex = 1;
    if (article.contents.length === 0) return;
    await db.insert(contentTable).values(
      article.contents.map((content, i) => {
        const type = content.type;
        let data: string = "";
        let alt: string = "";
        if (type === "image") {
          data = imagePaths[imageIndex];
          alt = content.alt;
          imageIndex++;
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
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "Something went wrong" + JSON.stringify(e) };
    }
  }
};

interface Res {
  article: {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: Date;
  };
  content: {
    id: number;
    data: string;
    articleId: number;
    type: "heading" | "paragraph" | "image" | "youtube";
    alt: string | null;
  } | null;
}
export const extractArticles = (res: Res[]): Article[] | { error: string } => {
  const articles: Article[] = [];
  for (let i = 0; i < res.length; i++) {
    const { article } = res[i];
    articles.push({
      ...article,
      createdAt: article.createdAt.toLocaleString("en-Us", {
        timeZone: "UTC",
      }),
      excerpt: "",
      contents: [],
    });

    while (
      i < res.length &&
      articles[articles.length - 1].id === res[i].article.id
    ) {
      const content = res[i].content;
      if (!content) break;

      const { data, alt, id, articleId, type } = content;
      const lastArticle = articles[articles.length - 1];
      if (type === "heading") {
        lastArticle.contents.push({ type, heading: data, id, articleId });
      } else if (type === "image") {
        const content = { type, src: data, alt: alt || "", id, articleId };
        lastArticle.contents.push(content);
      } else if (type === "paragraph") {
        lastArticle.contents.push({ type, paragraph: data, id, articleId });
      } else if (type === "youtube") {
        lastArticle.contents.push({ type, youtubeId: data, id, articleId });
      } else {
        return { error: `Unknown type ${type} in article id ${articleId}` };
      }
      i++;
    }
  }

  articles.map(attachExcrept);
  articles.forEach((a) => a.contents.sort((a, b) => a.id - b.id));
  return articles;
};
