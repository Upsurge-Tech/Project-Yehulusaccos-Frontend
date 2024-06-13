import React from "react";
import Image from "next/image";
import { Article, ParagraphContent } from "@/data-types/Article";
import formateDate from "@/utils/dateFormatter";

interface Props {
  article: Article;
}

const ArticleCard = ({ article }: Props) => {
  return (
    <div className=" w-full flex flex-col gap-y-2 sm:gap-y-4">
      <Image
        width={500}
        height={100}
        priority
        src={`${article.thumbnail}`}
        alt=""
        className="object-contain self-start rounded-md hover:scale-105 duration-200"
      />
      <div className="bg-primarySoft text-primary self-start flex items-center text-xs font-semibold tracking-wide  px-2 h-7 sm:h-10 rounded-lg">
        {formateDate(article.createdAt)}
      </div>
      <h2 className="font-semibold text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
        {article.title}
      </h2>
      <p className="text-gray-600 text-[11px] sm:text-xs line-clamp-3 sm:line-clamp-none">
        {
          (article.contents.find(
            (content) => content.type === "paragraph"
          ) as ParagraphContent)!.paragraph
        }
      </p>
    </div>
  );
};

export default ArticleCard;
