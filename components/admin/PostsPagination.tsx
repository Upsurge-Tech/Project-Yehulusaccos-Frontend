"use client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const PostsPagination = ({
  size,
  page,
  numPages,
}: {
  page: number;
  size: number;
  numPages: number;
}) => {
  const router = useRouter();
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
              disabled={page === 1}
              size={"sm"}
              variant="outline"
              onClick={() => {
                router.push(`./posts?page=${page - 1}`);
              }}
            >
              <FaArrowLeft />
            </Button>
          </PaginationItem>

          {leftPages.map((p) => (
            <Button
              key={p}
              variant={p === page ? undefined : "outline"}
              size={"sm"}
              onClick={() => {
                router.push(`./posts?page=${p}`);
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
              variant={p === page ? undefined : "outline"}
              size={"sm"}
              onClick={() => {
                router.push(`./posts?page=${p}`);
              }}
            >
              {p}
            </Button>
          ))}

          <PaginationItem>
            <Button
              disabled={page === numPages}
              size={"sm"}
              variant="outline"
              onClick={() => {
                router.push(`./posts?page=${page + 1}`);
              }}
            >
              <FaArrowRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PostsPagination;
