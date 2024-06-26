import { Article } from "@/data-types/Article";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ArticelCard from "./ArticleCard";

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
        {articles.length === 0 && (
          <p className="text-muted-foreground">-- No News Articles yet -- </p>
        )}
      </div>
    </div>
  );
};

export default ArticlesGrid;
