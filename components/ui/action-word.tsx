import { cn } from "@/lib/utils"

export default function ActionWord({ onClick, type, children, className, disabled } : { onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, type?: "submit" | "reset" | "button" | undefined, children: React.ReactNode, className?: string, disabled?: boolean }) {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled}
    className={cn("transition-all font-heading text-sm border border-x-transparent border-y-transparent hover:border-b-black disabled:border-b-black", className)}
    >
      {disabled ? "Loading..." : children}
    </button>
  )
}