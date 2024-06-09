import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import LoanSavingTable from "./LoanSavingTable";

const typeOfLoans = [
  "A day",
  "Three days",
  "Seven days",
  "Thirty days",
  "Sixty days",
  "One hundred days",
  "Two hundred days",
  "Three hundred days",
  "One year",
  "Two years",
  "Three years",
];

const LoanServices = () => {
  return (
    <div className="flex flex-col  gap-y-5 lg:gap-y-10 items-center w-full">
      <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        LOAN SERVICES
      </div>
      <h2 className="font-semibold text-center text-2xl lg:text-4xl max-w-xl">
        Different types of loan services we offer
      </h2>
      <div className="hidden lg:flex relative -rotate-45 bottom-10 left-16 ">
        <Image
          src="/curlyarrow.svg"
          alt="curly green arrow"
          width={80}
          height={100}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 lg:gap-x-36 w-full  ">
        <div className="flex items-center gap-x-5 text-gray-500">
          <div>
            <FaCheckCircle size={20} />
          </div>
          <p className="font-semibold text-black text-md lg:text-xl">
            Loan saving 30%
          </p>
        </div>
        <div className="flex items-center   gap-x-5 text-gray-500">
          <div>
            <FaCheckCircle size={20} />
          </div>
          <p className="font-semibold text-black text-md lg:text-xl">
            Daily income buisness type
          </p>
        </div>
        <div className="flex flex-col text-gray-500 gap-y-5 ">
          <div className="flex items-center gap-x-5">
            <div>
              <FaCheckCircle size={20} />
            </div>
            <p className="font-semibold text-black text-md lg:text-xl">
              Types of loan
            </p>
          </div>
        </div>
        <div className="flex gap-y-5 text-gray-500">
          <div className="flex gap-x-5 items-center">
            <div>
              <FaCheckCircle size={20} />
            </div>
            <p className="font-semibold text-black text-md lg:text-xl">
              Loan saving
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 place-items-center lg:ml-10 lg:place-items-start lg:grid-cols-2  items-center w-full gap-y-4 gap-x-0 lg:gap-x-5 text-gray-500">
          {typeOfLoans.map((loan) => (
            <div className="flex items-center w-52 lg:w-auto" key={loan}>
              <div>
                <GoDotFill />
              </div>
              <p>{loan} loan</p>
            </div>
          ))}
        </div>
        <LoanSavingTable />
      </div>
    </div>
  );
};

export default LoanServices;
