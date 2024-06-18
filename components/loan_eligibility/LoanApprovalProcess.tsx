import React from "react";
import Image from "next/image";
import Stepper from "./Stepper";

import { useTranslations } from "next-intl";
import TitleFadeIn from "../animation/TitleFadeIn";

const LoanApprovalProcess = () => {
  const tApproval = useTranslations("Loan.ApprovalProcess");
  return (
    <div className="flex flex-col max-w-xl gap-y-5 lg:gap-y-0">
      <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        <TitleFadeIn duration={1.5} className="" title={tApproval("Header")} />
      </div>
      <div className="font-semibold text-center text-2xl lg:text-4xl">
        <TitleFadeIn
          duration={1.5}
          className=""
          title={tApproval("Statement")}
        />
      </div>
      <div className="hidden lg:flex relative -rotate-45 bottom-[120px] left-[300px] ">
        <Image
          src="/curlyarrow.svg"
          alt="curly green arrow"
          width={80}
          height={100}
        />
      </div>
      <Stepper />
    </div>
  );
};

export default LoanApprovalProcess;
