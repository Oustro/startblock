import { auth } from "@/utils/auth";

export default async function DashboardNav() {
  const session = await auth();

  return (
    <nav className="fixed top-8 right-8">
      
    </nav>
  )
}