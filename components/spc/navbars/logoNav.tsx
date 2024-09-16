import { auth } from "@/utils/auth"

import Logo from "@/components/ui/logo"

export default async function LogoNav() {
  const session = await auth()

  return (
    <nav className="sm:fixed sm:top-8 sm:left-8 -mt-16 sm:my-0 mb-12 ">
      <Logo 
      link={session ? "/dashboard" : "/"}
      />
    </nav>
  )
}