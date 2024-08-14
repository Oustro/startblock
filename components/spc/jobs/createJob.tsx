import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import CreateJobForm from "../forms/createJobForm"

export default function CreateJob({ children } : { children?: React.ReactNode }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white hover:bg-off-black disabled:bg-off-black transition-all p-2 font-heading text-sm">
          {children}
        </DialogTrigger>
        <DialogContent className="rounded-none bg-white h-[500px] overflow-scroll">
          <DialogHeader>
            <h1 className="font-heading text-2xl mb-8">Create a new job</h1>
            <CreateJobForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
