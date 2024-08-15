"use client";

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import CreateJobForm from "../forms/createJobForm"
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CreateJob({ children } : { children?: React.ReactNode }) {
  const [openModal, setOpenModal] = useState(false)

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
        <CreateJobForm 
        closeModal={setOpenModal}
        />
      </DialogContent>
    </Dialog>
  )
}
