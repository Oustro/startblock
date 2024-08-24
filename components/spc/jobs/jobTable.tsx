import EllipsisDropdown from "@/components/ui/ellipse-dropdown";
import UpdateJobStatus from "./UpdateJobStatus";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { getTeamForUser } from "@/lib/team";

import { ExternalLink } from "lucide-react";

import Link from "next/link";

export default async function JobTable() {

  const team = await getTeamForUser();

  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="w-[300px] text-our-gray">Job Title</TableHead>
          <TableHead className="text-our-gray w-[150px]">Status</TableHead>
          <TableHead className="text-our-gray">Applicants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {team?.jobs.length === 0 ? (
          <TableRow className="hover:bg-white border-our-gray hover:bg-transparent">
            <TableCell colSpan={3} className="text-center">No jobs found.</TableCell>
          </TableRow>
        ) : ( team?.jobs.map((job) => (
          <Link
          key={job.id}
          href={`/dashboard/${job.id}`}
          legacyBehavior
          className="hover:cursor-pointer"
          >
            <TableRow className="hover:bg-white border-our-gray hover:cursor-pointer">
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>{job.applicant}</TableCell>
              <TableCell className="text-right">
                <EllipsisDropdown>
                  <UpdateJobStatus jobId={job.id} currStatus={job.status} />
                  <Link
                  href={`/jobs/${team.id}/${job.id}`}
                  >
                    <DropdownMenuItem className="flex gap-2 items-center">
                      <ExternalLink className="w-4 h-4"/>
                      View Job
                    </DropdownMenuItem>
                  </Link>
                </EllipsisDropdown>
              </TableCell>
            </TableRow>
          </Link>
        )))}
      </TableBody>
    </Table>
  )
}