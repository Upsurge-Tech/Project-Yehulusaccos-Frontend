import { Article } from "@/data-types/Article";
import { Lang } from "@/data-types/Languages";
import { chooseLang } from "@/lib/articles/utils";
import formateDate from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundUp } from "react-icons/io";

const ArticleCardMain = ({
  article,
  locale,
}: {
  article: Article;
  locale: Lang;
}) => {
  const chosenLang = chooseLang(article.langIds, locale);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex-1 w-full h-full">
        <Image
          src={article.thumbnail}
          width={1600}
          height={1900}
          alt="Thumbnail for Article"
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 space-y-3">
        <span className="text-primary w-fit px-10 py-2 rounded-md text-center bg-[#00B6590D]">
          {formateDate(article.createdAt)}
        </span>
        <Link
          href={`/news/${article.id}`}
          className="flex justify-between items-center gap-x-3"
        >
          <p className="font-bold">{article.title[chosenLang]}</p>
          <IoIosArrowRoundUp className="text-primary rotate-45" size={40} />
        </Link>
        <p>{article.excerpt[chosenLang]}</p>
      </div>
    </div>
  );
};

export default ArticleCardMain;
