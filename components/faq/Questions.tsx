import React from "react";
import Question from "./Question";
import { useTranslations } from "next-intl";
import FadeIn from "../animation/FadeIn";

const Questions = () => {
  const tQuestions = useTranslations("FAQ.Questions");
  const QuestionList = [
    "Question1",
    "Question2",
    "Question3",
    "Question4",
    "Question5",
  ];

  return (
    <div className="flex flex-col w-full">
      {QuestionList.map((key, index) => (
        <FadeIn className="" key={key} delay={index / 7}>
          <Question
            question={tQuestions(`${key}.question`)}
            answer={tQuestions(`${key}.answer`)}
          />
        </FadeIn>
      ))}
    </div>
  );
};

export default Questions;
