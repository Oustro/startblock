"use client";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

import UpdateApplicantStatus from "./updateApplicantStatus";
import UpdateApplicantScore from "./updateApplicantScore";

import EllipsisDropdown from "@/components/ui/ellipse-dropdown";
import { applicant } from "@/types/startblock";

import ApplicantSlideOut from "./applicantSlideOut";

export default function ApplicantTableRow({ applicant } : {applicant: applicant }) {

  return (
    <ApplicantSlideOut applicant={applicant}>
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
            <p className="text-sm text-our-gray mt-1">Job Board</p>
          </EllipsisDropdown>
        </TableCell>
      </TableRow>
    </ApplicantSlideOut>
  )
}