import React from "react";
import Question from "./Question";
import questions from "@/data/questions";

const Questions = () => {
  return (
    <div className="flex flex-col w-full">
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Questions;
