import { Article, ArticleFormState, FormContent } from "@/data-types/Article";
import { getSignature } from "./getSignature.action";

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
  const thumbnailFile = await toFile(article.thumbnail.src || null);
  const thumbnailLocalUrl = article.thumbnail.src || null;

  const contents = await Promise.all(
    article.contents.map(async (c, i) => {
      if (c.type !== "image") {
        return { ...c };
      } else {
        const file = await toFile(c.src || null);
        const localUrl = c.src || null;
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

export const replaceContent = (
  state: ArticleFormState,
  content: FormContent,
  index: number
) => {
  const newContents = [...state.contents];
  newContents[index] = content;
  return { ...state, contents: newContents };
};

export const withNulledImages = (state: ArticleFormState): ArticleFormState => {
  let nearestHeading: string = state.title;
  const copy: ArticleFormState = {
    ...state,
    thumbnail: {
      ...state.thumbnail,
      file: null,
      localUrl: null,
      alt: `Image describing ${nearestHeading}`,
    },
    contents: state.contents.map((c) => {
      if (c.type === "heading") {
        nearestHeading = c.heading;
      }
      if (c.type === "image") {
        return {
          ...c,
          file: null,
          localUrl: null,
          alt: `Image describing ${nearestHeading}`,
        };
      } else {
        return c;
      }
    }),
  };
  return copy;
};

export const withUploadedImages = async (
  state: ArticleFormState
): Promise<ArticleFormState | { error: string }> => {
  const images: File[] = [];
  if (!state.thumbnail.file) {
    return { error: "Thumbnail is required" };
  }
  images.push(state.thumbnail.file);

  for (const content of state.contents) {
    if (content.type === "image") {
      if (!content.file) return { error: "All images are required" };
      images.push(content.file);
    }
  }

  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
  if (!upload_preset) return { error: "Cloudinary upload_preset not found" };
  if (!api_key) return { error: "Cloudinary api_key not found" };

  try {
    const res = await getSignature();
    if ("error" in res) {
      return { error: res.error };
    }

    const { signature, timestamp, upload_preset } = res;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
    if (!cloudName) {
      return { error: "Cloudinary credentials not found" };
    }

    const urls: string[] = await Promise.all(
      images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", upload_preset);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/q_auto/api_key=${api_key}&timestamp=${timestamp}&upload_preset=${upload_preset}&signature=${signature}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = (await res.json()) as {
          error?: { message: string };
          secure_url: string;
        };
        console.log(data);
        if (data.error) throw new Error(data.error.message);
        return data.secure_url;
      })
    );

    const newContents: FormContent[] = state.contents.map((c, i) =>
      c.type === "image" ? { ...c, src: urls[i + 1] } : c
    );
    return {
      ...state,
      thumbnail: { ...state.thumbnail, src: urls[0] },
      contents: newContents,
    };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message };
    } else {
      return { error: "An error occurred: " + JSON.stringify(e) };
    }
  }
};
