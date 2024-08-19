"use client";

import { useState } from "react";

import { questions } from "@/types/startblock";

import Input from "@/components/ui/input-field";
import TextArea from "@/components/ui/textarea-field";
import ActionWord from "@/components/ui/action-word";
import ActionButton from "@/components/ui/action-button";
import CheckBox from "@/components/ui/input-checkbox";

import FileInput from "../answers/file";
import YesNoDropdown from "../answers/yn";
import SchoolDropdown from "../answers/sd";
import HearDropdown from "../answers/hdyh";

export default function ApplyForm({ className, questions } : { className?: string, questions: questions[] }) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sd, setSD] = useState<string>("");
  const [hdyh, setHDYH] = useState<string>("");


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Process formData as needed
  };

  return (
    <form
    onSubmit={handleSubmit}
    className={className}
    >
      <h1 className="mt-6 font-heading">Full name</h1>
      <Input 
      type="text" 
      placeholder="Enter your answer..."
      name="question-0-r" 
      onChange={(e) => setName(e.target.value)}
      required
      className="mt-3"
      />
      <h1 className="mt-6 font-heading">Email</h1>
      <Input 
      type="email" 
      placeholder="Enter your answer..." 
      name="question-1-r"
      onChange={(e) => setEmail(e.target.value)}
      required
      className="mt-3"
      />
      {questions?.map((question) => (
        <div key={question.question}>
          <h1 className="mt-6 font-heading">{question.question}</h1>
          {question.type === "SA" ? (
            <Input 
            type="text" 
            placeholder="Enter your answer..." 
            name="question-1-r"
            required
            className="mt-3"
            />
          ) : question.type === "LA" ? (
            <TextArea
            placeholder="Enter your answer..."
            name="question-1-r"
            required
            className="mt-3"
            />
          ) : question.type === "YN" ? (
            <YesNoDropdown 
            className="mt-3"
            required
            />
          ) : question.type === "SD" ? (
            <SchoolDropdown 
            className="mt-3"
            chooseSchool={setSD}
            required
            />
          ) : question.type === "HDYH" ? (
            <HearDropdown 
            className="mt-3"
            required
            />
          ) : (
            <FileInput 
            className="mt-3"
            required
            />
          )}
        </div>
      ))}
      <button
      type="submit"
      >
        Submit
      </button>
    </form>
  )
}