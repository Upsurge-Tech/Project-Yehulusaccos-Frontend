import { ArticleFormState, FormContent } from "@/data-types/Article";
import { Lang, langs } from "@/data-types/Languages";
import { Dispatch, SetStateAction } from "react";
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

export const replaceContent = (
  state: ArticleFormState,
  content: FormContent,
  index: number
) => {
  const newContents = [...state.contents];
  newContents[index] = content;
  return { ...state, contents: newContents };
};

export const pickNonEmptyLang = (option: { [key in Lang]: string }): string => {
  for (const lang of langs) {
    if (option[lang]) return option[lang];
  }
  return "";
};
export const withNulledImages = (state: ArticleFormState): ArticleFormState => {
  let nearestHeading: string = pickNonEmptyLang(state.title.title);
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
        nearestHeading = pickNonEmptyLang(c.heading);
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

interface CloudinaryResData {
  error?: { message: string };
  secure_url: string;
}
const uploadImage = async (
  file: File,
  cOptions: {
    upload_preset: string;
    cloudName: string;
    timestamp: number;
    api_key: string;
    signature: string;
  },
  appendProgressPercent: (percent: number) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let progressPercent = 0;

    xhr.upload.addEventListener("progress", (e) => {
      const percent = e.loaded / e.total;
      appendProgressPercent(percent - progressPercent);
      progressPercent = percent;
    });
    xhr.addEventListener("load", () => {
      const data = JSON.parse(xhr.responseText) as CloudinaryResData;
      resolve(data.secure_url);
    });
    xhr.addEventListener("error", () => {
      const data = JSON.parse(xhr.responseText) as CloudinaryResData;
      console.log();
      reject(new Error(`Image upload failed: ${data.error}`));
    });

    xhr.addEventListener("abort", () =>
      reject(new Error("File upload aborted"))
    );

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cOptions.upload_preset);

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cOptions.cloudName}/image/upload?api_key=${cOptions.api_key}&timestamp=${cOptions.timestamp}&upload_preset=${cOptions.upload_preset}&signature=${cOptions.signature}`,
      true
    );
    xhr.send(formData);
  });
};

export const withUploadedImages = async (
  state: ArticleFormState,
  setProgress: Dispatch<SetStateAction<number>>
): Promise<ArticleFormState | { error: string }> => {
  //defence zone
  const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
  if (!api_key) return { error: "Cloudinary api_key not found" };
  if (!cloudName) return { error: "Cloudinary credentials not found" };

  if (!state.thumbnail.file && !state.thumbnail.src) {
    return { error: "Thumbnail is required" };
  }
  const res = await getSignature();
  if ("error" in res) {
    return { error: res.error };
  }

  const { signature, timestamp, upload_preset } = res;
  const srcPromises: (Promise<string> | string)[] = [];
  const appendProgress = (change: number) =>
    setProgress((prev) => prev + change);
  const numTasks = state.contents.filter((c) => c.type === "image").length + 1;
  const singleTaskChange = 80 / numTasks;

  for (const content of [state.thumbnail, ...state.contents]) {
    if (content.type !== "image") continue;

    if (content.file) {
      const srcPromise = uploadImage(
        content.file,
        {
          cloudName,
          api_key,
          upload_preset,
          timestamp,
          signature,
        },
        (percentChange) => appendProgress(percentChange * singleTaskChange)
      );

      srcPromises.push(srcPromise);
    } else if (content.src) {
      srcPromises.push(content.src);
      appendProgress(singleTaskChange);
    } else {
      return { error: "All images are required" };
    }
  }

  try {
    const srcs: string[] = await Promise.all(srcPromises);

    let i = 1;
    const newContents: FormContent[] = state.contents.map((c) =>
      c.type === "image" ? { ...c, src: srcs[i++] } : c
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

export const sortLang = (givenLangs: Lang[]) => {
  return langs.filter((l) => givenLangs.includes(l));
};

export const chooseLang = (langs: Lang[], local: Lang): Lang => {
  if (langs.includes(local)) return local;
  else return langs[0];
};
