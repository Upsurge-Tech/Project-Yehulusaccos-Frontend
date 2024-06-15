import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import curly from "@/public/curlyarrow.svg";
import threecircles from "@/public/threecircles.svg";
import briefcase from "@/public/briefcase.svg";
import rocket from "@/public/rocket.svg";
import TitleFadeIn from "../animation/TitleFadeIn";
import SlideFrom from "../animation/SlideFrom";

// const values = [
//   "Helping members achieve financial freedom, simplify their lives and live their dreams.",
//   "Being able to support hardworking employees with low income sources will enable them to reach their earning potential.",
//   "Meet the needs of the user society by generating long-term financial reserves.",
//   "Reducing unemployment and economic problems as a responsible stakeholder.",
//   "To develop and expand savings and loan services among members and the community.",
//   "Build a large-scale membership of the largest financial provider association in Ethiopia.",
//   "Providing loan services by encouraging unsecured workers who wanted to use loan services.",
//   "Being able to make a positive impact in the financial sector.",
// ];

const OurBelieve = () => {
  const tOurBelieve = useTranslations("Home.OurBelieve");
  const tOurValues = useTranslations("Home.OurBelieve.OurValues");

  const values = [
    "Values1",
    "Values2",
    "Values3",
    "Values4",
    "Values5",
    "Values6",
    "Values7",
    "Values8",
  ];

  return (
    <div className=" w-full  flex flex-col items-center">
      <div className="bg-primarySoft w-48 mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        {tOurBelieve("Header")}
      </div>
      <TitleFadeIn
        title={tOurBelieve("Title")}
        className="font-semibold text-2xl lg:text-4xl"
      />

      <div className="hidden xl:flex relative  -rotate-45 lg:-top-2 left-48 ">
        <Image src={curly} alt="curly green arrow" width={100} height={100} />
      </div>
      <div className="w-full flex flex-col mt-10 xl:mt-auto gap-y-7 xl:gap-y-20 xl:flex-row">
        <SlideFrom
          className="flex flex-col items-center lg:items-start gap-y-5 xl:gap-y-20 w-full "
          from="left"
        >
          <div className=" flex self-center flex-col w-3/4 xl:w-full">
            <Image
              src={threecircles}
              width={30}
              height={30}
              alt="three circles"
            />
            <h3 className="text-lg font-semibold pt-2 xl:pt-5">
              {tOurBelieve("Vision")}
            </h3>
            <p className="text-gray-600 text-sm">
              {tOurBelieve("VisionParagraph")}
            </p>
          </div>
          <div className="flex self-center flex-col w-3/4 xl:w-full">
            <Image src={briefcase} width={30} height={30} alt="briefcase" />
            <h3 className="text-lg font-semibold pt-2 xl:pt-5">
              {tOurBelieve("Mission")}
            </h3>
            <p className="text-gray-600 text-sm">
              {tOurBelieve("MissionParagraph")}
            </p>
          </div>
        </SlideFrom>

        <SlideFrom
          from="right"
          className="flex flex-col self-center w-3/4 xl:w-full gap-y-2 xl:gap-y-5 "
        >
          <Image src={rocket} width={30} height={30} alt="green rocket" />
          <h3 className="text-lg font-semibold">{tOurBelieve("Values")}</h3>
          <div className="flex flex-col gap-y-5">
            {values.map((value) => (
              <div key={value} className="flex  gap-x-5  text-gray-500">
                <div>
                  <FaCheckCircle size={20} />
                </div>
                <p className=" text-sm">{tOurValues(`${value}.name`)}</p>
              </div>
            ))}
          </div>
        </SlideFrom>
      </div>
    </div>
  );
};

export default OurBelieve;
