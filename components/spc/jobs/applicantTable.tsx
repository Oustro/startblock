import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function ApplicantTable() {


  return (
    <Table className="mt-8">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="w-[200px] text-our-gray">Name</TableHead>
          <TableHead className="text-our-gray w-[150px]">Email</TableHead>
          <TableHead className="text-our-gray">Applicants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      </TableBody>
    </Table>
  )
}