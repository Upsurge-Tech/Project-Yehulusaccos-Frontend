import TitleFadeIn from "@/components/animation/TitleFadeIn";
import ArticlesGrid from "@/components/news/ArticlesGrid";
import Contents from "@/components/news/Contents";
import { Article } from "@/data-types/Article";
import { Lang } from "@/data-types/Languages";
import getArticle from "@/lib/articles/getArticle";
import { chooseLang } from "@/lib/articles/utils";
import formateDate from "@/utils/dateFormatter";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: {
    locale: Lang;
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Yehulu | News & Announcements",
};

const NewsDetailPage = async ({ params: { locale, id } }: Props) => {
  const res = await getArticle(Number(id), true);
  if ("error" in res) {
    notFound();
  }

  const { article, relatedArticles } = res;

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

  const localizedArticle = renderArticle(article);
  const localizedRelatedArticles = relatedArticles.map(renderArticle);
  const chosenLang = chooseLang(article.langIds, locale);

  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-24 flex flex-col items-center w-full overflow-hidden gap-y-10 min-h-screen">
      <div className="w-full flex flex-col gap-y-5">
        <div className="bg-primarySoft text-primary self-start flex items-center text-xs font-semibold tracking-wide px-2 h-10 rounded-lg">
          {formateDate(article.createdAt)}
        </div>
        <TitleFadeIn
          title={article.title[chosenLang]}
          className="font-semibold text-xl md:text-2xl lg:text-4xl"
        />
        <div className="relative w-full h-[35vh] sm:h-[50vh] xl:h-[80vh]">
          <Image
            src={article.thumbnail}
            className="rounded-lg object-contain bg-muted border w-full"
            fill
            alt=""
            priority
          />
        </div>
        <Contents
          contents={article.contents}
          langs={article.langIds}
          locale={locale}
        />
      </div>
      <ArticlesGrid articles={relatedArticles} locale={locale} />
    </div>
  );
};

export default NewsDetailPage;
