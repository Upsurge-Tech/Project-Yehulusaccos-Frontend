import { useTranslations } from "next-intl";
import { IconType } from "react-icons";
import { FaThumbsUp } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { IoDocumentText } from "react-icons/io5";
import FadeIn from "../animation/FadeIn";

const StepperRow = ({
  Icon,
  text,
  number,
}: {
  Icon: IconType;
  text: string;
  number: number;
}) => {
  const isRight = number % 2 === 0;
  return (
    <li
      className={`relative min-h-[150px] z-10 flex gap-2 items-center ${isRight ? "flex-row-reverse" : ""}`}
    >
      <div className="flex-1">
        <FadeIn
          delay={1.3}
          className=" flex flex-col gap-2 justify-center items-center max-w-[500px] "
        >
          <Icon
            size={35}
            className="flex-1 text-primary font-medium leading-tight"
          />
          <p className="text-xs lg:text-sm text-center">{text}</p>
        </FadeIn>
      </div>

      <span
        className={`
      flex items-center justify-center w-12 h-12  rounded-full
      bg-white border-2 border-primary -start-6 ring-4 ring-white 
        `}
      >
        {number}
      </span>
      <div className="flex-1 "></div>
    </li>
  );
};

const Stepper = () => {
  const tStepper = useTranslations("Loan.Stepper");

  return (
    <ol className="w-full mt-10 relative ">
      <div className="absolute w-[1px] h-[80%] top-1/2 left-1/2 bg-gray-300 translate-x-[-50%] translate-y-[-50%]"></div>
      <StepperRow Icon={IoDocumentText} text={tStepper("Step1")} number={1} />
      <StepperRow Icon={ImLocation2} text={tStepper("Step2")} number={2} />
      <StepperRow Icon={FaThumbsUp} text={tStepper("Step3")} number={3} />
      <StepperRow
        Icon={FaMoneyBillTransfer}
        text={tStepper("Step4")}
        number={4}
      />
    </ol>
  );
};

export default Stepper;
