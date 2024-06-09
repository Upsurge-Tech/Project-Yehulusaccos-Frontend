import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const criterias = [
  "30% of requested loan amount personal contribution account maintained Loan saving account for 30 consecutive days for 100 & 200 days loan and 16 week for 350 days loan without fail.",
  "The account ledger should checked by credit department for further loan process.",
  "If loan saving account deposit fails/ deteriorated the daily or weekly schedule, loan processing and disbursement date increase by same date.",
  "Loan application, it should disclose purpose of the loan, loan request amount, and loan period and repayment mode.",
  "Personal identification of renewed ID, TIN, Passport etc",
  "Mirage Certificate, TIN number, Renewed Trade Licenses and Registration, Tax Clearance.",
  "Presentation of Collateral.",
  "Purchasing of 50 shares, with the value of 5,000 Birr.",
  "The loan customer/members have 50% borrowing capacity of Demand (Filagot) saving account turnover.",
  "Signed loan contract format between Yehulu and loan customer/members.",
];

const EligibilityCriteria = () => {
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
        LOAN AND ELIGIBILITY CRITERIA
      </div>
      <h2 className="font-semibold text-center text-2xl lg:text-4xl">
        What do you need to fulfill to become eligible for loan services
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
            <p className=" text-sm">{criteria}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EligibilityCriteria;
