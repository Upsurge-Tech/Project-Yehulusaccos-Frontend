import ArticlesGrid from "@/components/news/ArticlesGrid";
import Image from "next/image";
import Contents from "@/components/news/Contents";
import getArticle from "@/lib/articles/getArticle";
import formateDate from "@/utils/dateFormatter";
import TitleFadeIn from "@/components/animation/TitleFadeIn";
import { Metadata } from "next";
import { Article } from "@/data-types/Article";
import { notFound } from 'next/navigation';

interface Props {
  params: {
    locale: string;
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
    if (locale === "am") {
      return {
        ...article,
        title: article.title.am,
        excerpt: article.excerpt.am,
        contents: article.contents.map((content) => {
          if (content.type === "heading") return { ...content, heading: content.heading?.am };
          if (content.type === "paragraph") return { ...content, paragraph: content.paragraph?.am };
          return content;
        }),
      };
    }
    return {
      ...article,
      title: article.title.en,
      excerpt: article.excerpt.en,
      contents: article.contents.map((content) => {
        if (content.type === "heading") return { ...content, heading: content.heading?.en };
        if (content.type === "paragraph") return { ...content, paragraph: content.paragraph?.en };
        return content;
      }),
    };
  };

  const localizedArticle = renderArticle(article);
  const localizedRelatedArticles = relatedArticles.map(renderArticle);

  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-24 flex flex-col items-center w-full overflow-hidden gap-y-10 min-h-screen">
      <div className="w-full flex flex-col gap-y-5">
        <div className="bg-primarySoft text-primary self-start flex items-center text-xs font-semibold tracking-wide px-2 h-10 rounded-lg">
          {formateDate(article.createdAt)}
        </div>
        <TitleFadeIn
          title={localizedArticle.title}
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
        <Contents contents={localizedArticle.contents} />
      </div>
      <ArticlesGrid articles={localizedRelatedArticles} />
    </div>
  );
};

export default NewsDetailPage;
