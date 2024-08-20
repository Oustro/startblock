import { auth } from "@/utils/auth"

import ActionWord from "@/components/ui/action-word"
import Link from "next/link"

export default async function JobBoardNav() {
  const session = await auth()

  return (
    <nav className="fixed top-8 left-8">
      <Link
        href={session ? "/dashboard" : "/"}
        >
        <ActionWord>
          {session ? "Back to dashboard" : "Powered by StartBlock"}
        </ActionWord>
      </Link>
    </nav>
  )
}