"use client";

import { useState } from "react"

import Input from "@/components/ui/input-field";
import TextArea from "@/components/ui/textarea-field";
import ActionWord from "@/components/ui/action-word";
import ActionButton from "@/components/ui/action-button";

import { Reorder } from "framer-motion"

import { GripVertical } from 'lucide-react';
import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function CreateJobForm({ closeModal } : { closeModal: Function }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobRequirements, setJobRequirements] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobPay, setJobPay] = useState("")

  const [questions, setQuestions] = useState<string[]>([])
  const [question, setQuestion] = useState("")

  function handleAddQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setQuestions([...questions, question])
    return setQuestion("")
  }

  async function handleSubmit() {
    setLoading(true)
    // await createJob()
    setLoading(false)
    return closeModal()
  }

  return (
    <div className="flex justify-between gap-0">
      <div className="w-full h-[46rem] overflow-scroll">
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
            className="mt-3"
            />
            <div className="flex justify-between mt-8 fixed bottom-8 w-[46%]">
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
            <h3 className="mt-6 font-heading">Full name</h3>
            <h3 className="mt-6 font-heading">Email</h3>
            <h3 className="mt-6 font-heading">Resume</h3>
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
                >
                  Add
                </ActionButton>
              </div>
            </form>

            <Reorder.Group 
            axis="y" 
            values={questions} 
            onReorder={setQuestions} 
            className="flex flex-col gap-4 mt-4 mb-10"
            >
              {questions.map((question, index) => (
                <Reorder.Item 
                key={question + index} 
                value={question} 
                className="flex justify-between"
                >
                  <div className="flex flex-grow gap-2 items-center pr-4 cursor-grab">
                    <GripVertical size={12} />
                    <p className="font-normal">{question}</p>
                  </div>
                  <EllipsisDropdown>
                    <DropdownMenuItem
                    onClick={() => setQuestions(questions.filter((_, i) => i !== index))}
                    >
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
            <p className="text-our-gray">Preview job posting.</p>
            <h1 className={`text-3xl mt-6 font-heading ${!jobTitle && "text-our-gray" }`}>{jobTitle || "Job title"}</h1>
            <h3 className={`text-lg mt-4 font-heading ${!jobLocation && "text-our-gray" }`}>{jobLocation || "Location"}</h3>
            <h3 className={`text-lg mt-4 font-heading ${!jobPay && "text-our-gray" }`}>{jobPay ? "$"+jobPay : "Salary"}</h3>
            <h3 className="mt-8 font-heading">Description</h3>
            <p className={`mt-2 whitespace-pre-wrap ${!jobDescription && "text-our-gray" }`}>{jobDescription || "Job description"}</p>
            <h3 className="mt-8 font-heading">Requirements</h3>
            <p className={`mt-2 whitespace-pre-wrap ${!jobRequirements && "text-our-gray" }`}>{jobRequirements || "Job requirements"}</p>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-our-gray">Preview job application.</p>
            <h3 className="font-heading mt-6">Full name</h3>
            <Input 
            type="text" 
            placeholder="Enter your full name..." 
            name="app name" 
            disabled={true}
            className="mt-3"
            />
            <h3 className="font-heading mt-6">Email</h3>
            <Input 
            type="text" 
            placeholder="Enter your email..." 
            name="app email" 
            disabled={true}
            className="mt-3"
            />
            <h3 className="font-heading mt-6">Resume</h3>
            <Input 
            type="file" 
            placeholder="Enter your email..." 
            name="app email" 
            disabled={true}
            className="mt-3"
            />
            {questions.map((question, index) => (
              <div key={question} className="mt-6">
                <h3 className="font-heading">{question}</h3>
                <Input 
                type="text" 
                placeholder="Enter your answer..." 
                name={`question-${index}`} 
                disabled={true}
                className="mt-3"
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
