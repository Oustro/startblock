import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getTeamForUser } from "@/lib/team";

export default async function JobTable() {

  const team = await getTeamForUser();

  return (
    <Table className="mt-8 px-12">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="w-[200px] text-our-gray">Job Title</TableHead>
          <TableHead className="text-our-gray w-[150px]">Status</TableHead>
          <TableHead className="text-our-gray">Applicants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {team?.jobs.length === 0 ? (
          <TableRow className="hover:bg-white border-our-gray hover:bg-transparent">
            <TableCell colSpan={3} className="text-center">No jobs found.</TableCell>
          </TableRow>
        ) : (
          <TableRow className="hover:bg-white border-our-gray">
          <TableCell className="font-medium">Product Engineer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>20</TableCell>
          <TableCell className="flex justify-end">
            <EllipsisDropdown>
              hi
            </EllipsisDropdown>
          </TableCell>
        </TableRow>
        )}
      </TableBody>
    </Table>
  )
}