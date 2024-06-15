import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";

const urlToImage = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const name = url.slice(10) + Math.round(Math.random() * 1000);
  const file = new File([blob], name, { type: blob.type });
  return { file, url };
};

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
    urlToImage(previousSrc).then(({ file }) => {
      onFile(file);
    });
  }, [previousSrc]);
  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    console.log("here");
    reader.onload = (e) => {
      const url = (e.target?.result as string) || null;
      setLocalUrl(url);
    };
    reader.readAsDataURL(file);

    return () => reader.abort();
  }, [file]);

  return (
    <div className="relative max-w-[200px] border rounded">
      <button
        className={` ${file ? "" : "hidden"} absolute right-0 top-0 bg-muted p-1 border `}
        onClick={(e) => {
          console.log("here");
          e.preventDefault();
          ref.current?.value && (ref.current.value = "");
          onFile(null);
          setLocalUrl(null);
        }}
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
        required
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
