// src/InfoBoard.js
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const InfoBoard = () => {
  return (
    <div className="md:absolute top-0 right-40 border flex justify-between gap-x-5 p-4 md:rounded-xl md:shadow-lg bg-white max-w-sm mx-auto">
      <div className="flex items-start py-4">
        <FaLocationDot className="text-primary animate-bounce" size={25} />
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-green-600">Main Office</h2>
          <p className="text-sm text-gray-700">
            Hawassa Nib Bank Bldg 5th floor
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-green-600 ">
            Branch Offices
          </h2>
          <p className="text-sm text-gray-700">
            Atote Yoseph Building 1st floor
          </p>
          <p className="text-sm text-gray-700">Tirufat Admas Mall 4th floor</p>
          <p className="text-sm text-gray-700">
            Arab Sefer Midregenet Building 1st floor
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBoard;
