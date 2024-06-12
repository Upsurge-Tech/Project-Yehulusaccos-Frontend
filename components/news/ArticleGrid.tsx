'use client';

import React, {useEffect, useState} from "react";
import ArticleCardMain from "./ArticleCardMain";
import Pagination from "./PaginationControls";



const ArticleGrid = () => {

  const [articles, setArticles] = useState([]);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const offset = 3;

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      const res = await fetch(`/api/articles?page=${page}&size=${pageSize}&offset=${offset}`);
      const { data, numPages } = await res.json();
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
        {/* {articles.map((article) => (
          <ArticleCardMain
            key={article.id}
            image={article.thumbnail}
            title={article.title}
            paragraph={article.excerpt}
            date={article.createdAt}
          />
        ))} */}
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
