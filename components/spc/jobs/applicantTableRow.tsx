"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { Drawer } from "vaul";

import UpdateApplicantStatus from "./updateApplicantStatus";
import UpdateApplicantScore from "./updateApplicantScore";

import EllipsisDropdown from "@/components/ui/ellipse-dropdown";
import { applicant } from "@/types/startblock";

import Link from "next/link";

import { ExternalLink } from "lucide-react";

export default function ApplicantTableRow({ applicant } : {applicant: applicant }) {

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <TableRow key={applicant.id} className="hover:bg-white border-our-gray hover:cursor-pointer">
          <TableCell className="font-medium">{applicant.answers[0].answer}</TableCell>
          <TableCell>{applicant.answers[1].answer}</TableCell>
          <TableCell><UpdateApplicantStatus value={applicant.status} applicationId={applicant.id} /></TableCell>
          <TableCell><UpdateApplicantScore value={applicant.score} applicationId={applicant.id} /></TableCell>
          <TableCell className="text-right">
            <EllipsisDropdown contentClassname="py-3 px-4">
              <p className="text-sm font-heading">Applied</p>
              <p className="text-sm text-our-gray mt-1">{applicant.createdAt.toDateString()}</p>
              <p className="text-sm mt-4 font-heading">Origin</p>
              <p className="text-sm text-our-gray mt-1">startblock.com</p>
            </EllipsisDropdown>
          </TableCell>
        </TableRow>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Drawer.Content className="bg-white flex flex-col z-50 h-full w-[400px] mt-24 fixed bottom-0 right-0 outline-none">
          <div className="p-8 bg-white flex-1 h-full overflow-scroll">
            <div className="max-w-md mx-auto">
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