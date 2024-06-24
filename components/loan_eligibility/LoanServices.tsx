import { useTranslations } from "next-intl";
import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeIn from "../animation/FadeIn";
import TitleFadeIn from "../animation/TitleFadeIn";
import { IoArrowForwardCircleSharp } from "react-icons/io5";


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
    <div className="container flex flex-col  gap-y-5 lg:gap-y-10 items-center w-full">
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
      <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 text-gray-500 w-full gap-5 text-md lg:text-lg">
            {typeOfLoans.map((loan, index) => (
              <FadeIn className="" key={index} delay={0.1 * index} >
                <div className="flex items-center w-52 lg:w-auto gap-x-4 hover:font-semibold" key={loan}>
                <div>
                  <IoArrowForwardCircleSharp className="text-green-600 hover:scale-105"/>
                </div>
                <p>{tLoanTypesList(`${loan}`)}</p>
              </div>
              </FadeIn>
            ))}
          </div>
      </div>
    </div>
  );
};

export default LoanServices;
