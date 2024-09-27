"use client";

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Play } from "lucide-react";


export default function Video() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog
    open={openModal}
    onOpenChange={(open) => setOpenModal(open)}
    >
      <DialogTrigger 
      onClick={() => setOpenModal(true)}
      className="group w-80 mt-8 h-44 border border-our-gray flex items-center justify-center bg-[url('/SBD.svg')]"
      >
        <Play size={20} className="group-hover:fill-black transition-colors" />
      </DialogTrigger>
      <DialogContent className="rounded-none w-full sm:max-w-3xl p-0 h-64 sm:h-[30rem] bg-our-gray">
        <iframe src="https://www.youtube.com/embed/HZZeA0qwdjg?si=vSKmmDu7wXN56-7s" 
        title="YouTube video player" 
        className="w-full h-full"
        allow="autoPlay;" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        >
        </iframe>
      </DialogContent>
    </Dialog>
  )
}
