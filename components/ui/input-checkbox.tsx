import { cn } from "@/lib/utils"
import { Checkbox } from "./checkbox"
import React from "react"

export default function CheckBox({ className, onCheckChanged, disabled, checked, children } : { className?: string, disabled?: boolean, checked?: boolean, children?: React.ReactNode, onCheckChanged?: (checked: boolean) => void }) {
  return (
    <label className={cn("flex items-start gap-2", className)}>
      <Checkbox
      checked={checked}
      onCheckedChange={onCheckChanged}
      disabled={disabled}
      className="rounded-none"
      />
      <span className="font-heading -mt-1">{children}</span>
    </label>
  )
}