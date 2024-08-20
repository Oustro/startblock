"use client";

import { useState } from "react";

import { answers, questions } from "@/types/startblock";

import Input from "@/components/ui/input-field";
import TextArea from "@/components/ui/textarea-field";
import ActionButton from "@/components/ui/action-button";

import FileInput from "../answers/file";
import YesNoDropdown from "../answers/yn";
import SchoolDropdown from "../answers/sd";
import HearDropdown from "../answers/hdyh";

import { applyToJob } from "@/lib/public";
import { cn } from "@/lib/utils"

export default function ApplyForm({ className, questions, jobId } : { className?: string, questions: questions[], jobId: string }) {
  const [appAnswers, setAppAnswers] = useState<answers[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await applyToJob(jobId, appAnswers);

    setAppAnswers([]);
    setLoading(false);
    return setStep(2);
  };

  function answerQuestion(applicantQuestion: string, applicantAnswer: string, index: number) {
    let answers = appAnswers;
    answers[index] = { question: applicantQuestion, answer: applicantAnswer };
    return setAppAnswers(answers);
  }

  return (
    <>
      {step === 1 && (
        <form
        onSubmit={handleSubmit}
        className={cn("mt-8", className)}
        >
          <h1 className="mt-6 font-heading">Full name</h1>
          <Input 
          type="text" 
          placeholder="Enter your answer..."
          name="question-0-r" 
          onChange={(e) => answerQuestion("Full name", e.target.value, 0)}
          disabled={loading}
          required
          className="mt-3"
          />
          <h1 className="mt-6 font-heading">Email</h1>
          <Input 
          type="email" 
          placeholder="Enter your answer..." 
          name="question-1-r"
          onChange={(e) => answerQuestion("Email", e.target.value, 1)}
          disabled={loading}
          required
          className="mt-3"
          />
          {questions?.map((question, index) => (
            <div key={question.question}>
              <h1 className="mt-6 font-heading">{question.question}</h1>
              {question.type === "SA" ? (
                <Input 
                type={question.question === "Linkedin" ? "url" : "text"} 
                placeholder="Enter your answer..." 
                name="question-1-r"
                onChange={(e) => answerQuestion(question.question, e.target.value, (index + 2))}
                disabled={loading}
                required
                className="mt-3"
                />
              ) : question.type === "LA" ? (
                <TextArea
                placeholder="Enter your answer..."
                name="question-1-r"
                onChange={(e) => answerQuestion(question.question, e.target.value, index + 2)}
                disabled={loading}
                required
                className="mt-3"
                />
              ) : question.type === "YN" ? (
                <YesNoDropdown 
                className="mt-3"
                question={question.question}
                index={index + 2}
                answerQuestionFunction={answerQuestion}
                disabled={loading}
                required
                />
              ) : question.type === "SD" ? (
                <SchoolDropdown 
                index={index + 2}
                className="mt-3"
                answerQuestionFunction={answerQuestion}
                disabled={loading}
                required
                />
              ) : question.type === "HDYH" ? (
                <HearDropdown 
                index={index + 2}
                className="mt-3"
                answerQuestionFunction={answerQuestion}
                disabled={loading}
                required
                />
              ) : (
                <FileInput 
                className="mt-3"
                index={index + 2}
                setFile={answerQuestion}
                disabled={loading}
                required
                accept="application/pdf"
                />
              )}
            </div>
          ))}
          <ActionButton
          className="mt-6"
          type="submit"
          disabled={loading}
          >
            Apply
          </ActionButton>
        </form>
      )}

      {step === 2 && (
        <div className={cn("text-center mt-8", className)}>
          <h1 className="mt-6 text-xl font-heading">Thank you for applying!</h1>
          <p className="mt-3 text-lg text-our-gray">We will get back to you soon.</p>
        </div>
      )}
    </>
  )
}