"use client";

import React, { useEffect, useState } from "react";
import ArticleCardMain from "@/components/news/ArticleCardMain";
import ArticleCardSide from "@/components/news/ArticleCardSide";
import ArticleGrid from "@/components/news/ArticleGrid";
import articles from "@/data/articles";
import Vector from "@/public/Vector.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TitleFadeIn from "@/components/animation/TitleFadeIn";
import SlideFrom from "@/components/animation/SlideFrom";
import FadeIn from "@/components/animation/FadeIn";

const NewsPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const [latestArticles, setLatestArticles] = useState([]);
  const tnews = useTranslations("News");
  const page = 1;
  const offset = 0;
  const pageSize = 3;

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const res = await fetch(
          `/api/articles?page=${page}&size=${pageSize}&offset=${offset}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await res.json();
        setLatestArticles(data.data);
        console.log(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLatestArticles();
  }, []);

  // const latestArticles = [
  //   {
  //     id: 1,
  //     title: "The first article",
  //     excerpt: "This is the first article",
  //     thumbnail: "/vehicle.svg",
  //     createdAt: "2021-09-01",
  //    },
  //   {
  //     id: 2,
  //     title: "The second article",
  //     excerpt: "This is the second article",
  //     thumbnail: "/vehicle.svg",
  //     createdAt: "2021-09-02",
  //   },
  //   {
  //     id: 3,
  //     title: "The third article",
  //     excerpt: "This is the third article",
  //     thumbnail: "/vehicle.svg",
  //     createdAt: "2021-09-03",
  //   },
  // ]

  const latestArticles2 = latestArticles.slice(1);
  const latestArticle1 = latestArticles[0];

  return (
    <div>
      <div className="space-y-16">
        <div className="space-y-7 md:pt-14 pt-8">
          <div className="bg-[#00B6590D] text-primary w-fit mx-auto px-6 py-3 text-center">
            <TitleFadeIn className="" delay={0.2} title={tnews("Header")} />
          </div>
          <div className="flex md:translate-x-10 justify-center">
            <FadeIn className="" delay={0.2}>
              <p className="text-3xl font-semibold">{tnews("RecentNews")}</p>
            </FadeIn>
            <Image
              src={Vector}
              alt="vectorimage"
              className="hidden md:inline-block"
            />
          </div>
        </div>
        {latestArticles.length === 0 && (
          <p className="text-center text-xl text-gray-700 font-semibold">{tnews("NoNews")}</p>
        )}
        {latestArticles.length === 1 && (
          <FadeIn className="" delay={1.3}>
            <div className="md:w-[80%] mx-auto">
              <div className="p-4 border md:w-[60%] w-[100%] lg:w-[40%]">
                <ArticleCardMain article={latestArticle1} />
              </div>
            </div>
          </FadeIn>
        )}
        {latestArticles.length === 2 && (
          <div className="md:w-[70%] lg:w-[60%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <SlideFrom from="left" className="">
              <div className=" col-span-1 p-4 border border-black">
                <ArticleCardMain article={latestArticle1} />
              </div>
            </SlideFrom>
            <SlideFrom className="" from="right">
              <div className="col-span-1 p-4 border border-black">
                <ArticleCardMain article={latestArticles2[0]} />
              </div>
            </SlideFrom>
          </div>
        )}
        {latestArticles.length === 3 && (
          <div className="md:w-[80%] mx-auto grid md:grid-cols-5 gap-x-6">
            <div className="md:col-span-2 col-span-1 md:p-0 p-4">
              {latestArticle1 && (
                <SlideFrom from="left" className="">
                  <ArticleCardMain article={latestArticle1} />
                </SlideFrom>
              )}
            </div>
            <div className="md:col-span-3 col-span-1 flex flex-col gap-y-6 p-4 md:p-0">
              {latestArticles2 &&
                latestArticles2.map((article, index) => (
                  <SlideFrom className="" from="right" key={index}>
                    <ArticleCardSide article={article} />
                  </SlideFrom>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-[80%] mx-auto py-40 space-y-5">
        <div className="font-bold text-3xl px-3">
          <TitleFadeIn className="" delay={0.2} title={tnews("OlderNews")} />
        </div>
        <div className="w-full">
          <ArticleGrid />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
