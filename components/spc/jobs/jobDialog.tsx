"use client";

import { useState } from "react"

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import JobForm from "../forms/jobForm";
import { job, questions } from "@/types/startblock";

import { DialogTitle } from "@radix-ui/react-dialog";

export default function JobDialog({ children, job, additionalQuestions, customQuestions, className } : { children?: React.ReactNode, job?: job, additionalQuestions?: questions[], customQuestions?: questions[], className?: string }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog
    open={openModal}
    onOpenChange={(open) => setOpenModal(open)}
    >
      <DialogTrigger 
      onClick={() => setOpenModal(true)}
      className={cn("bg-black text-white hover:bg-off-black disabled:bg-off-black transition-all p-2 font-heading text-sm", className)}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="rounded-none w-full sm:max-w-5xl h-full sm:h-[50rem] overflow-scroll">
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
