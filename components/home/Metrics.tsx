import React from "react";
import Image from "next/image";

import { FaPeopleGroup, FaUsersRays } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { LiaCoinsSolid } from "react-icons/lia";

import { useTranslations } from "next-intl";
import curlyarrow from '@/public/curlyarrow.svg'

const Metrics = () => {

  const tMetrics = useTranslations("Home.Metrices");

  return (
    <div className="flex flex-col w-full items-center">
      <div className="bg-primarySoft w-48 mb-10 self-center text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg">
        {tMetrics("Header")}
      </div>
      <h2 className="font-semibold text-2xl lg:text-4xl">{tMetrics('Title')}</h2>
      <div className="hidden lg:flex relative  -rotate-45  lg:-top-2 left-32 ">
        <Image
          src={curlyarrow}
          alt="curly green arrow"
          width={80}
          height={100}
        />
      </div>
      <div className="w-full grid place-items-center grid-cols-1  sm:grid-cols-2 lg:flex lg:justify-between gap-y-5 ">
        <div className="flex flex-col w-full items-center gap-y-5">
          <div
            className="rounded-xl h-16 w-16 flex flex-col items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 182, 89, 0.05)",
            }}
          >
            <FaPeopleGroup size={50} className="text-primary text-2xl" />
          </div>
          <p className="text-xl font-semibold">3600+</p>
          <p>{tMetrics('Members')}</p>
        </div>
        <div className="flex flex-col gap-y-5 w-full items-center">
          <div
            className="rounded-xl h-16 w-16 flex flex-col items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 182, 89, 0.05)",
            }}
          >
            <FaUsersRays size={50} className="text-primary text-2xl" />
          </div>
          <p className="text-xl font-semibold">86+</p>
          <p>{tMetrics('Employees')}</p>
        </div>
        <div className="flex flex-col gap-y-5 w-full items-center">
          <div
            className="rounded-xl h-16 w-16 flex flex-col items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 182, 89, 0.05)",
            }}
          >
            <GiMoneyStack size={50} className="text-primary text-2xl" />
          </div>
          <p className="text-xl font-semibold">400M+</p>
          <p>{tMetrics('Customers')}</p>
        </div>
        <div className="flex flex-col gap-y-5 w-full items-center">
          <div
            className="rounded-xl h-16 w-16 flex flex-col items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 182, 89, 0.05)",
            }}
          >
            <LiaCoinsSolid size={50} className="text-primary text-2xl" />
          </div>
          <p className="text-xl font-semibold">490B+</p>
          <p>{tMetrics('Finance')}</p>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
