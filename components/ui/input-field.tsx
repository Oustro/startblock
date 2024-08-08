import { cn } from "@/lib/utils"

export default function Input({ type, placeholder, name, required, className, onChange, disabled, value } : { type: string, placeholder: string, name:string, required?: boolean, className?: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled?: boolean, value?: string }) {
  return (
    <input
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    required={required || false}
    onChange={onChange}
    disabled={disabled}
    className={cn("px-3 py-2 border bg-transparent text-sm font-normal w-full border-our-gray outline-none", className)}
    />
  )
}