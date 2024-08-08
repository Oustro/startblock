import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";

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
      {children}
    </main>
  );
}