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

const uploadImage = async (
  file: File,
  cOptions: {
    upload_preset: string;
    cloudName: string;
    timestamp: number;
    api_key: string;
    signature: string;
  }
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cOptions.upload_preset);

  console.log("uploading", file.name);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cOptions.cloudName}/image/upload?api_key=${cOptions.api_key}&timestamp=${cOptions.timestamp}&upload_preset=${cOptions.upload_preset}&signature=${cOptions.signature}`,
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
};

export const withUploadedImages = async (
  state: ArticleFormState
): Promise<ArticleFormState | { error: string }> => {
  //defence zone
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string;
  if (!api_key) return { error: "Cloudinary api_key not found" };
  if (!cloudName) return { error: "Cloudinary credentials not found" };
  if (!upload_preset) return { error: "Cloudinary upload_preset not found" };

  if (!state.thumbnail.file && !state.thumbnail.src) {
    return { error: "Thumbnail is required" };
  }
  const res = await getSignature();
  if ("error" in res) {
    return { error: res.error };
  }

  try {
    const { signature, timestamp, upload_preset } = res;
    const srcPromises: (Promise<string> | string)[] = [];

    for (const content of [state.thumbnail, ...state.contents]) {
      if (content.type === "image") {
        if (content.file) {
          srcPromises.push(
            uploadImage(content.file, {
              cloudName,
              api_key,
              upload_preset,
              timestamp,
              signature,
            })
          );
        } else if (content.src) {
          srcPromises.push(content.src);
        } else {
          return { error: "All images are required" };
        }
      }
    }

    const srcs: string[] = await Promise.all(srcPromises);

    const newContents: FormContent[] = state.contents.map((c, i) =>
      c.type === "image" ? { ...c, src: srcs[i + 1] } : c
    );
    return {
      ...state,
      thumbnail: { ...state.thumbnail, src: srcs[0] },
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
