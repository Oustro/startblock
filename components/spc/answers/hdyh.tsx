import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";

export default function HearDropdown({ className, disabled, required, answerQuestionFunction, index } : { className?: string, disabled?: boolean, required?: boolean, answerQuestionFunction?: Function, index?: number }) {
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
    onValueChange={(e) => answerQuestionFunction && answerQuestionFunction("How did you hear about us?", e, index)}
    disabled={disabled}
    required={required}
    >
      <SelectTrigger className={cn("rounded-none bg-transparent w-fit gap-4 border-our-gray", className)}>
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