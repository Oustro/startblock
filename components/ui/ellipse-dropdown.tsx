import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils";

import { Ellipsis } from 'lucide-react';

export default function EllipsisDropdown({ children, className } : { children: React.ReactNode, className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      className={cn("outline-none hover:bg-slate-100 border hover:border-our-gray transition-all p-0.5", className)}
      >
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent
      align="end"
      className="rounded-none p-2 mt-1"
      > 
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}