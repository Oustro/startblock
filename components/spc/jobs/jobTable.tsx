import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function JobTable() {

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
        <TableRow className="hover:bg-transparent border-our-gray">
          <TableCell className="font-medium">Product Engineer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>20</TableCell>
          <TableCell className="flex justify-end">
            <EllipsisDropdown>
              hi
            </EllipsisDropdown>
          </TableCell>
        </TableRow>
        <TableRow className="hover:bg-transparent border-our-gray">
          <TableCell className="font-medium">Product Engineer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>20</TableCell>
          <TableCell className="flex justify-end">
            <EllipsisDropdown>
              hi
            </EllipsisDropdown>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}