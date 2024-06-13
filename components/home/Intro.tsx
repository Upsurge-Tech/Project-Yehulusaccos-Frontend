import React from "react";
import Image from "next/image";
import { FaCarSide, FaPeopleGroup } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import currlyarrow from '@/public/curlyarrow.svg'

import { useTranslations } from "next-intl";

const Intro = () => {

  const tIntro = useTranslations("Home.Intro");  

  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-x-10 xl:gap-x-36 gap-y-10">
      <div className=" order-2 xl:order-1 flex h-full flex-col items-start place-self-center justify-center py-5 gap-y-14 w-3/4 xl:w-full">
        <h2 className="font-semibold text-3xl lg:text-5xl">
          {tIntro("Title")}
        </h2>
        <p className=" text-md lg:text-xl text-gray-600 z-10">
          <span className="font-semibold">{tIntro('Span')}</span> {tIntro('Paragraph')}
        </p>
        <Link href="/contact">
          <Button className="px-6 py-3">{tIntro('ContactButton')}</Button>
        </Link>
      </div>
      <div className=" place-self-center mx-5 order-1 xl:order-2 relative h-[300px] sm:h-[500px] w-4/5 xl:w-full  flex items-center justify-center rounded-3xl">
        <Image
          src="/_DSC3225-1.jpg"
          priority
          fill
          className=" object-cover rounded-xl lg:rounded-3xl"
          alt="7 persons standing & 1 person sitting for a photoshoot"
        />
        <div className="hidden xl:block relative right-96 top-[160px]  xl:right-[500px]  xl:top-28 ">
          <Image
            src={currlyarrow}
            alt="curly green arrow"
            width={150}
            height={100}
          />
        </div>
        <div className=" absolute -left-10 md:-left-16 xl:-left-24 top-10 h-8 sm:h-14 rounded-lg items-center px-1 sm:px-4 shadow-xl bg-white flex gap-4">
          <FaCarSide className="text-primary text-lg sm:text-2xl" />
          <p className="font-semibold text-sm sm:text-md">{tIntro('SmallBusiness')}</p>
        </div>
        <div className=" absolute -bottom-7 h-8 sm:h-14 rounded-lg items-center px-1 sm:px-4 shadow-xl bg-white flex gap-4">
          <IoHome className="text-primary text-lg sm:text-2xl" />
          <p className="font-semibold text-sm sm:text-md">{tIntro('Individuals')}</p>
        </div>
        <div className=" absolute right-12 md:right-10 bottom-24 xl:bottom-auto xl:right-10 2xl:-right-10 shadow-xl rounded-full flex items-center justify-center bg-white h-10 w-10 sm:h-16 sm:w-16">
          <FaPeopleGroup className="text-primary text-lg lg:text-2xl" />
          <div className="absolute sm:bottom-8 bottom-7 left-2 sm:left-10 bg-primary w-32 h-8 sm:h-10 flex justify-center items-center px-2 sm:px-3 text-center rounded-full text-white">
            <p className="sm:text-sm text-xs">{tIntro('SmallBusinessThrive')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
