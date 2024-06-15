import { Article } from "@/data-types/Article";
import formateDate from "@/utils/dateFormatter";
import Image from "next/image";
import { IoIosArrowRoundUp } from "react-icons/io";

const ArticleCardSide = ({ article }: { article: Article }) => {
  return (
    <div className="flex md:flex-row flex-col gap-x-4">
      <div className="flex-1">
        <Image
          src={article.thumbnail}
          width={1600}
          height={1600}
          alt="cardimage"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="flex-1 py-4 space-y-4">
        <span className="text-primary w-fit px-10 py-2 rounded-md text-center bg-[#00B6590D]">
          {formateDate(article.createdAt)}
        </span>
        <div className="flex justify-between items-center gap-x-3">
          <p className="font-bold">{article.title}</p>
          <IoIosArrowRoundUp className="text-primary rotate-45" size={40} />
        </div>
        <p>{article.excerpt}</p>
      </div>
    </div>
  );
};

export default ArticleCardSide;
