import { useTranslations } from "next-intl";
import Image from "next/image";
import FadeIn from "../animation/FadeIn";
import HorizontalStepper from "./HorizontalStepper";

const LoanSavingServices = () => {
  const tLoanSavingServices = useTranslations("Services.LoanSaving");
  return (
    <>
      <div className=" flex flex-col max-w-xl gap-y-5 lg:gap-y-0">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          {tLoanSavingServices("Header")}
        </div>
        <FadeIn className="">
          <h2 className="font-semibold text-center text-2xl lg:text-4xl">
            {tLoanSavingServices("Title")}
          </h2>
        </FadeIn>
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
        <HorizontalStepper />
      </div>
    </>
  );
};

export default LoanSavingServices;
