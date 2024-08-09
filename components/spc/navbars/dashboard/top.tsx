import { auth } from "@/utils/auth";

import Logo from "@/components/ui/logo";
import ActionWord from "@/components/ui/action-word";
import { SignoutForm } from "../../forms/signoutForm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default async function TopDashboardNav() {
  const session = await auth();



  return (
    <nav className="w-full h-20 fixed top-0 bg-white flex justify-between items-center px-6">
      <Logo 
      link="/dashboard"
      />
      <div className="flex items-center gap-8">
        <ActionWord>
          Feedback
        </ActionWord>
        <DropdownMenu>
          <DropdownMenuTrigger
          className="outline-none"
          >
            <div 
            style={{
              background: session?.user.gradient,
            }}
            className="h-8 w-8 rounded-full border border-our-gray" 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
          align="end"
          className="mt-2 rounded-none p-2"
          > 
            <div className="px-2 py-1 mb-2">
              <h6 className="font-heading">{session?.user.name}</h6>
              <p className="text-our-gray text-sm">{session?.user.email}</p>
            </div>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuItem>Changelog</DropdownMenuItem>
            <DropdownMenuItem>
              <SignoutForm />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}