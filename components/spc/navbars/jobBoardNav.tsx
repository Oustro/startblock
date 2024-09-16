import { auth } from "@/utils/auth"

import ActionWord from "@/components/ui/action-word"

import Link from "next/link"

import { ChevronLeft } from "lucide-react"

export default async function JobBoardNav() {
  const session = await auth()

  return (
    <nav className="fixed top-0 sm:top-8 px-8 py-4 sm:py-0 sm:bg-transparent bg-white w-full sm:border-none border-b border-our-gray">
      <Link
        href={session ? "/dashboard" : "/"}
        >
          <ActionWord className="flex items-center gap-1">
          {session && (
            <ChevronLeft 
            className="h-4 w-4"
            />
          )}
          {session ? "Back to dashboard" : "Powered by StartBlock"}
        </ActionWord>
      </Link>
    </nav>
  )
}