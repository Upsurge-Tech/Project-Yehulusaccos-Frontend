"use client";

import { Article } from "@/data-types/Article";
import { Lang } from "@/data-types/Languages";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner from "../contact/Spinner";
import ArticleCard from "./ArticleCard";
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
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const offset = 3;
  const locale = useLocale() as Lang;

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      setIsFetching(true);
      const res = await fetch(
        `/api/articles?page=${page}&size=${pageSize}&offset=${offset}`
      );
      const resData = (await res.json()) as GetArticlesResponse;

      if ("error" in resData) {
        setIsFetching(false);
        return;
      }
      const { data, numPages } = resData;
      setArticles(data);
      setNumPages(numPages);
      setIsFetching(false);
    };

    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const renderArticle = (article: Article) => {
    const langAvailable = article.langIds.includes(locale);

    const contentLocale = langAvailable ? locale : article.langIds[0];

    const localizedArticle = {
      ...article,
      title: article.title[contentLocale],
      excerpt: article.excerpt[contentLocale],
      contents: article.contents.map((content) => {
        if (content.type === "heading")
          return { ...content, heading: content.heading?.[contentLocale] };
        if (content.type === "paragraph")
          return { ...content, paragraph: content.paragraph?.[contentLocale] };
        return content;
      }),
    };

    return localizedArticle;
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {isFetching ? (
        <Spinner />
      ) : articles.length <= 0 ? (
        <p className="text-lg">No news found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {articles.map((article) => (
              <Link href={`/news/${article.id}`} key={article.id}>
                <ArticleCard
                  key={article.id}
                  article={article}
                  locale={locale}
                />
              </Link>
            ))}
          </div>
          <Pagination
            numPages={numPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ArticleGrid;
