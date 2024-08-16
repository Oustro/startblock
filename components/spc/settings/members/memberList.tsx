"use client"

import { memberList } from "@/types/startblock";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table"

import { updateMemberType } from "@/lib/team";

import EllipsisDropdown from "@/components/ui/ellipse-dropdown";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function MemberList({ teamId, memberList, userId, isOwner } : { teamId: string, memberList: memberList[], userId: string, isOwner: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpdateMemberType(memberId: string, type: string) {
    setLoading(true);
    await updateMemberType(teamId, memberId, type);
    setLoading(false);

    return router.refresh();
  }

  return ( 
    <Table className="mt-8">
      <TableHeader>
        <TableRow className="font-heading hover:bg-transparent border-our-gray">
          <TableHead className="w-[300px] text-our-gray">Member</TableHead>
          <TableHead className="text-our-gray">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberList.map((member) => (
          <TableRow 
          key={member.id}
          className="hover:bg-white border-our-gray hover:bg-transparent"
          >
            <TableCell className="flex items-center gap-2">
              <div 
              style={{
                background: member.gradient as string,
              }}
              className="h-8 w-8 rounded-full border border-our-gray" 
              />
              <div>
                <p>{member.name}</p>
                <p className="text-our-gray text-sm">{member.email}</p>
              </div>
            </TableCell> 
            <TableCell>{member.type}</TableCell>
            <TableCell className="text-right">
            {member.id === userId  ? (
              <p className="text-our-gray text-sm">me</p>
            ) : isOwner ? (
              <EllipsisDropdown>
                <DropdownMenuItem
                disabled={member.type === "Owner" || loading}
                onClick={() => handleUpdateMemberType(member.id as string, "Owner")}
                >
                  Team Owner
                </DropdownMenuItem>
                <DropdownMenuItem
                disabled={member.type === "Member" || loading}
                onClick={() => handleUpdateMemberType(member.id as string, "Member")}
                >
                  Member
                </DropdownMenuItem>
              </EllipsisDropdown>
            ) : (
              <>
              </>
            )}                        
            </TableCell>      
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}