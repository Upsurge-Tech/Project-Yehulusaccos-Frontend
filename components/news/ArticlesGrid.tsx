import React from "react";
import ArticelCard from "./ArticleCard";
import { Article } from "@/data-types/Article";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Props {
  articles: Article[];
}

const ArticlesGrid = ({ articles }: Props) => {
  const t = useTranslations("News.SingleNews");
  return (
    <div className="flex flex-col gap-y-10">
      <h2 className="font-semibold  text-2xl lg:text-4xl">{t("Header")}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 sm:gap-10 2xl:gap-x-20">
        {articles.map((article) => (
          <Link key={article.id} href={`${article.id}`}>
            <ArticelCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticlesGrid;
