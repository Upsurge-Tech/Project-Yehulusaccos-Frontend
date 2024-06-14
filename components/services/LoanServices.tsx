import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const LoanServices = () => {
  const tLoanServices = useTranslations("Services.LoanServices");
  const tLoanList = useTranslations("Services.LoanServices.LoanServicesList");

  const loanServices = ["service1", "service2", "service3", "service4"];

  return (
    <div className="flex flex-col w-full gap-y-10 mt-16">
      <div className="flex flex-col  items-center w-full">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tLoanServices("Header")}
        </div>
        <h2 className="font-semibold text-center mt-5 text-2xl lg:text-4xl max-w-xl">
          {tLoanServices("Title")}
        </h2>
        <div className="hidden lg:flex relative -rotate-45 bottom-10 top-0 left-[130px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={60}
            height={100}
          />
        </div>
      </div>
      <div className="w-full place-items-center grid grid-cols-1 md:grid-cols-2 xl:flex  gap-5 lg:gap-10 mt-2 gap-y-7 xl:gap-x-24 xl:gap-y-16">
        {loanServices.map((ls) => (
          <div
            key={tLoanList(`${ls}.title`)}
            className="flex w-[220px] gap-4 items-center "
          >
            <Image
              src={tLoanList(`${ls}.image`)}
              width={30}
              height={30}
              className="self-start"
              alt={tLoanList(`${ls}.title`)}
            />
            <p className="text-sm font-semibold">{tLoanList(`${ls}.title`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanServices;
