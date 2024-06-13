import React from "react";
import Image from "next/image";

import Questions from "@/components/faq/Questions";

const FAQPage = () => {
  return (
    <div className="container my-5 md:my-10 lg:my-16 xl:my-24 flex flex-col items-center w-full overflow-hidden gap-y-5  min-h-screen ">
      <div className=" flex flex-col max-w-xl gap-y-5 lg:gap-y-0">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          FAQ
        </div>
        <h2 className="font-semibold text-center text-2xl lg:text-4xl">
          Frequently asked questions
        </h2>
        <div className="hidden lg:flex relative -rotate-45 bottom-[150px] left-[385px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={55}
            height={100}
          />
        </div>
      </div>
      <Questions />
    </div>
  );
};

export default FAQPage;
