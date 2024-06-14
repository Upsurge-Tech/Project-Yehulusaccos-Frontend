import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import ScaleToRight from "../animation/ScaleToRight";

const LinedLi = ({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) => {
  return (
    <li className="flex w-full relative">
      <div className="absolute w-full right-0 h-0.5 bg-primary/10 lg:top-5 top-3 left-4"></div>
      <ScaleToRight className="absolute w-full right-0 h-0.5  lg:top-5 top-3 left-4">
        <div className="w-full h-full bg-primary/50"></div>
      </ScaleToRight>
      {children}
    </li>
  );
};

const HorizontalStepper = () => {
  const tHorStepper = useTranslations("Services.HorizontalStepper");
  const steps = ["Step1", "Step2", "Step3", "Step4", "Step5", "Step6"];

  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-y-10 items-center w-full text-xs text-gray-900 font-medium sm:text-base">
      {steps.map((step, index) => (
        <LinedLi index={index}>
          <div className="flex flex-col w-full  whitespace-nowrap z-10">
            <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
              {tHorStepper(`${steps[index]}.id`)}
            </span>{" "}
            <p className="text-center text-[12px]">
              {tHorStepper(`${steps[index]}.step`)}
            </p>
          </div>
        </LinedLi>
      ))}
    </ol>
  );
};

export default HorizontalStepper;
