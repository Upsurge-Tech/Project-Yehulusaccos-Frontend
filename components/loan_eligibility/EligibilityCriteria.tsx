import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";


const EligibilityCriteria = () => {
  const tEligibility = useTranslations("Loan.EligibilityCriteria");
  const tEligibilityList = useTranslations("Loan.EligibilityCriteria.Criterias");

  const criterias = ["Criteria1", "Criteria2", "Criteria3", "Criteria4", "Criteria5", "Criteria6", "Criteria7", "Criteria8", "Criteria9", "Criteria10"]

  return (
    <div className=" flex flex-col max-w-xl gap-y-5 lg:gap-y-0">
      <div className="hidden lg:flex absolute top-[500px] -left-4">
        <Image
          src="/leftHandMoney.svg"
          alt="A hand with multiple 100 ETB bills"
          width={270}
          height={100}
        />
      </div>
      <div className="hidden lg:flex absolute top-[500px] right-1">
        <Image
          src="/rightHandMoney.svg"
          alt="A hand with multiple 200 ETB bills"
          width={270}
          height={100}
        />
      </div>
      <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        {tEligibility("Header")}
      </div>
      <h2 className="font-semibold text-center text-2xl lg:text-4xl">
        {tEligibility("Statement")}
      </h2>
      <div className="hidden lg:flex relative -rotate-45 bottom-[180px] left-[470px] ">
        <Image
          src="/curlyarrow.svg"
          alt="curly green arrow"
          width={80}
          height={100}
        />
      </div>
      <div className="flex flex-col gap-y-5 max-w-lg self-center mt-5 lg:mt-0">
        {criterias.map((criteria) => (
          <div key={criteria} className="flex  gap-x-5  text-gray-500">
            <div>
              <FaCheckCircle size={20} />
            </div>
            <p className=" text-sm">{tEligibilityList(`${criteria}`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityCriteria;
