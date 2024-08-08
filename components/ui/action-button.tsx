import { cn } from "@/lib/utils"

export default function ActionButton({ onClick, type, children, className, disabled } : { onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, type?: "submit" | "reset" | "button" | undefined, children: React.ReactNode, className?: string, disabled?: boolean }) {
  return (
    <button 
    type={type} 
    onClick={onClick} 
    disabled={disabled}
    className={cn("bg-black text-white hover:bg-off-black disabled:bg-off-black transition-all w-full p-2 font-heading text-sm", className)}
    >
      {disabled ? "Loading..." : children}
    </button>
  )
}