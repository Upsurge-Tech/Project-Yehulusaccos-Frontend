import { Article, ArticleFormState } from "@/data-types/Article";

export const getVideoId = (link: string): string | null => {
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

export const attachExcrept = (article: Article) => {
  const maxWords = 7;
  for (const c of article.contents) {
    if (c.type === "paragraph") {
      article.excerpt =
        c.paragraph.split(" ").slice(0, maxWords).join(" ") + "...";
      return;
    }
  }

  for (const c of article.contents) {
    if (c.type === "heading") {
      article.excerpt =
        c.heading.split(" ").slice(0, maxWords).join(" ") + "...";
      return;
    }
  }

  article.excerpt =
    article.title.split(" ").slice(0, maxWords).join(" ") + "...";
};

const toFile = async (url: string | null): Promise<File | null> => {
  if (!url) return null;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to load image" + url);
  }
  const blob = await res.blob();
  const fileName = url.split("/").pop();
  const name = `${Math.round(Math.random() * 1000000)}_${fileName}`;
  const file = new File([blob], name, { type: blob.type });
  return file;
};

export const withPrevImages = async (
  article: ArticleFormState
): Promise<ArticleFormState> => {
  const thumbnailFile = await toFile(article.thumbnail.previousSrc || null);
  const thumbnailLocalUrl = article.thumbnail.previousSrc || null;

  const contents = await Promise.all(
    article.contents.map(async (c, i) => {
      if (c.type !== "image") {
        return { ...c };
      } else {
        const file = await toFile(c.previousSrc || null);
        const localUrl = c.previousSrc || null;
        return { ...c, file, localUrl };
      }
    })
  );

  const copy: ArticleFormState = {
    ...article,
    thumbnail: {
      ...article.thumbnail,
      file: thumbnailFile,
      localUrl: thumbnailLocalUrl,
    },
    contents,
  };
  return copy;
};
