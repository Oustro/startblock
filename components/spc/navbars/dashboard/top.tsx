import { auth } from "@/utils/auth";

import Logo from "@/components/ui/logo";

export default async function TopDashboardNav() {
  const session = await auth();

  return (
    <nav className="bg-blue-200 w-full h-16 fixed top-0 flex items-center px-6">
      <Logo 
      link="/dashboard"
      />
    </nav>
  )
}