import React from "react";
import Image from "next/image";
import { IoIosArrowRoundUp } from "react-icons/io";
import car from "@/public/article-images/car.jpg";

const ArticleCardSide = ({ title, image, paragraph, date }) => {
  // const dateval = new Date(date);
  // const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateval);
  return (
    <div className="flex md:flex-row flex-col gap-x-4">
      <div className="flex-1">
        <Image
          src={image}
          width={1600}
          height={1600}
          alt="cardimage"
          className="w-full h-full rounded-lg"
        />
      </div>
      <div className="flex-1 py-4 space-y-4">
        <span className="text-primary w-fit px-10 py-2 rounded-md text-center bg-[#00B6590D]">
          {date}
        </span>
        <div className="flex justify-between items-center gap-x-3">
          <p className="font-bold">{title}</p>
          <IoIosArrowRoundUp className="text-primary rotate-45" size={40} />
        </div>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default ArticleCardSide;
