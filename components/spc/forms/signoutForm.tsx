import { signOut } from "@/utils/auth"
import { LogOut } from "lucide-react"
 
export function SignoutForm() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button 
      type="submit" 
      className="flex items-center gap-2"
      >
        <LogOut className="w-4" /> 
        Logout
      </button>
    </form>
  )
}