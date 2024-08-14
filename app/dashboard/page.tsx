import { getTeamForUser } from "@/lib/team";

import ActivateLink from "@/components/ui/activate-link";
import JobTable from "@/components/spc/jobs/jobTable";
import CreateJob from "@/components/spc/jobs/createJob";

import Image from "next/image";

export default async function Dashboard() {

  const team = await getTeamForUser();

  if (!team?.activated) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Hiring Dashboard</h1>
        <ActivateLink 
        isOwner={team?.type === "owner" ? true : false} 
        imageSrc="/dashboard/dashboard-ex.png"
        teamId={team?.id as string}
        />
      </main>
    )
  }
  else if (team?.jobs.length === 0) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Hiring Dashboard</h1>
        <div className="mt-16 text-center">
          <p className="text-2xl font-heading">No jobs posted...yet.</p>
          <Image
          src="/dashboard/no-jobs.png"
          alt="No jobs"
          priority
          width={300}
          draggable={false}
          height={300}
          className="mx-auto mt-8 mb-8"
          />
          <CreateJob>Create Your first job</CreateJob>
        </div>
      </main>
    )
  }
  else {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Hiring Dashboard</h1>
        <JobTable />
      </main>
    )
  }
}