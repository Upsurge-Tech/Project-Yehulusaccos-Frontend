import { newsPageMetadata } from "@/components/news/newsPageMetadata";
import NewsPage from "@/components/news/NewsPage";

export const metadata = newsPageMetadata;

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: React.FC<PageProps> = (props) => {
  return <NewsPage {...props} />;
};

export default Page;
