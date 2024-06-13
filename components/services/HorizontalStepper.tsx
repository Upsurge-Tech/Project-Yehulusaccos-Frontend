import React from "react";

interface Props {
  steps: { id: number; step: string }[];
}

const HorizontalStepper = ({ steps }: Props) => {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-y-10 items-center w-full text-xs text-gray-900 font-medium sm:text-base">
      <li className="flex w-full relative  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex  flex-col w-full  whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[0].id}
          </span>{" "}
          <p className="self-center ml-12 w-52 text-[12px]">{steps[0].step}</p>
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex flex-col w-full  whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[1].id}
          </span>{" "}
          <p className="self-center text-wrap md:text-nowrap text-center  md:mr-0 w-52 text-[12px]">
            {steps[1].step}
          </p>
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex flex-col w-full whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[2].id}
          </span>{" "}
          <p className="text-center self-center text-wrap md:text-nowrap  md:mr-24 xl:mr-24 lg:mr-0 w-52 text-[12px]">
            {steps[2].step}
          </p>
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex flex-col w-full  whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[3].id}
          </span>{" "}
          <p className="w-52  text-wrap text-center self-center text-[12px]">
            {steps[3].step}
          </p>
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex flex-col w-full  whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[4].id}
          </span>{" "}
          <p className="self-center text-wrap text-center  w-52 text-[12px]">
            {steps[4].step}
          </p>
        </div>
      </li>
      <li className="flex w-full relative text-gray-900  after:content-['']  after:w-full after:h-0.5  after:bg-primary/10 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4">
        <div className="flex flex-col w-full  whitespace-nowrap z-10">
          <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
            {steps[5].id}
          </span>{" "}
          <p className="self-center text-wrap md:text-nowrap md:mr-24  text-center  w-52 text-[12px]">
            {steps[5].step}
          </p>
        </div>
      </li>
    </ol>
  );
};

export default HorizontalStepper;
