import { newsPageMetadata } from "@/components/news/newsPageMetadata";
import NewsPage from "@/components/news/NewsPage";
import { JSX } from "react";

export const metadata = newsPageMetadata;

const Page = (props: JSX.IntrinsicAttributes & { searchParams: { [key: string]: string | string[] | undefined; }; }) => {
  return <NewsPage {...props} />;
};

export default Page;
