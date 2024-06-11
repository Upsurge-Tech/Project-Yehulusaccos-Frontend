import React from "react";
import Image from "next/image";

import CustomAvatar from "./CustomAvatar";

const Team = () => {
  return (
    <div className="flex flex-col h-full items-start place-self-center justify-center py-5 gap-y-5 xl:gap-y-14 w-3/4 xl:w-full">
      <div className="flex flex-col xl:self-center">
        <div className="bg-primarySoft lg:mb-10 self-start xl:self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
          TEAM
        </div>
        <h2 className="font-semibold text-3xl lg:text-5xl mt-2 lg:mt-0">
          Meet the team
        </h2>
        <div className="hidden lg:flex relative -rotate-45 -top-20 left-[250px] ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={80}
            height={100}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:flex gap-5 2xl:gap-x-16 flex-wrap place-items-center xl:justify-center">
        <CustomAvatar
          name="Mesafint Debebe"
          role="Board chair person"
          src="/assets/MesafinitDebebe.jpg"
        />
        <CustomAvatar
          name="Workineh Jima"
          role="General Operation Manager"
          src="/assets/WorkinehJima.jpg"
        />
        <CustomAvatar
          src={"/assets/YegetanehAssefa.jpg"}
          name={"Yegetaneh Assefa "}
          role={"Loan Dep't Head"}
        />
        <CustomAvatar
          src={"/assets/AnbesaEgata.jpg"}
          name={"Anbesa Egata"}
          role={"Media Dep't Head"}
        />
        <CustomAvatar
          src={"/assets/WendifrawAyenew.jpg"}
          name={"Wendifraw Ayenew"}
          role={"Finance Dep't Head"}
        />
      </div>
    </div>
  );
};

export default Team;
