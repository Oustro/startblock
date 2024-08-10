import { getTeamForUser } from "@/lib/team";
import JobTable from "@/components/spc/jobs/jobTable";

export default async function Dashboard() {

  const team = await getTeamForUser();

  if (!team?.activated) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Dashboard</h1>
        <JobTable />
      </main>
    );
  }


  return (
    <main className="p-8">
      <h1 className="text-4xl font-special">Dashboard</h1>
    </main>
  );
}