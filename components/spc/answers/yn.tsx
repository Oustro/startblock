import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";

export default function YesNoDropdown({ className, disabled, required, answerQuestionFunction, index, question } : { className?: string, disabled?: boolean, required?: boolean, answerQuestionFunction?: Function, index?: number, question?: string }) {
  return (
    <Select
    onValueChange={(e) => answerQuestionFunction && answerQuestionFunction(question, e, index, "YN")}
    disabled={disabled}
    required={required}
    >
      <SelectTrigger className={cn("rounded-none w-fit gap-4 bg-transparent border-our-gray", className)}>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent className="rounded-none mt-1">
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
  )
}