import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SlideFrom from "../animation/SlideFrom";

const AboutUs = () => {
  const tAbout = useTranslations("AboutUs");
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-x-10 xl:gap-x-36 gap-y-10">
      <div className=" order-2 xl:order-1 flex h-full flex-col items-start place-self-center justify-center py-5 lg:gap-y-5 xl:gap-y-14 w-3/4 xl:w-full">
        <div className="flex flex-col lg:gap-y-1">
          <div className="bg-primarySoft lg:mb-10 self-start text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
            {tAbout("Header")}
          </div>
          <SlideFrom className="" from="left">
            <h2 className="font-semibold text-3xl lg:text-5xl mt-2 lg:mt-0">
              {tAbout("Question")}
            </h2>
          </SlideFrom>
        </div>

        <SlideFrom
          from="left"
          className="flex flex-col mt-2 lg:mt-0 gap-y-2 text-sm lg:text-lg text-gray-600 z-10"
        >
          <p>
            <span className="font-semibold">{tAbout("InnerParagraph1")} </span>
            {tAbout("Paragraph1")}
          </p>
          <p>{tAbout("Paragraph2")}</p>
        </SlideFrom>
      </div>
      <SlideFrom
        from="right"
        className=" place-self-center mx-5 order-1 xl:order-2 relative h-[300px] sm:h-[500px] w-4/5 xl:w-full  flex items-center justify-center rounded-3xl"
      >
        <Image
          src="/assets/About_1.jpg"
          fill
          className=" object-cover rounded-xl lg:rounded-3xl"
          alt="A person infront of receptionist."
        />
        <div className="hidden xl:block relative rotate-12 bottom-[250px] left-[265px] xl:left-[295px]   ">
          <Image
            src="/glow.svg"
            alt="green unequal strokes"
            width={50}
            height={100}
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </SlideFrom>
    </div>
  );
};

export default AboutUs;
