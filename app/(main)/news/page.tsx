import React from "react";
import articles from "@/data/articles";
import Image from "next/image";
import Vector from "@/public/Vector.svg";
import ArticleCardMain from "@/components/news/ArticleCardMain";
import ArticleCardSide from "@/components/news/ArticleCardSide";
import ArticleGrid from "@/components/news/ArticleGrid";

const NewsPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const latestArticle1 = articles[0];
  const latestArticles2 = [articles[1], articles[2]];

  return (
    <div>
      <div className="space-y-16">
        <div className="space-y-7 md:pt-14 pt-8">
          <h2 className="bg-[#00B6590D] text-primary w-fit mx-auto px-6 py-3 text-center">
            WHATS NEW
          </h2>
          <div className="flex md:translate-x-10 justify-center">
            <p className="text-3xl font-semibold">Recent News</p>
            <Image
              src={Vector}
              alt="vectorimage"
              className="hidden md:inline-block"
            />
          </div>
        </div>
        <div className="md:w-[80%] mx-auto grid md:grid-cols-5 gap-x-6">
          <div className="md:col-span-2 col-span-1 md:p-0 p-4">
            <ArticleCardMain
              image={latestArticle1.thumbnail}
              title={latestArticle1.title}
              date={latestArticle1.createdAt}
              paragraph={latestArticle1.excerpt}
            />
          </div>
          <div className="md:col-span-3 col-span-1 flex flex-col gap-y-6 p-4 md:p-0">
            {latestArticles2.map((article, index) => (
              <ArticleCardSide
                key={index}
                image={article.thumbnail}
                title={article.title}
                date={article.createdAt}
                paragraph={article.excerpt}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto py-40 space-y-5">
        <h1 className="font-bold text-3xl px-3">Older News</h1>
        <div className="w-full">
          <ArticleGrid searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
