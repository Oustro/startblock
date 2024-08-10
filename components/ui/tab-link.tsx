import { cn } from "@/lib/utils"
import Link from "next/link"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function TabLink({ link, children, className, activate, label } : { link: string, children: React.ReactNode, className?: string, activate: boolean, label: string }) {
  return (
    <TooltipProvider
    delayDuration={0.3}
    >
      <Tooltip>
        <TooltipTrigger>
          <Link 
          href={link} 
          >
            <div className={cn(`flex items-center border border-dotted border-transparent p-3 outline-none transition-colors focus:text-slate-900 ${activate ? "bg-slate-100 border border-dotted border-our-gray" : "hover:bg-slate-100"}`, className)}>
              {children}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent
        align="center"
        side="right"
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}