import { getJobById } from "@/lib/job"

import ApplicantTable from "@/components/spc/jobs/applicantTable";
import ActionWord from "@/components/ui/action-word";

import { ChevronLeft } from "lucide-react";

import Link from "next/link";

import JobDialog from "@/components/spc/jobs/jobDialog";
import { job, questions } from "@/types/startblock";

export default async function JobDashboard({ params } : { params: { jobid: string } }) {

  const job = await getJobById(params.jobid) as job;

  let additionalQuestions: any = []
  let customQuestions: any = []

  const questionList: questions[] = job.questions as unknown as questions[];
  for (var i = 0; i < questionList.length; i++) {
    if (questionList[i].variety === "Additional") {
      additionalQuestions.push(job.questions[i])
    }
    else {
      customQuestions.push(job.questions[i])
    }
  }

  return (
    <main className="p-8">
      <div className="flex justify-between">
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
        <JobDialog
        job={job}
        additionalQuestions={additionalQuestions}
        customQuestions={customQuestions}
        className="hidden sm:flex"
        >
          Edit Job
        </JobDialog>
      </div>
      <h1 className="text-4xl mt-4 font-special">{job?.title}</h1>
      <ApplicantTable jobId={params.jobid} />
    </main>
  )
}