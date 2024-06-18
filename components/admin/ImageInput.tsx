"use client";

import imageCompression from "browser-image-compression";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaFileImage } from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";

const ImageInput = ({
  compressing,
  compressed,
  setCompress,
  id,
  file,
  localUrl,
  onFileChange,
  onError,
}: {
  compressing: boolean;
  compressed: boolean;
  setCompress: (compressing: boolean, compressed: boolean) => void;
  previousSrc?: string;
  id: string;
  onFileChange: (
    file: File | null,
    localUrl: string | null,
    compressing: boolean,
    compressed: boolean
  ) => void;
  file: File | null;
  localUrl: string | null;
  error: string;
  onError: (error: string) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const compress = async () => {
      if (!file) return;
      if (compressed) return;
      try {
        setCompress(true, false);
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.025,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          signal: controller.signal,
        });

        const reader = new FileReader();
        reader.onload = (e) => {
          const url = (e.target?.result as string) || null;
          onFileChange(compressedFile, url, false, true);
        };
        reader.readAsDataURL(compressedFile);
      } catch (e) {
        console.error("Could not compress image", e);
        onError("Could not compress image");
        return;
      } finally {
        setCompress(false, false);
      }
    };
    compress();
    return () => controller.abort();
  }, [file, compressed]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    console.log("here");
    reader.onload = (e) => {
      const url = (e.target?.result as string) || null;
      onFileChange(file, url, false, false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative max-w-[200px] border rounded">
      {compressing && <p className="text-black/50 text-sm">compressing...</p>}
      <button
        className={` ${file ? "" : "hidden"} absolute right-0 top-0 bg-muted p-1 border `}
        type="button"
        onClick={() => onFileChange(null, null, false, false)}
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
        onChange={(e) => onChange(e)}
        className="w-1 h-1 opacity-0 absolute right-1/2 bottom-0 "
      />
      {localUrl && (
        <Image
          src={localUrl}
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
