import { Article } from "@/data-types/Article";

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
