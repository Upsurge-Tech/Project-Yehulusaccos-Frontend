import { Article } from "@/data-types/Article";
import fs from "node:fs/promises";
import path from "path";
import { attachExcrept } from "./utils";

const toAbolutePath = (filePath: string) => {
  const segments = filePath.split("/");
  const absolutePath = path.join(process.cwd(), "public", ...segments);
  return absolutePath;
};

export const saveFiles = async (files: File[], filePaths: string[]) => {
  await Promise.all(
    files.map(async (file, i) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(toAbolutePath(filePaths[i]), buffer);
    })
  );
};

export const removeFilesIfExist = async (filePaths: string[]) => {
  await Promise.all(
    filePaths.map(async (filePath) => {
      try {
        await fs.unlink(toAbolutePath(filePath));
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
      createdAt: article.createdAt.toISOString(),
      excerpt: "",
      contents: [],
    });
    console.log("title", article.title);

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
  return articles;
};
