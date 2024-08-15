import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { cn } from "@/lib/utils";

export default function YesNoDropdown({ className, disabled } : { className?: string, disabled?: boolean }) {
  return (
    <Select
    disabled={disabled}
    >
      <SelectTrigger className={cn("rounded-none w-fit gap-4 border-our-gray", className)}>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent className="rounded-none mt-1">
        <SelectItem value="yes">Yes</SelectItem>
        <SelectItem value="no">No</SelectItem>
      </SelectContent>
    </Select>
  )
}