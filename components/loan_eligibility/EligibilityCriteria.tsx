import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import TitleFadeIn from "../animation/TitleFadeIn";
import SlideFrom from "../animation/SlideFrom";
import FadeIn from "../animation/FadeIn";
import currlyarrow from "@/public/curlyarrow.svg";

const EligibilityCriteria = () => {
  const tEligibility = useTranslations("Loan.EligibilityCriteria");
  const tEligibilityList = useTranslations("Loan.EligibilityCriteria.Criterias");

  const criterias = ["Criteria1", "Criteria2", "Criteria3", "Criteria4", "Criteria5", "Criteria6", "Criteria7", "Criteria8", "Criteria9", "Criteria10"];

  return (
    <div className="grid lg:grid-cols-4">
      <div className="hidden lg:flex items-center">
        <SlideFrom className="" from="left" delay={1.3}>
          <Image
            src="/leftHandMoney.svg"
            alt="A hand with multiple 100 ETB bills"
            width={270}
            height={100}
          />
        </SlideFrom>
      </div>
      <div className="flex flex-col col-span-2 items-center">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide w-fit mx-auto  px-2 h-10 rounded-lg">
          <TitleFadeIn
            duration={1.5}
            className="font-semibold"
            title={tEligibility("Header")}
          />
        </div>
        <div className="font-semibold text-center text-xl lg:text-4xl">
          <TitleFadeIn
            duration={1.5}
            className="font-semibold"
            title={tEligibility("Statement")}
          />
        </div>
        <div className="hidden lg:flex relative -rotate-45 bottom-[300px] left-[470px] ">
          <Image
            src={currlyarrow}
            alt="curly green arrow"
            width={150}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-y-5 max-w-lg self-center mt-5 lg:mt-0">
          {criterias.map((criteria, index) => (
            <FadeIn key={criteria} delay={index * 0.2} className="">
              <div className="flex  gap-x-5  text-gray-500">
                <div>
                  <FaCheckCircle size={20} />
                </div>
                <p className=" text-sm">{tEligibilityList(`${criteria}`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex items-center" suppressHydrationWarning>
        <SlideFrom className="" from="right" delay={1.3}>
          <Image
            src="/rightHandMoney.svg"
            alt="A hand with multiple 200 ETB bills"
            width={270}
            height={100}
          />
        </SlideFrom>
      </div>
    </div>
  );
};

export default EligibilityCriteria;