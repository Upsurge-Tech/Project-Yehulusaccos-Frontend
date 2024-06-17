import React from "react";
import Question from "./Question";
import { useTranslations } from "next-intl";

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
      {QuestionList.map((key) => (
        <Question
          key={key}
          question={tQuestions(`${key}.question`)}
          answer={tQuestions(`${key}.answer`)}
        />
      ))}
    </div>
  );
};

export default Questions;
