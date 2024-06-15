import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import OurOfficeCarousel from "./OurOfficeCarousel";

const OurOffice = () => {
  const tOffice = useTranslations("AboutUs.Office");
  return (
    <div className="flex flex-col h-full items-start place-self-center justify-center py-5 gap-y-5 xl:gap-y-14 w-3/4 xl:w-full">
      <div className="flex flex-col xl:self-center">
        <div className="bg-primarySoft lg:mb-10 self-start xl:self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tOffice("Header")}
        </div>
        <h2 className="font-semibold text-3xl lg:text-5xl mt-2 lg:mt-0">
          {tOffice("Title")}
        </h2>
        <div className="hidden lg:flex relative -rotate-45 -top-20 left-[250px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={80}
            height={100}
          />
        </div>
      </div>
      <OurOfficeCarousel />
    </div>
  );
};

export default OurOffice;
