import ArticlesGrid from "@/components/news/ArticlesGrid";
import { Article } from "@/data-types/Article";
import Image from "next/image";
import React from "react";

import formateDate from "@/utils/dateFormatter";

interface Props {
  params: {
    id: string;
  };
}

interface FetchArticle {
  data: {
    article: Article;
    relatedArticles: Article[];
  };
}

const NewsDetailPage = async ({ params: { id } }: Props) => {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`);
  const {
    data: { article, relatedArticles },
  }: FetchArticle = await res.json();

  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-24 flex flex-col items-center w-full overflow-hidden gap-y-10  min-h-screen ">
      <div className=" w-full flex flex-col gap-y-5">
        <div className="bg-primarySoft text-primary self-start flex items-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {formateDate(article.createdAt)}
        </div>
        <h2 className="font-semibold text-xl md:text-2xl lg:text-4xl">
          {article.title}
        </h2>
        <div className="relative w-full h-[35vh] sm:h-[50vh] xl:h-[80vh]">
          <Image
            src={article.thumbnail}
            className="rounded-lg object-cover"
            fill
            alt=""
            priority
          />
        </div>
        <div className="flex flex-col gap-y-5">
          {article.contents.map((content) => {
            if (content.type === "paragraph")
              return (
                <p
                  key={content.id}
                  className="text-gray-500 text-[13px] sm:text-sm md:text-md"
                >
                  {content.paragraph}
                </p>
              );
          })}
        </div>
      </div>
      <ArticlesGrid label="Related" articles={relatedArticles} />
    </div>
  );
};

export default NewsDetailPage;
