import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

import SideDashboardNav from "@/components/spc/navbars/dashboard/side";
import TopDashboardNav from "@/components/spc/navbars/dashboard/top";

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
  
  return (
    <main>
      <TopDashboardNav />
      <SideDashboardNav />
      <div className="ml-24 mt-20">
        {children}
      </div>
    </main>
  );
}