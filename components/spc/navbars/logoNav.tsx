import { auth } from "@/utils/auth"

import Logo from "@/components/ui/logo"

export default async function LogoNav() {
  const session = await auth()

  return (
    <nav className="fixed top-8 left-8">
      <Logo 
      link={session ? "/dashboard" : "/"}
      />
    </nav>
  )
}