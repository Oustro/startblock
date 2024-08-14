"use client";

import { useState } from "react"

import Input from "@/components/ui/input-field";
import TextArea from "@/components/ui/textarea-field";
import ActionWord from "@/components/ui/action-word";

export default function CreateJobForm({ closeModal } : { closeModal: Function }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobRequirements, setJobRequirements] = useState("")
  const [jobLocation, setJobLocation] = useState("")

  return (
    <div className="flex justify-between gap-4">
      <div className="w-full p-4">
        <form>
          <h1 className="text-3xl font-heading">Create a new job</h1>
          <p className="mt-4 text-our-gray">All fields are required</p>
          <h3 className="mt-8 font-heading">Title</h3>
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
          <h3 className="mt-8 font-heading">Location</h3>
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
          <div className="flex justify-between mt-8">
            <ActionWord 
            onClick={() => closeModal(false)}
            type="button"
            >
              Cancel
            </ActionWord>
            <ActionWord 
            onClick={() => setStep(2)}
            className="bg-black text-white hover:bg-off-black transition-all p-2 font-heading text-sm"
            >
              Continue
            </ActionWord>
          </div>
        </form>
      </div>
      <div className="w-full py-4 px-8 border-l border-our-gray h-[750px] sticky top-0">
        <h1 className={`text-3xl font-heading ${!jobTitle && "text-our-gray" }`}>{jobTitle || "Job Title"}</h1>
        <p className="whitespace-pre-wrap">{jobDescription}</p>
      </div>
    </div>
  )
}
