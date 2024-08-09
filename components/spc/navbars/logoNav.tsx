import Logo from "@/components/ui/logo"

export default function LogoNav() {
  return (
    <nav className="fixed top-8 left-8">
      <Logo 
      link="/dashboard"
      />
    </nav>
  )
}