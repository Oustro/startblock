import SigninForm from "@/components/spc/forms/signinForm";
import LogoNav from "@/components/spc/navbars/logoNav";

import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth()

  if (session) {
    return redirect("/dashboard")
  }
  
  return (
    <main>
      <LogoNav />
      <SigninForm />
    </main>
  );
}
