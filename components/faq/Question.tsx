import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface Props {
  question: string;
  answer: string;
  questionNumber: number;
  openQuestionNumber: number;
  onOpenQuestion: (qNumber: number | null) => void;
}

const Question = ({
  question,
  answer,
  questionNumber,
  openQuestionNumber,
  onOpenQuestion,
}: Props) => {
  const isOpen = questionNumber === openQuestionNumber;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() =>
        isOpen ? onOpenQuestion(null) : onOpenQuestion(questionNumber)
      }
      className="self-start flex py-5 lg:py-10 flex-col gap-y-5 border-b-[2px]  border-stone-200 w-full"
    >
      <CollapsibleTrigger className=" self-start flex w-full text-start justify-between ">
        <p className="mr-2 text-xs md:text-[15px] lg:text-[17px] font-semibold text-gray-700">
          {question}
        </p>
        {isOpen ? (
          <div>
            <FaMinus className="text-primary md:text-xl" />
          </div>
        ) : (
          <div>
            <FaPlus className="text-primary md:text-xl" />
          </div>
        )}
      </CollapsibleTrigger>
      <p
        className={`${!isOpen && " hidden "} text-gray-500 text-[11px] md:text-sm xl:text-[15px]`}
      >
        {answer}
      </p>
    </Collapsible>
  );
};

export default Question;
