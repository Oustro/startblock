"use client";

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import JobForm from "../forms/jobForm";
import { job, questions } from "@/types/startblock";

import { DialogTitle } from "@radix-ui/react-dialog";

export default function JobDialog({ children, job, additionalQuestions, customQuestions } : { children?: React.ReactNode, job?: job, additionalQuestions?: questions[], customQuestions?: questions[] }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog
    open={openModal}
    onOpenChange={(open) => setOpenModal(open)}
    >
      <DialogTrigger 
      onClick={() => setOpenModal(true)}
      className="bg-black text-white hover:bg-off-black disabled:bg-off-black transition-all p-2 font-heading text-sm"
      >
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-none max-w-5xl h-[50rem] overflow-scroll">
        <DialogTitle className="hidden">Create a new job</DialogTitle>
        <JobForm 
        job={job}
        additionalQuestionsList={additionalQuestions as questions[]}
        customQuestionsList={customQuestions as questions[]}
        closeModal={setOpenModal}
        />
      </DialogContent>
    </Dialog>
  )
}
