import { auth } from "@/utils/auth"

import ActionWord from "@/components/ui/action-word"

import Link from "next/link"

import { ChevronLeft } from "lucide-react"

export default async function JobBoardNav() {
  const session = await auth()

  return (
    <nav className="fixed top-8 left-8">
      <Link
        href={session ? "/dashboard" : "/"}
        >
          <ActionWord className="mb-8 flex items-center gap-1">
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