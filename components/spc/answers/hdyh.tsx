import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";

export default function HearDropdown({ className, disabled } : { className?: string, disabled?: boolean }) {
  const reasons = [
    "Friends/Family",
    "Employee Referral",
    "Social Media",
    "Internet Search",
    "College Fair",
    "Hiring site",
    "Other"
  ];

  return (
    <Select
    disabled={disabled}
    >
      <SelectTrigger className={cn("rounded-none w-fit gap-4 border-our-gray", className)}>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent className="rounded-none mt-1">
        {reasons.map((school) => (
          <SelectItem key={school} value={school}>{school}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}