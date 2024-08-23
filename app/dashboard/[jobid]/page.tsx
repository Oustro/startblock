import { getJobById } from "@/lib/job"

import ApplicantTable from "@/components/spc/jobs/applicantTable";
import ActionWord from "@/components/ui/action-word";

import { ChevronLeft } from "lucide-react";

import Link from "next/link";

export default async function JobDashboard({ params } : { params: { jobid: string } }) {

  const job = await getJobById(params.jobid);

  return (
    <main className="p-8">
      <Link 
      href="/dashboard"
      >
        <ActionWord className="flex items-center gap-1">
          <ChevronLeft 
          className="h-4 w-4"
          />
          Back to dashboard
        </ActionWord>
      </Link>
      <h1 className="text-4xl mt-4 font-special">{job?.title}</h1>
      <ApplicantTable jobId={params.jobid} />
    </main>
  )
}