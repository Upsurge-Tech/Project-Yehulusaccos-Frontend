'use client';

import React, { useState } from 'react';
import ArticleCardMain from './ArticleCardMain';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


const ArticleGrid = ({articles}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="mx-auto p-4">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-rows-2 md:gap-10 sm:gap-5">
        {currentArticles.map((article, index) => (
          <ArticleCardMain key={index} image={article.thumbnail} paragraph={article.paragraph} title={article.title} date={article.createdAt} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="text-primary flex items-center gap-x-3"
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
            <FaArrowLeft/> Previous 
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="text-primary flex gap-x-3 items-center"
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default ArticleGrid;
