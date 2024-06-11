"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";

  return (
    <div className="w-full flex justify-between md:py-8">
      <button
        className={` text-primary flex items-center justify-between gap-x-3 ${hasPrevPage ? "cursor-pointer" : "cursor-not-allowed"}`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/news/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <FaArrowLeft size={20} />
        prev page
      </button>

      <div>
        <span className="hidden md:inline-block">page</span>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>

      <button
        className={`text-primary flex items-center justify-between gap-x-3 ${hasNextPage ? "cursor-pointer" : "cursor-not-allowed"}`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/news/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        next page
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControls;
