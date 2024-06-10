import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-x-10 xl:gap-x-36 gap-y-10">
      <div className=" order-2 xl:order-1 flex h-full flex-col items-start place-self-center justify-center py-5 gap-y-5 xl:gap-y-14 w-3/4 xl:w-full">
        <div className="flex flex-col gap-y-1">
          <div className="bg-primarySoft lg:mb-10 self-start text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
            ABOUT US
          </div>
          <h2 className="font-semibold text-3xl lg:text-5xl mt-2 lg:mt-0">
            Who are we?
          </h2>
        </div>
        <div className="flex flex-col gap-y-2 text-xs md:text-sm lg:text-lg text-gray-600 z-10">
          <p>
            <span className="font-semibold">Yehulu</span> is a financial
            cooperative established in 2015 EC with a mission to provide easy
            access to savings and credit services for all, especially those who
            might not qualify for traditional banking options. We offer a
            variety of savings plans, including regular savings, time deposits,
            and home and vehicle purchase savings accounts
          </p>
          <p>
            Traditional banks can feel intimidating, with complex processes and
            high barriers to entry. We knew there had to be a better way!
            That&apos;s where Yehulu comes in. We&apos;re here to make saving
            and getting credit straightforward and accessible for everyone.
          </p>
        </div>
      </div>
      <div className=" place-self-center mx-5 order-1 xl:order-2 relative h-[300px] sm:h-[500px] w-4/5 xl:w-full  flex items-center justify-center rounded-3xl">
        <Image
          src="/assets/About_1.JPG"
          fill
          className=" object-cover rounded-xl lg:rounded-3xl"
          alt="7 persons standing & 1 person sitting for a photoshoot"
        />
        <div className="hidden xl:block relative rotate-12 bottom-[250px] left-[265px] xl:left-[295px]   ">
          <Image
            src="/glow.svg"
            alt="green unequal strokes"
            width={50}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
