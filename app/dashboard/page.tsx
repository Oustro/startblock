import { getTeamForUser } from "@/lib/team";

import ActivateLink from "@/components/ui/activate-link";
import JobTable from "@/components/spc/jobs/jobTable";
import JobDialog from "@/components/spc/jobs/jobDialog";

export default async function Dashboard() {

  const team = await getTeamForUser();

  if (!team?.activated) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Hiring Dashboard</h1>
        <ActivateLink 
        isOwner={team?.type === "owner" ? true : false} 
        page="dashboard"
        teamId={team?.id as string}
        />
      </main>
    )
  }
  else {
    return (
      <main className="p-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-special">Hiring Dashboard</h1>
          <JobDialog>Create New Job</JobDialog>
        </div>
        <JobTable />
      </main>
    )
  }
}