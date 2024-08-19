import { cn } from "@/lib/utils"

export default function FileInput({ required, className, onChange, disabled, value } : { required?: boolean, className?: string, onChange?: React.ChangeEventHandler<HTMLInputElement>, disabled?: boolean, value?: string }) {
  return (
    <input
    type="file"
    value={value}
    required={required}
    onChange={onChange}
    disabled={disabled}
    className={cn("file:bg-black disabled:cursor-not-allowed file:text-white file:p-2 file:text-sm hover:file:bg-off-black file:disabled:bg-off-black file:disabled:cursor-not-allowed file:font-heading file:border-none file:transition-all", className)}
    />
  )
}