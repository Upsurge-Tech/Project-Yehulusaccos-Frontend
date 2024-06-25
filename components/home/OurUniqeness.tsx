import React from "react";
import Image from "next/image";
import { FaCheckCircle, FaStoreAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { useTranslations } from "next-intl";

import plantsWithCents from "@/public/plantsWithCents.svg";
import curlyarrow from "@/public/curlyarrow.svg";
import TitleFadeIn from "../animation/TitleFadeIn";
import SlideFrom from "../animation/SlideFrom";
import Bounce from "../animation/Bounce";
import FadeIn from "../animation/FadeIn";
import { IoArrowForwardCircleSharp } from "react-icons/io5";


const OurUniqeness = () => {
  const tOurUniqueness = useTranslations("Home.OurUniqueness");
  const tuniqueMap = useTranslations("Home.OurUniqueness.Uniqueness");

  const uniqeness = [
    "Uniqueness1",
    "Uniqueness2",
    "Uniqueness3",
    "Uniqueness4",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 ">
      <div className="flex flex-col gap-y-10 mt-16">
        <div
          style={{
            backgroundColor: "rgba(0, 182, 89, 0.05)",
          }}
          className="w-48 self-center xl:self-start text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg"
        >
          {tOurUniqueness("Header")}
        </div>
        <TitleFadeIn
          title={tOurUniqueness("Title")}
          className="font-semibold text-2xl self-center xl:self-auto lg:text-4xl"
        />

        <SlideFrom
          from="left"
          className="flex flex-col gap-y-5 self-center xl:self-auto xl:w-full w-3/4"
        >
          {uniqeness.map((unique) => (
            <div key={unique} className="flex  gap-x-5  text-gray-500">
              <div>
                <IoArrowForwardCircleSharp className="text-green-600" size={20} />
              </div>
              <p className=" text-sm">{tuniqueMap(`${unique}`)}</p>
            </div>
          ))}
        </SlideFrom>
      </div>
      <SlideFrom
        from="right"
        className="place-self-center h-[300px] sm:h-[500px] w-3/4 xl:w-full order-1 xl:order-2 relative flex flex-col items-center justify-center rounded-3xl"
      >
        <Image
          src={plantsWithCents}
          fill
          className="h-full object-cover rounded-xl lg:rounded-3xl"
          alt="2 plants in a jar with cents"
        />
        <div className="hidden lg:block relative rotate-45 -top-72 xl:top-28 right-36  xl:right-[400px] 2xl:right-[600px]">
          <Image
            src={curlyarrow}
            alt="curly green arrow"
            width={100}
            height={100}
          />
        </div>
        <FadeIn className="" delay={0.75}>
          <Bounce
            duration={3}
            delay={0.75}
            className=" absolute -left-10 sm:-left-16 top-10 h-10 sm:h-14 rounded-lg items-center px-2 sm:px-4 shadow-xl bg-white flex gap-4"
          >
            <FaKey className="text-primary text-lg sm:text-2xl" />
            <p className="font-semibold">{tOurUniqueness("Accessibility")}</p>
          </Bounce>
        </FadeIn>
        <FadeIn className="" delay={0.75}>
          <Bounce
            duration={3}
            delay={0.75}
            className="absolute bottom-12 -right-10 sm:-right-16 h-10 sm:h-14 rounded-lg items-center px-2 sm:px-4 shadow-xl bg-white flex gap-4"
          >
            <FaStoreAlt className="text-primary text-lg sm:text-2xl" />
            <p className="font-semibold">{tOurUniqueness("Collateral")}</p>
          </Bounce>
        </FadeIn>
      </SlideFrom>
    </div>
  );
};

export default OurUniqeness;
