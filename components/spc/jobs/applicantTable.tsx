import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getApplicantsForJob } from "@/lib/job";

import ApplicantKanban from "./applicantKanban";
import ApplicantTableRow from "./applicantTableRow";

import { applicant } from "@/types/startblock";

export default async function ApplicantTable({ jobId } : { jobId: string }) {

  const applicants = await getApplicantsForJob(jobId) as unknown as applicant[];

  let applied = [] as applicant[];
  let interview = [] as applicant[];
  let hired = [] as applicant[];
  let rejected = [] as applicant[];

  applicants?.forEach((applicant) => {
    if (applicant.status === "Applied") {
      applied.push(applicant);
    } else if (applicant.status === "Interview") {
      interview.push(applicant);
    } else if (applicant.status === "Hired") {
      hired.push(applicant);
    } else if (applicant.status === "Rejected") {
      rejected.push(applicant);
    }
  });

  let view = "board"

  return (
    <>
      {view === "board" ? (
        <ApplicantKanban applicants={applicants.length === 0 ? undefined : [applied, interview, hired, rejected]} />
      ) : (
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
          ) : (applicants?.map((applicant) => (
            <ApplicantTableRow key={applicant.id} applicant={applicant} />
          )))}
          </TableBody>
        </Table>
      )}
    </>
  )
}