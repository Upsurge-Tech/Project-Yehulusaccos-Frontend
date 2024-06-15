import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { IoChatbubbles } from "react-icons/io5";
import { CardContent, CardFooter } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

import curlyarrow from "@/public/curlyarrow.svg";
import unequalStripes from "@/public/unequalStripes.svg";
import TitleFadeIn from "../animation/TitleFadeIn";
import FadeIn from "../animation/FadeIn";
import PopUp from "../animation/PopUp";

const Testimonials = () => {
  const tTestimonials = useTranslations("Home.Testimonials");
  const tStatements = useTranslations("Home.Testimonials.Statements");

  const StatementList = ["statement1", "statement2", "statement3"];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-primarySoft w-48 mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide px-2 h-10 rounded-lg">
        {tTestimonials("Header")}
      </div>
      <TitleFadeIn
        title={tTestimonials("Title")}
        className="font-semibold text-2xl lg:text-4xl"
      />
      <div className="hidden lg:flex relative -rotate-45 lg:-top-2 left-72">
        <Image
          src={curlyarrow}
          alt="curly green arrow"
          width={100}
          height={100}
        />
      </div>
      <Carousel className="w-full">
        <div className="hidden xl:flex absolute -bottom-12 left-[230px]">
          <Image src={unequalStripes} alt="strokes" width={100} height={100} />
        </div>
        <div className="hidden xl:flex absolute top-4 rotate-180 right-[160px]">
          <Image src={unequalStripes} alt="strokes" width={100} height={100} />
        </div>
        <CarouselContent className="-ml-1 py-3">
          {StatementList.map((statement, index) => (
            <CarouselItem
              key={index}
              className="md:pl-20 basis-full xl:basis-1/2 max-w-2xl"
            >
              <PopUp className="relative top-6 right-5 z-10">
                <IoChatbubbles className="text-primary" size={50} />
              </PopUp>
              <FadeIn className="h-52 flex flex-col md:py-4 justify-between rounded-xl border-[1px] bg-stone-50 border-stone-200 shadow-lg">
                <CardContent className="flex items-center justify-center p-6">
                  {tStatements(`${statement}.text`)}
                </CardContent>
                <CardFooter className="self-end">
                  <p className="font-semibold text-primary">
                    {tStatements(`${statement}.name`)}
                  </p>
                </CardFooter>
              </FadeIn>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Testimonials;
