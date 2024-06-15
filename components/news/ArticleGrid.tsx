"use client";

import { Article } from "@/data-types/Article";
import React, { useEffect, useState } from "react";
import ArticleCardMain from "./ArticleCardMain";
import Pagination from "./PaginationControls";

type GetArticlesResponse =
  | {
      data: Article[];
      numPages: number;
    }
  | { error: string };

const ArticleGrid = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const offset = 3;

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      const res = await fetch(
        `/api/articles?page=${page}&size=${pageSize}&offset=${offset}`
      );
      const resData = (await res.json()) as GetArticlesResponse;
      console.log("->", resData);

      if ("error" in resData) {
        console.error(resData.error);
        return;
      }
      const { data, numPages } = resData;
      setArticles(data);
      setNumPages(numPages);
    };

    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {articles.map((article) => (
          <ArticleCardMain key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        numPages={numPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default ArticleGrid;
