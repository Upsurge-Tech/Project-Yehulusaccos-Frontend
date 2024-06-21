"use client";

import { ArticleFormState, ImageFormContent } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";

const ImageInput = ({
  index,
  formState,
  setFormState,
  validate,
}: {
  index: number;
  formState: ArticleFormState;
  setFormState: React.Dispatch<React.SetStateAction<ArticleFormState>>;
  validate: (s: ImageFormContent) => string;
}) => {
  const isThumbnail = index === -1;
  const content = isThumbnail ? formState.thumbnail : formState.contents[index];
  if (content.type !== "image") throw new Error("Content type mismatch");

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const onAbort = () => {
      if (isThumbnail) {
        setFormState((s) => ({
          ...s,
          thumbnail: { ...s.thumbnail, compressed: false, compressing: false },
        }));
      } else {
        setFormState((s) =>
          replaceContent(
            s,
            {
              ...(s.contents[index] as ImageFormContent),
              compressed: false,
              compressing: false,
            },
            index
          )
        );
      }
    };
    const compress = async () => {
      if (!content.file) return;
      if (content.compressed) return;
      const isBig = content.file.size / (1024 * 1024) > 0.1;
      console.log("is big", isBig);

      try {
        const beforeContent = {
          ...content,
          compressing: true,
          compressed: false,
        };
        if (isThumbnail) {
          setFormState((s) => ({ ...s, thumbnail: beforeContent }));
        } else {
          setFormState((s) => replaceContent(s, beforeContent, index));
        }

        const compressedFile = isBig
          ? await imageCompression(content.file, {
              maxSizeMB: 0.1,
              useWebWorker: true,
              signal: controller.signal,
            })
          : content.file;

        const reader = new FileReader();
        reader.onload = (e) => {
          if (controller.signal.aborted) {
            onAbort();
            return;
          }

          const localUrl = (e.target?.result as string) || null;
          const newContent = {
            ...content,
            file: compressedFile,
            localUrl,
            compressing: false,
            compressed: true,
          };
          if (isThumbnail) {
            setFormState((s) => ({ ...s, thumbnail: newContent }));
          } else {
            setFormState((s) => replaceContent(s, newContent, index));
          }
        };
        reader.readAsDataURL(compressedFile);
      } catch (e) {
        console.log("Could not compress image", e);
        onAbort();
        return;
      }
    };
    compress();
    return () => controller.abort();
  }, [content.file, content.compressed, index]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const localUrl = (e.target?.result as string) || null;
      const newContent = {
        ...content,
        file,
        localUrl,
        compressed: false,
        compressing: false,
        error: "",
      };
      newContent.error = validate(newContent);

      if (isThumbnail) {
        setFormState((s) => ({ ...s, thumbnail: newContent }));
      } else {
        setFormState((s) => replaceContent(s, newContent, index));
      }
    };
    reader.readAsDataURL(file);
  };

  const cancel = () => {
    const newContent = {
      ...content,
      file: null,
      localUrl: null,
      compressed: false,
      compressing: false,
      error: "",
    };
    if (isThumbnail) {
      setFormState((s) => ({ ...s, thumbnail: newContent }));
    } else {
      setFormState((s) => replaceContent(s, newContent, index));
    }
  };

  return (
    <div className="relative max-w-[200px] border rounded">
      {content.compressing && (
        <p className="text-black/50 text-sm">compressing...</p>
      )}
      {content.error && !content.compressing && (
        <p className="text-destructive text-sm">{content.error}</p>
      )}
      <button
        className={` ${content.file ? "" : "hidden"} absolute right-0 top-0 bg-muted p-1 border `}
        type="button"
        onClick={() => cancel()}
      >
        <MdOutlineCleaningServices />
      </button>

      <label
        htmlFor={content.elementId}
        className={`${content.file ? "hidden" : ""}  p-3 flex gap-2 `}
      >
        <FaFileImage className="text-xl text-black/80" />
        <span>Add Image</span>
      </label>

      <input
        ref={ref}
        id={content.elementId}
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e)}
        className="w-1 h-1 opacity-0 absolute right-1/2 bottom-0 "
      />
      {content.localUrl && (
        <Image
          src={content.localUrl}
          alt=""
          width={300}
          height={300}
          className="w-full max-h-[200px] object-contain bg-muted"
        />
      )}
    </div>
  );
};
export default ImageInput;
