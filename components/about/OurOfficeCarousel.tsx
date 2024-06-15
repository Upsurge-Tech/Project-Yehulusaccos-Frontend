"use client";

import React from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

const OurOfficeCarousel = () => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full "
    >
      <CarouselContent className="mx-1 sm:mx-5 lg:mx-auto py-3">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="relative mx-4 xl:mx-10 h-72 lg:h-96 basis-full lg:basis-1/2 "
          >
            <Image
              fill
              className="rounded-xl object-cover"
              src={`/assets/office_${index + 1}.jpg`}
              alt="Office photo"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-primary hover:scale-110" />
      <CarouselNext className="text-primary hover:scale-110" />
    </Carousel>
  );
};

export default OurOfficeCarousel;
