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

import Link from "next/link";

import { Slash } from 'lucide-react';

import { getTeamForUser } from "@/lib/team";

export default async function TopDashboardNav() {
  const session = await auth();

  const team = await getTeamForUser();

  return (
    <nav className="w-full h-20 z-20 fixed top-0 bg-white flex justify-between shadow items-center px-6">
      <div className="fixed top-0 left-24 w-full h-20 -z-10 border-b border-our-gray" />
      <div className="flex items-center gap-8">
        <Logo 
        link="/dashboard"
        />
        <Slash 
        strokeWidth={1}
        />
        <h1 className="font-heading text-lg">{team?.name}</h1>
        <Slash 
        strokeWidth={1}
        />
        {team?.activated ? (
          <p className="text-sm flex items-center gap-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            Active
          </p>
        ) : (
          <p className="text-sm flex text-our-gray items-center gap-2 cursor-no-drop">
            <span className="relative inline-flex rounded-full h-2 w-2 border border-our-gray"></span>
            Activation Required
          </p>
        )}
      </div>
      <div className="flex items-center gap-8">
        <Link
        href="/dashboard/account"
        >
          <ActionWord>
            My Account
          </ActionWord>
        </Link>
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
            <DropdownMenuItem>Feedback</DropdownMenuItem>
            <DropdownMenuItem>Documentation</DropdownMenuItem>
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