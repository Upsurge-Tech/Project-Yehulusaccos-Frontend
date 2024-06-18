import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import LoanSavingTable from "./LoanSavingTable";
import { useTranslations } from "next-intl";
import FadeIn from "../animation/FadeIn";
import TitleFadeIn from "../animation/TitleFadeIn";

const LoanServices = () => {
  const tLoanTypes = useTranslations("Loan.LoanTypes");
  const tLoanTypesList = useTranslations("Loan.LoanTypes.TypesOfLoans");
  const typeOfLoans = [
    "Type1",
    "Type2",
    "Type3",
    "Type4",
    "Type5",
    "Type6",
    "Type7",
    "Type8",
    "Type9",
    "Type10",
    "Type11",
  ];

  return (
    <div className="flex flex-col  gap-y-5 lg:gap-y-10 items-center w-full">
      <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        <TitleFadeIn duration={1.3} className="" title={tLoanTypes("Header")} />
      </div>
      <div className="font-semibold text-center text-2xl lg:text-4xl max-w-xl">
        <TitleFadeIn
          duration={1.3}
          className=""
          title={tLoanTypes("Statement")}
        />
      </div>
      <div className="hidden lg:flex relative -rotate-45 bottom-10 left-16 ">
        <Image
          src="/curlyarrow.svg"
          alt="curly green arrow"
          width={80}
          height={100}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 lg:gap-x-36 w-full  ">
        <FadeIn className="">
          <div className="flex items-center gap-x-5 text-gray-500">
            <div>
              <FaCheckCircle size={20} />
            </div>
            <p className="font-semibold text-black text-md lg:text-xl">
              {tLoanTypes("LoanSaving")}
            </p>
          </div>
        </FadeIn>
        <FadeIn className="">
          <div className="flex items-center   gap-x-5 text-gray-500">
            <div>
              <FaCheckCircle size={20} />
            </div>
            <p className="font-semibold text-black text-md lg:text-xl">
              {tLoanTypes("DailyIncome")}
            </p>
          </div>
        </FadeIn>
        <FadeIn className="">
          <div className="flex flex-col text-gray-500 gap-y-5 ">
            <div className="flex items-center gap-x-5">
              <div>
                <FaCheckCircle size={20} />
              </div>
              <p className="font-semibold text-black text-md lg:text-xl">
                {tLoanTypes("LoanType")}
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn className="">
          <div className="flex gap-y-5 text-gray-500">
            <div className="flex gap-x-5 items-center">
              <div>
                <FaCheckCircle size={20} />
              </div>
              <p className="font-semibold text-black text-md lg:text-xl">
                {tLoanTypes("LoanSaving2")}
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn className="">
          <div className="grid grid-cols-1 place-items-center lg:ml-10 lg:place-items-start lg:grid-cols-2  items-center w-full gap-y-4 gap-x-0 lg:gap-x-5 text-gray-500">
            {typeOfLoans.map((loan) => (
              <div className="flex items-center w-52 lg:w-auto" key={loan}>
                <div>
                  <GoDotFill />
                </div>
                <p>{tLoanTypesList(`${loan}`)}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn className="">
          <LoanSavingTable />
        </FadeIn>
      </div>
    </div>
  );
};

export default LoanServices;
