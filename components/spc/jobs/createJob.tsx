import ActionButton from "@/components/ui/action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CreateJob({ children } : { children?: React.ReactNode }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-black text-white hover:bg-off-black disabled:bg-off-black transition-all p-2 font-heading text-sm">
          {children}
        </DialogTrigger>
        <DialogContent className="rounded-none">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
