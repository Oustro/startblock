import { getJobById } from "@/lib/job"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function JobDashboard() {

  const job = await getJobById("cm01tayey00032tzqqvglk45b");

  return (
    <main className="p-8">
      <div className="flex items-center gap-4">
        <TooltipProvider
        delayDuration={0.3}
        >
          <Tooltip>
            <TooltipTrigger>
              {job?.status === "Active" ? (
                <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></div>
              ) : (
                <div className="relative inline-flex rounded-full h-3 w-3 border border-our-gray"></div>
              )}
            </TooltipTrigger>
            <TooltipContent
            align="center"
            side="bottom"
            className="z-50"
            >
              <p>{job?.status} job</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <h1 className="text-4xl font-special">{job?.title}</h1>
      </div>
    </main>
  )
}