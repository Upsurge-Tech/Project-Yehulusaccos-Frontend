"use client";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../ui/pagination";

const PaginationControls = ({
  numPages,
  currentPage,
  onPageChange,
}: {
  numPages: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}) => {
  const maxPages = 5;
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);
  const shouldElipsis = numPages > maxPages;

  const leftPages = pages.slice(0, Math.min(maxPages - 1, pages.length - 1));
  const rightPages = pages.slice(-1);

  return (
    <div className="w-min">
      <Pagination className=" text-black/80 pb-3">
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={currentPage <= 1}
              size={"sm"}
              variant="ghost"
              onClick={() => {
                onPageChange(currentPage - 1);
              }}
            >
              <FaArrowLeftLong size={25} className="hidden md:inline-block" />
              Oldest
            </Button>
          </PaginationItem>

          {leftPages.map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? undefined : "outline"}
              size={"sm"}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p}
            </Button>
          ))}
          {shouldElipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {rightPages.map((p) => (
            <Button
              key={p}
              variant={p === currentPage ? undefined : "outline"}
              size={"sm"}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p}
            </Button>
          ))}

          <PaginationItem>
            <Button
              disabled={currentPage >= numPages}
              size={"sm"}
              variant="ghost"
              onClick={() => {
                onPageChange(currentPage + 1);
              }}
            >
              Newest
              <FaArrowRightLong size={25} className="hidden md:inline" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
