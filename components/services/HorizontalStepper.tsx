import { useTranslations } from "next-intl";
import StepsLi from "./StepsLi";

const HorizontalStepper = () => {
  const tHorStepper = useTranslations("Services.HorizontalStepper");
  const steps = ["Step1", "Step2", "Step3", "Step4", "Step5", "Step6"];

  return (
    <ol className="grid overflow-hidden lg:overflow-visible grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-y-10 items-center w-full text-xs text-gray-900 font-medium sm:text-base">
      {steps.map((step, index) => (
        <StepsLi index={index} key={index}>
          <div className="flex flex-col w-full  whitespace-nowrap z-10">
            <span className="font-bold text-xl text-black  bg-white border-primary border-2  rounded-full flex justify-center items-center mx-auto mb-3  w-12 h-12">
              {tHorStepper(`${steps[index]}.id`)}
            </span>{" "}
            <p className="text-center text-[9.5px] sm:text-[12px]">
              {tHorStepper(`${steps[index]}.step`)}
            </p>
          </div>
        </StepsLi>
      ))}
    </ol>
  );
};

export default HorizontalStepper;
