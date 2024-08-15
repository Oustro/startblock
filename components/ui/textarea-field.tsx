import { cn } from "@/lib/utils"

export default function TextArea({ placeholder, name, required, className, onChange, disabled, value } : { placeholder: string, name:string, required?: boolean, className?: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled?: boolean, value?: string }) {
  return (
    <textarea
    name={name}
    value={value}
    placeholder={placeholder}
    required={required || false}
    onChange={onChange as any}
    disabled={disabled}
    className={cn("px-3 py-2 border bg-transparent text-sm disabled:cursor-not-allowed font-normal h-32 w-full border-our-gray outline-none", className)}
    />
  )
}