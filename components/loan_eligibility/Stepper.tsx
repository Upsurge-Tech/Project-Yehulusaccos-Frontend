import React from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { IoDocumentText } from "react-icons/io5";
import { useTranslations } from "next-intl";

const Stepper = () => {

  const tStepper = useTranslations("Loan.Stepper");

  return (
    <ol className="w-full mt-10 relative left-36 lg:left-52 border-s-2 border-gray-300 ">
      <li className="mb-10 ms-6 h-24">
        <span className="absolute flex items-center justify-center w-12 h-12  rounded-full bg-white border-2 border-primary -start-6 ring-4 ring-white ">
          1
        </span>
        <div className="relative flex flex-col gap-2 text-center right-[200px] lg:right-[360px] max-w-[175px] lg:max-w-xs ">
          <IoDocumentText
            size={35}
            className="self-center text-primary font-medium leading-tight"
          />
          <p className="text-xs lg:text-sm self-end">
            {tStepper("Step1")}
          </p>
        </div>
      </li>
      <li className="mb-10 ms-6 h-24">
        <span className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary -start-6 ring-4 ring-white ">
          2
        </span>
        <div className="relative flex flex-col gap-2  items-center max-w-[15rem] text-center right-20 lg:right-auto">
          <ImLocation2
            size={35}
            className="font-medium leading-tight text-primary"
          />
          <p className="text-xs lg:text-sm max-w-24 lg:max-w-xs">
            {tStepper("Step2")}
          </p>
        </div>
      </li>
      <li className="mb-10 ms-6 h-24">
        <span className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary -start-6 ring-4 ring-white ">
          3
        </span>
        <div className="relative flex flex-col gap-2 text-center right-[183px] lg:right-[360px] max-w-36 lg:max-w-xs ">
          <FaThumbsUp
            size={35}
            className="self-center text-primary font-medium leading-tight"
          />
          <p className="text-xs lg:text-sm self-end">
            {tStepper("Step3")}
          </p>
        </div>
      </li>
      <li className="ms-6">
        <span className="absolute flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-primary -start-6 ring-4 ring-white ">
          4
        </span>
        <div className="flex flex-col gap-2 items-center max-w-[4rem] text-center ">
          <FaMoneyBillTransfer
            size={35}
            className="font-medium leading-tight text-primary"
          />
          <p className="text-xs lg:text-sm">{tStepper("Step4")}</p>
        </div>
      </li>
    </ol>
  );
};

export default Stepper;
