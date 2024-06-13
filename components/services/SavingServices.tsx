import React from "react";

import Image from "next/image";

const savingServices = [
  {
    title: "Regular savings",
    desc: "This type of savings allows the members of the association to increase their saving habit by saving at least 10 Birr every day and it is the duty of all members to save accordingly.",
    image: "/threecircles.svg",
  },
  {
    title: "Time deposit",
    desc: "It is a type of savings in which the individual get better interest service by saving time limit deposit up-to 20% of the amount he/she made agreement more than half a year period.",
    image: "/briefcase.svg",
  },
  {
    title: "Home Purchase Savings",
    desc: "It is a type of savings in which the individual saves 30% to become a home owner.",
    image: "/home.svg",
  },
  {
    title: "Vehicle Purchase Savings",
    desc: "The person can save 50% of the vehicle ownership and get the type of vehicle of their choice.",
    image: "/vehicle.svg",
  },
  {
    title: "Demand Savings",
    desc: "This type of savings is a type of savings in which themembers or non-members willingly deposit their money in the cooperative society and can earn or spend their money at any time and qualify for loan services.",
    image: "hand.svg",
  },
  {
    title: "Children's Savings",
    desc: "It is a type of savings that parents save for their children under 18 years of age.",
    image: "children.svg",
  },
  {
    title: "Taxi Savings",
    desc: "This is a type of savings where taxi owners save from their daily income to upgrade their vehicles type.",
    image: "/taxi.svg",
  },
  {
    title: "My Drive Savings",
    desc: "This is a type of savings where taxi owners save from their daily income to upgrade their vehicles type",
    image: "/mydrive.svg",
  },
];

const SavingServices = () => {
  return (
    <div className="flex flex-col w-full gap-y-10 mt-16">
      <div className="flex flex-col  items-center w-full">
        <div className="bg-primarySoft lg:mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          LOAN AND SAVING SERVICES
        </div>
        <h2 className="font-semibold text-center mt-5 text-2xl lg:text-4xl max-w-xl">
          Saving Services
        </h2>
        <div className="hidden lg:flex relative -rotate-45 bottom-10 top-0 left-[130px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={60}
            height={100}
          />
        </div>
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-10 mt-10  gap-y-7 xl:gap-x-36 xl:gap-y-16">
          {savingServices.map((ss) => (
            <div
              key={ss.title}
              className="flex justify-center  items-center lg:items-start gap-5 xl:gap-y-20 w-full "
            >
              <div className=" flex w-3/4 xl:w-full gap-x-4">
                <Image
                  src={ss.image}
                  width={40}
                  height={30}
                  className="self-start"
                  alt="three circles"
                />
                <div className="flex flex-col gap-y-2">
                  <h3 className="text-lg font-semibold">{ss.title}</h3>
                  <p className="text-gray-600 text-sm">{ss.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingServices;
