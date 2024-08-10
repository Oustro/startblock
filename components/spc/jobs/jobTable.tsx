import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Ellipsis } from 'lucide-react';

export default function JobTable() {

  return (
    <Table className="mt-8 px-12">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="hidden w-[100px] sm:table-cell w-[80px]">
            <span className="sr-only">Edit Button</span>
          </TableHead>
          <TableHead className="w-[200px] text-our-gray">Job Title</TableHead>
          <TableHead className="text-our-gray w-[150px]">Status</TableHead>
          <TableHead className="text-our-gray">Applicants</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="hover:bg-transparent border-our-gray">
          <TableCell className="font-medium px-0"><Ellipsis /></TableCell>
          <TableCell className="font-medium">Product Engineer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="text-right px-0">View Applicants &rarr;</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}