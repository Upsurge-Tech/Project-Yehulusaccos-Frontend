import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import PopUpAlt from "../animation/PopUpAlt";

const InfoBoard = () => {
  const tInfoBoard = useTranslations("ContactUs.InfoBox");
  return (
    <PopUpAlt className=" max-w-sm w-full md:absolute top-0 right-40 border flex justify-between gap-x-5 p-4 md:rounded-xl md:shadow-lg bg-white mx-auto">
      <div className="flex items-start py-4">
        <FaLocationDot className="text-primary animate-bounce" size={35} />
      </div>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-green-600">
            {tInfoBoard("Office")}
          </h2>
          <p className="text-sm text-gray-700">
            {tInfoBoard("OfficeParagraph")}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-green-600 ">
            {tInfoBoard("Branches")}
          </h2>
          <p className="text-sm text-gray-700">
            {tInfoBoard("BranchesParagraph")}
          </p>
          <p className="text-sm text-gray-700">{tInfoBoard("Address")}</p>
          <p className="text-sm text-gray-700">{tInfoBoard("Address2")}</p>
        </div>
      </div>
    </PopUpAlt>
  );
};

export default InfoBoard;
