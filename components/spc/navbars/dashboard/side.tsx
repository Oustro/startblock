import { auth } from "@/utils/auth";

import Logo from "@/components/ui/logo";

export default async function SideDashboardNav() {
  const session = await auth();

  return (
    <nav className="w-24 bg-red-400 flex flex-col items-center h-screen fixed">
      
    </nav>
  )
}