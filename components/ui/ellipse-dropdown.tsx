import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils";

import { Ellipsis } from 'lucide-react';

export default function EllipsisDropdown({ children, className, contentClassname } : { children: React.ReactNode, className?: string, contentClassname?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className={cn("outline-none hover:bg-slate-100 border hover:border-our-gray transition-all p-0.5", className)}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
      align="end"
      className={cn("rounded-none p-2 mt-1", contentClassname)}
      > 
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}