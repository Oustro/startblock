
import { getTeamMembers, getTeamForUser } from "@/lib/team"

import { auth } from "@/utils/auth";

import MemberList from "./memberList";

export default async function TeamMembers({ teamId } : { teamId: string }) {
  const members = await getTeamMembers(teamId);
  const team = await getTeamForUser();

  const session = await auth();

  return ( 
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Team Members</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <MemberList 
        teamId={teamId}
        memberList={members} 
        userId={session?.user.id as string} 
        isOwner={team?.type === "owner" ? true : false} 
        />
      </div>  
      <div className="py-6 px-8 bg-white border-r border-l border-b border-our-gray">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
      </div>    
    </>
  )
}