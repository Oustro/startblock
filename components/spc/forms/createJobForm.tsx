"use client";

import { useState } from "react"
import { useRouter } from "next/navigation";

import Input from "@/components/ui/input-field";
import TextArea from "@/components/ui/textarea-field";
import ActionWord from "@/components/ui/action-word";
import ActionButton from "@/components/ui/action-button";
import CheckBox from "@/components/ui/input-checkbox";

import FileInput from "../answers/file";
import YesNoDropdown from "../answers/yn";
import SchoolDropdown from "../answers/sd";
import HearDropdown from "../answers/hdyh";

import { Reorder } from "framer-motion"

import { GripVertical, CircleMinus } from 'lucide-react';
import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { questions } from "@/types/startblock";
import { createJob } from "@/lib/job";

export default function CreateJobForm({ closeModal } : { closeModal: Function }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobRequirements, setJobRequirements] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobPay, setJobPay] = useState("")

  const [additionalQuestions, setAdditionalQuestions] = useState<questions[]>([])
  const [customQuestions, setCustomQuestions] = useState<questions[]>([])
  const [question, setQuestion] = useState("")

  const router = useRouter()

  const requiredQuestions = ["Full name", "Email", "Voluntary self-identification", "Voluntary self-identification of disability"]
  const potentialQuestions= [
    { 
      question: "Resume", 
      type: "F" 
    }, 
    {
      question: "School",
      type: "SD"
    },
    {
      question: "Linkedin",
      type: "SA"
    },
    {
      question: "Will you now or in the future require sponsorship for employment visa status?",
      type: "YN"
    },
    {
      question: "How did you hear about this job?",
      type: "HDYH"
    },
  ]
  const customQuestionTypes = [
    {
      type: "SA",
      name: "Short answer"
    },
    {
      type: "LA",
      name: "Long answer"
    },
    {
      type: "YN",
      name: "Yes or no"
    },
  ]


  function handleAddQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setCustomQuestions([...customQuestions, {
      question: question,
      type: "SA"
    }])

    return setQuestion("")
  }

  async function handleSubmit() {
    setLoading(true)

    try {
      await createJob(
      jobTitle,
      jobLocation,
      jobPay,
      jobDescription,
      jobRequirements,
      additionalQuestions,
      customQuestions,
    )
    } catch (error) {
      return console.error(error)
    }
    closeModal()
    return router.refresh()
  }

  return (
    <div className="flex justify-between gap-0">
      <div className="w-full h-[46rem] overflow-scroll no-scrollbar">
        <h1 className="text-3xl font-heading sticky h-10 bg-white top-0">Create a new job</h1>
        {step === 1 && (
          <form
          onSubmit={() => setStep(2)}
          >
            <p className="mt-2 text-our-gray">All fields are required.</p>
            <h3 className="mt-6 font-heading">Title</h3>
            <Input 
            type="text" 
            placeholder="Enter the job title..." 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            name="title" 
            disabled={loading}
            required 
            className="mt-3"
            />
            <div className="flex justify-between mt-8 gap-4">
              <div className="w-full">
                <h3 className="font-heading">Location</h3>
                <Input 
                type="text" 
                placeholder="Where is the job located..." 
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                name="location" 
                disabled={loading}
                required 
                className="mt-3"
                />
              </div>
              <div className="w-full">
                <h3 className="font-heading">Salary</h3>
                <Input 
                type="text" 
                placeholder="What is the salary..." 
                value={jobPay}
                onChange={(e) => setJobPay(e.target.value)}
                name="location" 
                disabled={loading}
                required 
                className="mt-3"
                />
              </div>
            </div>
            <h3 className="mt-8 font-heading">Description</h3>
            <TextArea 
            name="description"
            placeholder="Tell us about the job..." 
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={loading}
            required 
            className="mt-3"
            />
            <h3 className="mt-8 font-heading">Requirements</h3>
            <TextArea
            name="requirements"
            placeholder="Tell us what you are looking for..." 
            value={jobRequirements}
            onChange={(e) => setJobRequirements(e.target.value)}
            disabled={loading}
            required 
            className="mt-3 mb-10"
            />
            <div className="flex justify-between mt-8 bg-white fixed bottom-8 w-[46%]">
              <ActionWord 
              onClick={() => closeModal(false)}
              type="button"
              disabled={loading}
              >
                Cancel
              </ActionWord>
              <ActionButton
              className="w-20"
              type="submit"
              disabled={loading}
              >
                Continue
              </ActionButton>
            </div>
          </form>
        )}

        {step === 2 && (
          <div>
            <p className="mt-2 text-our-gray">Add additional questions.</p>
            {requiredQuestions.map((question) => (
              <CheckBox
              key={question}
              disabled={true}
              onCheckChanged={() => {}}
              checked={true}
              className="mt-6"
              >
                {question}
              </CheckBox>
            ))}
            {potentialQuestions.map((question, index) => (
              <CheckBox
              key={question.question}
              checked={additionalQuestions.some((q) => q.question === question.question)}
              disabled={loading}
              onCheckChanged={(checked) => {
                if (checked) {
                  setAdditionalQuestions([...additionalQuestions.slice(0, index), question, ...additionalQuestions.slice(index)]);
                } else {
                  setAdditionalQuestions(additionalQuestions.filter((q) => q.question !== question.question));
                }
              }}
              className="mt-6"
              >
                {question.question}
              </CheckBox>
            ))}
            <form 
            className="border-t mt-6 pt-6 border-our-gray"
            onSubmit={handleAddQuestion}
            >
              <h3 className="font-heading">Additional Questions</h3>
              <div className="flex justify-between gap-4 mt-3">
                <Input 
                type="text" 
                placeholder="What other questions do you have for applicants..." 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                name="location" 
                disabled={loading}
                required 
                className="w-[800%]"
                />
                <ActionButton
                type="submit"
                disabled={loading}
                >
                  Add
                </ActionButton>
              </div>
            </form>

            <Reorder.Group 
            axis="y" 
            values={customQuestions} 
            onReorder={setCustomQuestions} 
            className="flex flex-col gap-4 mt-4 mb-10"
            >
              {customQuestions.map((question, index) => (
                <Reorder.Item 
                key={question.question} 
                value={question} 
                className="flex justify-between"
                >
                  <div className="flex flex-grow gap-2 items-center pr-4 cursor-grab">
                    <GripVertical size={12} />
                    <p className="font-normal">{question.question}</p>
                  </div>
                  <EllipsisDropdown>
                    {customQuestionTypes.map((type) => (
                      <DropdownMenuItem
                      key={type.type}
                      disabled={question.type === type.type || loading}
                      onClick={() => setCustomQuestions(customQuestions.map((q, i) => i === index ? { ...q, type: type.type } : q))}
                      >
                        {type.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem
                    className="gap-2"
                    disabled={loading}
                    onClick={() => setCustomQuestions(customQuestions.filter((_, i) => i !== index))}
                    >
                      <CircleMinus 
                      size={16} 
                      />
                      Remove
                    </DropdownMenuItem>
                  </EllipsisDropdown>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div className="flex justify-between bg-white fixed bottom-8 w-[46%]">
              <ActionWord 
              onClick={() => setStep(1)}
              type="button"
              disabled={loading}
              >
                Back
              </ActionWord>
              <ActionButton
              className="w-20"
              onClick={handleSubmit}
              disabled={loading}
              >
                Continue
              </ActionButton>
            </div>
          </div>  
        )}
      </div>

      <div className="h-full my-auto border-l border-our-gray mx-4" />
      
      <div className="w-full overflow-scroll h-[46rem]">

        {step === 1 && (
          <>
            <p className="w-full bg-slate-100 p-4 border border-our-gray text-center font-special text-our-gray">This is a preview of the job post.</p>
            <h1 className={`text-3xl mt-6 font-heading ${!jobTitle && "text-our-gray" }`}>{jobTitle || "Job title"}</h1>
            <h3 className={`text-lg mt-4 font-heading ${!jobLocation && "text-our-gray" }`}>{jobLocation || "Location"}</h3>
            <h3 className={`text-lg mt-4 font-heading ${!jobPay && "text-our-gray" }`}>{jobPay ? "$"+jobPay : "Salary"}</h3>
            <h3 className="mt-8 font-heading text-lg">Description</h3>
            <p className={`mt-2 whitespace-pre-wrap ${!jobDescription && "text-our-gray" }`}>{jobDescription || "Job description"}</p>
            <h3 className="mt-8 font-heading text-lg">Requirements</h3>
            <p className={`mt-2 whitespace-pre-wrap ${!jobRequirements && "text-our-gray" }`}>{jobRequirements || "Job requirements"}</p>
          </>
        )}

        {step === 2 && (
          <>
            <p className="w-full bg-slate-100 p-4 border border-our-gray text-center font-special text-our-gray">This is a preview of the job application.</p>
            <h1 className="mt-6 font-heading">Full name</h1>
            <Input 
            type="text" 
            placeholder="Enter your answer..."
            name="question-0-r" 
            disabled={true}
            className="mt-3"
            />
            <h1 className="mt-6 font-heading">Email</h1>
            <Input 
            type="text" 
            placeholder="Enter your answer..." 
            name="question-1-r"
            disabled={true}
            className="mt-3"
            />

            {additionalQuestions.map((question, index) => (
              <div key={question.question} className="mt-6">
                <h3 className="font-heading">{question.question}</h3>
                {question.type === "SA" ? (
                  <Input 
                  type="text" 
                  placeholder="Enter your answer..." 
                  name={`question-${index}`} 
                  disabled={true}
                  className="mt-3"
                  />
                ) : question.type === "F" ? (
                  <FileInput
                  disabled={true}
                  className="mt-3"
                  />
                ) : question.type === "YN" ? (
                  <YesNoDropdown 
                  disabled={true}
                  className="mt-3"
                  />
                ) : question.type === "SD" ? (
                  <SchoolDropdown
                  disabled={true}
                  className="mt-3"
                  />
                ) : question.type === "HDYH" ? (
                  <HearDropdown
                  disabled={false}
                  className="mt-3"
                  />
                ) : (
                  <TextArea 
                  placeholder="Enter your answer..." 
                  name={`question-${index}`} 
                  disabled={true}
                  className="mt-3"
                  />
                )}
              </div>
            ))}

            {customQuestions.map((question, index) => (
              <div key={question.question} className="mt-6">
                <h3 className="font-heading">{question.question}</h3>
                {question.type === "SA" ? (
                  <Input 
                  type="text" 
                  placeholder="Enter your answer..." 
                  name={`question-${index}`} 
                  disabled={true}
                  className="mt-3"
                  />
                ) : question.type === "YN" ? (
                  <YesNoDropdown 
                  disabled={true}
                  className="mt-3"
                  />
                ) : (
                  <TextArea 
                  placeholder="Enter your answer..." 
                  name={`question-${index}`} 
                  disabled={true}
                  className="mt-3"
                  />
                )}
              </div>
            ))}
            <h1 className="mt-6 font-heading">Voluntary self-indentification</h1>
            <p>...</p>
            <h1 className="mt-6 font-heading">Voluntary self-indentification of disability</h1>
            <p>...</p>
          </>
        )}
      </div>
    </div>
  )
}
