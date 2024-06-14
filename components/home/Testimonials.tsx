import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { IoChatbubbles } from "react-icons/io5";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

import curlyarrow from "@/public/curlyarrow.svg";
import unequalStripes from "@/public/unequalStripes.svg";

const Testimonials = () => {
  const tTestimonials = useTranslations("Home.Testimonials");
  const tCarousel = useTranslations("Home.Testimonials.Statements");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="bg-primarySoft w-48 mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        {tTestimonials("Header")}
      </div>
      <h2 className="font-semibold text-2xl lg:text-4xl">
        {tTestimonials("Title")}
      </h2>
      <div className="hidden lg:flex relative  -rotate-45  lg:-top-2 left-72 ">
        <Image
          src={curlyarrow}
          alt="curly green arrow"
          width={100}
          height={100}
        />
      </div>
      <Carousel className="w-full ">
        <div className="hidden xl:flex absolute -bottom-12 left-[230px] ">
          <Image src={unequalStripes} alt="strokes" width={100} height={100} />
        </div>
        <div className="hidden xl:flex absolute top-4 rotate-180 right-[160px] ">
          <Image src={unequalStripes} alt="strokes" width={100} height={100} />
        </div>
        <CarouselContent className="-ml-1 py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="md:pl-20  basis-full xl:basis-1/2 max-w-2xl"
            >
              <div className="relative top-6 right-5">
                <IoChatbubbles className="text-primary " size={50} />
              </div>
              <Card className="h-52 flex flex-col md:py-4 justify-between bg-stone-100 shadow-lg">
                <CardContent className="flex items-center justify-center p-6">
                  “ With the money from Yehulu saving and credit association, I
                  was able to streamline my work and manage myself and my family
                  without any trouble. “
                </CardContent>
                <CardFooter className="self-end">
                  <p className="font-semibold text-primary">
                    Ato Alemneh Mengesha
                  </p>
                </CardFooter>
              </Card>
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
