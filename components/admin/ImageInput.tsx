import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";

const ImageInput = ({
  previousSrc,
  id,
  onFile,
  file,
}: {
  previousSrc?: string;
  id: string;
  onFile: (file: File | null) => void;
  file: File | null;
}) => {
  const [localUrl, setLocalUrl] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!previousSrc) return;
    const setFileFromPrevSrc = async (src: string) => {
      const res = await fetch(src);
      if (!res.ok) {
        throw new Error("Failed to load image, Please try again.");
      }
      const blob = await res.blob();
      const name = src.slice(10) + Math.round(Math.random() * 1000);
      const file = new File([blob], name, { type: blob.type });
      onFile(file);
    };
    setFileFromPrevSrc(previousSrc);
  }, [previousSrc]);

  useEffect(() => {
    if (!file) {
      setLocalUrl(null);
      return;
    }

    const reader = new FileReader();
    console.log("here");
    reader.onload = (e) => {
      const url = (e.target?.result as string) || null;
      setLocalUrl(url);
    };
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file]);

  const onErase = (e: InputEvent) => {
    console.log("here");
    e.preventDefault();
    // ref.current?.value && (ref.current.value = "");
    onFile(null);
  };

  return (
    <div className="relative max-w-[200px] border rounded">
      <button
        className={` ${file ? "" : "hidden"} absolute right-0 top-0 bg-muted p-1 border `}
        onClick={(e) => onErase}
      >
        <MdOutlineCleaningServices />
      </button>

      <label
        htmlFor={id}
        className={`${file ? "hidden" : ""}  p-3 flex gap-2 `}
      >
        <FaFileImage className="text-xl text-black/80" />
        <span>Add Image</span>
      </label>

      <input
        ref={ref}
        id={id}
        type="file"
        accept="image/*"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
        className="w-1 h-1 opacity-0 absolute right-1/2 bottom-0 "
      />
      {localUrl && (
        <Image
          src={localUrl}
          alt=""
          width={10}
          height={10}
          className="w-full max-h-[200px] object-contain bg-muted"
        />
      )}
    </div>
  );
};
export default ImageInput;
