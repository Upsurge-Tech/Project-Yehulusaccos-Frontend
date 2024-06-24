"use client";

import { ArticleFormState, ImageFormContent } from "@/data-types/Article";
import { replaceContent } from "@/lib/articles/utils";
import Image from "next/image";
import { useRef } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";
import Spinner from "../Spinner";

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
        <p className="text-black/50 text-sm flex gap-2 items-center">
          <Spinner spin={content.compressing} />
          compressing...
        </p>
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
