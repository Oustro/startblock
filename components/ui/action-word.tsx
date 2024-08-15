import { cn } from "@/lib/utils"

export default function ActionWord({ onClick, type, children, className, disabled } : { onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, type?: "submit" | "reset" | "button" | undefined, children: React.ReactNode, className?: string, disabled?: boolean }) {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled}
    className={cn("transition-all font-heading text-sm disabled:border-b-black hover:text-our-gray", className)}
    >
      {disabled ? "Loading..." : children}
    </button>
  )
}