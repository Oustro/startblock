import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

import SideDashboardNav from "@/components/spc/navbars/dashboard/side";
import TopDashboardNav from "@/components/spc/navbars/dashboard/top";

import { getTeamForUser } from "@/lib/team";

export default async function DashboardLayout({ children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()

  if (!session) {
    return redirect("/signin")
  }

  if (session.user.onboarded === false) {
    return redirect("/onboard")
  }

  const team = await getTeamForUser()
  
  return (
    <main>
      <TopDashboardNav />
      <SideDashboardNav publicId={team?.publicId as string} />
      <div className="sm:ml-24 mt-20">
        {children}
      </div>
    </main>
  );
}