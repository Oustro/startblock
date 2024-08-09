import OnboardForm from "@/components/spc/forms/onboardForm";
import LogoNav from "@/components/spc/navbars/logoNav";

import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";

export default async function Onboard() {
  const session = await auth()

  if (!session) {
    return redirect("/signin")
  }

  if (session.user.onboarded === true) {
    return redirect("/dashboard")
  }
  
  return (
    <main>
      <LogoNav />
      <OnboardForm />
    </main>
  );
}