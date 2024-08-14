"use client";

import { useState } from "react"

import Input from "@/components/ui/input-field"
import ActionWord from "@/components/ui/action-word";

export default function CreateJobForm() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobResponsibilities, setJobResponsibilities] = useState("")
  const [jobRequirements, setJobRequirements] = useState("")

  return (
    <div>
      {step === 1 && (
        <form>
          <h3 className="font-heading">Title</h3>
          <Input
          type="text"
          placeholder="Enter the job title..."
          name="title"
          disabled={loading}
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          className="mt-3"
          />
          <h3 className="font-heading mt-8">Description</h3>
          <textarea
          placeholder="Enter the job description..."
          name="Description"
          disabled={loading}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
          className="mt-3 h-32 px-3 py-2 border bg-transparent text-sm font-normal w-full border-our-gray outline-none"
          />
          <h3 className="font-heading mt-8">Responsibilites</h3>
          <textarea
          placeholder="Enter the job description..."
          name="Responsibilities"
          disabled={loading}
          value={jobResponsibilities}
          onChange={(e) => setJobResponsibilities(e.target.value)}
          required
          className="mt-3 h-32 px-3 py-2 border bg-transparent text-sm font-normal w-full border-our-gray outline-none"
          />

          <h3 className="font-heading mt-8">Requirements</h3>
          <textarea
          placeholder="Enter the job description..."
          name="Requirements"
          disabled={loading}
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
          required
          className="mt-3 h-32 px-3 py-2 border bg-transparent text-sm font-normal w-full border-our-gray outline-none"
          />
          <div className="flex justify-between mt-8">
            <ActionWord>
              Cancel
            </ActionWord>
            <button
            type="submit"
            className="bg-black text-white hover:bg-off-black transition-all p-2 font-heading text-sm"
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
