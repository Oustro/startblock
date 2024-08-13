import { getTeamForUser } from "@/lib/team";

import ActivateLink from "@/components/ui/activate-link";
import JobTable from "@/components/spc/jobs/jobTable";

export default async function Dashboard() {

  const team = await getTeamForUser();

  if (!team?.activated) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Dashboard</h1>
        <ActivateLink 
        isOwner={team?.type === "owner" ? true : false} 
        imageSrc="/dashboard/dashboard-ex.png"
        teamId={team?.id as string}
        />
      </main>
    )
  }
  else if (team.jobs.length === 0) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Dashboard</h1>
        <p>You have no jobs yet.</p>
      </main>
    )
  }
  else {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Dashboard</h1>
        <JobTable />
      </main>
    )
  }
}