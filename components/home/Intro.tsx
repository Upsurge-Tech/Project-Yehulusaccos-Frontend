import React from "react";
import Image from "next/image";
import { FaCarSide, FaPeopleGroup } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";

const Intro = () => {
  return (
    <div className=" grid grid-cols-1 xl:grid-cols-2 gap-x-10 xl:gap-x-36 gap-y-10">
      <div className=" order-2 xl:order-1 flex h-full flex-col items-start justify-center py-5 gap-y-14">
        <h2 className="font-semibold text-3xl lg:text-5xl">
          Inclusive development to all & for all!
        </h2>
        <p className=" text-md lg:text-xl text-gray-600 z-10">
          <span className="font-semibold">Yehulu</span> is a financial
          cooperative established in 2015 EC with a mission to provide easy
          access to savings and credit services for all, especially those who
          might not qualify for traditional banking options
        </p>
        <Link href="/contact">
          <Button className="px-6 py-3">Contact Us</Button>
        </Link>
      </div>
      <div className="order-1 xl:order-2 relative h-[500px] w-full flex items-center justify-center rounded-3xl">
        <Image
          src="/_DSC3225-1.jpg"
          fill
          className=" object-cover rounded-xl lg:rounded-3xl"
          alt="7 persons standing & 1 person sitting for a photoshoot"
        />
        <div className="hidden xl:block relative right-96 top-[160px]  xl:right-[500px]  xl:top-28 ">
          <Image
            src="/curlyarrow.svg"
            alt="curly green arrow"
            width={150}
            height={100}
          />
        </div>
        <div className=" absolute -left-16 xl:-left-24 top-10 h-14 rounded-lg items-center px-4 shadow-xl bg-white flex gap-4">
          <FaCarSide className="text-primary text-2xl" />
          <p className="font-semibold">Small business</p>
        </div>
        <div className=" absolute -bottom-7  h-14 rounded-lg items-center px-4 shadow-xl bg-white flex gap-4">
          <IoHome className="text-primary text-2xl" />
          <p className="font-semibold">Individuals</p>
        </div>
        <div className=" absolute right-10 bottom-24 xl:bottom-auto xl:-right-10 shadow-xl rounded-full flex items-center justify-center bg-white h-16 w-16">
          <FaPeopleGroup className="text-primary text-2xl" />
          <div className="absolute bottom-8 left-10 bg-primary w-32 h-10 flex justify-center items-center px-3 text-center rounded-full text-white">
            <p className="text-sm">Small business thrive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
