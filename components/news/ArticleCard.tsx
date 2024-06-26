import { Article } from "@/data-types/Article";
import { Lang } from "@/data-types/Languages";
import { chooseLang } from "@/lib/articles/utils";
import formateDate from "@/utils/dateFormatter";
import Image from "next/image";

const ArticleCard = ({
  article,
  locale,
}: {
  article: Article;
  locale: Lang;
}) => {
  const chosenLang = chooseLang(article.langIds, locale);
  return (
    <div className=" w-full  flex flex-col gap-y-2 sm:gap-y-4">
      <Image
        width={350}
        height={200}
        priority
        src={`${article.thumbnail}`}
        alt="card image 2"
        className="object-contain self-start rounded-md hover:scale-105 duration-200 max-h-[200px] w-full bg-muted border"
      />
      <div className="bg-primarySoft text-primary self-start flex items-center text-xs font-semibold tracking-wide  px-2 h-7 sm:h-10 rounded-lg">
        {formateDate(article.createdAt)}
      </div>
      <h2 className="font-semibold text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">
        {article.title[chosenLang]}
      </h2>
      <p className="text-gray-600 text-[11px] sm:text-xs line-clamp-3 sm:line-clamp-none">
        {article.excerpt[chosenLang]}
      </p>
    </div>
  );
};

export default ArticleCard;
