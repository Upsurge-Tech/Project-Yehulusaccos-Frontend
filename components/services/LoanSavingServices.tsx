import React from "react";
import Image from "next/image";
import HorizontalStepper from "./HorizontalStepper";

const steps = [
  { id: 1, step: "1000Birr membership fee" },
  { id: 2, step: "Be Willing to save from a minimum of 10 birr a day" },
  {
    id: 3,
    step: "Be Willing to buy a minimum of 50 lotteries of price 100birr each",
  },
  { id: 4, step: "A Copy of your ID" },
  { id: 5, step: "Four passport size photos" },
  {
    id: 6,
    step: "Be willing to accept and follow terms and conditions",
  },
];

const LoanSavingServices = () => {
  return (
    <>
      <div className=" flex flex-col max-w-xl gap-y-5 lg:gap-y-0">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          LOAN AND SAVING SERVICES
        </div>
        <h2 className="font-semibold text-center text-2xl lg:text-4xl">
          To become a member of our service
        </h2>
        <div className="hidden lg:flex relative -rotate-45 bottom-[190px] left-[250px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={55}
            height={100}
          />
        </div>
      </div>
      <div className="w-full">
        <HorizontalStepper steps={steps} />
      </div>
    </>
  );
};

export default LoanSavingServices;
