import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import UpdateApplicantStatus from "./updateApplicantStatus";
import UpdateApplicantScore from "./updateApplicantScore";

import { getApplicantsForJob } from "@/lib/job";

import { applicant } from "@/types/startblock";

export default async function ApplicantTable({ jobId } : { jobId: string }) {

  const applicants = await getApplicantsForJob(jobId) as unknown as applicant[];

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="w-[200px] text-our-gray">Name</TableHead>
          <TableHead className="text-our-gray w-[250px]">Email</TableHead>
          <TableHead className="text-our-gray w-[200px]">Status</TableHead>
          <TableHead className="text-our-gray w-[450px]">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {applicants?.length === 0 ? (
        <TableRow className="hover:bg-white border-our-gray hover:bg-transparent">
          <TableCell colSpan={4} className="text-center">No applicants found.</TableCell>
        </TableRow>
      ) : ( applicants?.map((applicant) => (
        <TableRow key={applicant.id} className="hover:bg-white border-our-gray hover:cursor-pointer">
          <TableCell className="font-medium">{applicant.answers[0].answer}</TableCell>
          <TableCell>{applicant.answers[1].answer}</TableCell>
          <TableCell><UpdateApplicantStatus value={applicant.status} applicationId={applicant.id} /></TableCell>
          <TableCell><UpdateApplicantScore value={applicant.score} applicationId={applicant.id} /></TableCell>
          <TableCell className="text-right">
            <EllipsisDropdown>
              {applicant.id}
            </EllipsisDropdown>
          </TableCell>
        </TableRow>
      )))}
      </TableBody>
    </Table>
  )
}