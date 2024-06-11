import React from "react";
import ArticleCardMain from "./ArticleCardMain";
import PaginationControls from "./PaginationControls";
import articles from "@/data/articles";

const ArticleGrid = ({ searchParams }: { searchParams: any }) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const articlesToShow = articles.slice(start, end);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {articlesToShow.map((article) => (
          <ArticleCardMain
            key={article.id}
            image={article.thumbnail}
            title={article.title}
            paragraph={article.excerpt}
            date={article.createdAt}
          />
        ))}
      </div>
      <PaginationControls
        hasNextPage={end < articles.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
};
export default ArticleGrid;
