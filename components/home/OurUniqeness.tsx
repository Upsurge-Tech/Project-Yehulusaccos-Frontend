import React from "react";
import Image from "next/image";
import { FaCheckCircle, FaStoreAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";

const uniqeness = [
  "Our accessibility for all type and level of businesses.",
  "Outdoor to door services.",
  "Providing loan without any material collaterals.",
  "Daily base cash collection.",
];

const OurUniqeness = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 ">
      <div className="flex flex-col gap-y-10 mt-16">
        <div
          style={{
            backgroundColor: "rgba(0, 182, 89, 0.05)",
          }}
          className="w-48 self-center xl:self-start text-primary flex items-center justify-center text-xs font-semibold tracking-wide  px-2 h-10 rounded-lg"
        >
          OUR UNIQENESS
        </div>
        <h2 className="font-semibold text-2xl lg:text-4xl">
          What makes us different?
        </h2>
        <div className="flex flex-col gap-y-5">
          {uniqeness.map((unique) => (
            <div key={unique} className="flex  gap-x-5  text-gray-500">
              <div>
                <FaCheckCircle size={20} />
              </div>
              <p className=" text-sm">{unique}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[500px] order-1 xl:order-2 relative w-full flex flex-col items-center justify-center rounded-3xl">
        <Image
          src="/plantsWithCents.svg"
          fill
          className="h-full object-cover rounded-xl lg:rounded-3xl"
          alt="2 plants in a jar with cents"
        />
        <div className="hidden xl:block relative rotate-45 top-28  right-[600px]">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={150}
            height={100}
          />
        </div>
        <div className=" absolute -left-16 top-10 h-14 rounded-lg items-center px-4 shadow-xl bg-white flex gap-4">
          <FaKey className="text-primary text-2xl" />
          <p className="font-semibold">Accessible</p>
        </div>
        <div className="absolute bottom-12 -right-20 h-14 rounded-lg items-center px-4 shadow-xl bg-white flex gap-4">
          <FaStoreAlt className="text-primary text-2xl" />
          <p className="font-semibold">No material collateral</p>
        </div>
      </div>
    </div>
  );
};

export default OurUniqeness;
