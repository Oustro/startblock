import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getApplicantsForJob } from "@/lib/job";

import { applicant } from "@/types/startblock";
import ApplicantTableRow from "./applicantTableRow";

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
        <ApplicantTableRow key={applicant.id} applicant={applicant} />
      )))}
      </TableBody>
    </Table>
  )
}