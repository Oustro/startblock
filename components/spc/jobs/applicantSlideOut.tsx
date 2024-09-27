"use client";

import { Drawer } from "vaul";

import { applicant } from "@/types/startblock";

import Link from "next/link";

import { ExternalLink, X } from "lucide-react";

export default function ApplicantSlideOut({ applicant, children } : {applicant: applicant, children: React.ReactNode }) {

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Drawer.Content className="bg-white flex flex-col z-50 h-full w-full sm:w-[400px] mt-24 fixed bottom-0 right-0 outline-none">
          <div className="p-8 bg-white flex-1 h-full overflow-scroll">
            <div className="max-w-md mx-auto">
              <Drawer.Close className="sm:hidden mb-12">
                <X className="h-6 w-6" />
              </Drawer.Close>
              <Drawer.Title className="text-4xl font-special">
                {applicant.answers[0].answer}
              </Drawer.Title>
              <p className="text-our-gray mt-4 text-lg">{applicant.answers[1].answer}</p>
              {applicant.answers.map((answer) => (
                <div key={answer.question} className="mt-6">
                  <p className="font-heading">{answer.question}</p>
                  {answer.question === "Linkedin" ? (
                    <Link href={answer.answer}>
                      <p className="mt-2 text-our-gray flex items-center gap-2">
                        <ExternalLink className="w-4 h-4"/>
                        {answer.answer}
                      </p>
                    </Link>
                  ) : answer.question === "Resume" ? (
                    <Link href={answer.answer}>
                      <p className="mt-2 text-our-gray flex items-center gap-2">
                        <ExternalLink className="w-4 h-4"/>
                        Resume
                      </p>
                    </Link>
                  ) : (
                    <p className="mt-2 text-our-gray whitespace-pre-wrap">{answer.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}