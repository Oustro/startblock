import { auth } from "@/utils/auth";

import Name from "@/components/spc/account/name";
import Gradient from "@/components/spc/account/gradient";

export default async function Account() {

  const session = await auth();
  
  return (
    <main className="p-8">
      <h1 className="text-4xl font-special">My Account</h1>
      <Name currName={session?.user.name as string} />
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Your Work Email</h2>
        <p className="text-our-gray mt-2">This is the email you signed up for StartBlock with.</p>
        <h3 className="mt-6 text-lg font-heading">{session?.user.email}</h3>
      </div>  
      <div className="py-6 px-8 bg-white border-r border-l border-b border-our-gray">
        <p className="text-our-gray text-sm w-full">This email cannot be changed.</p>
      </div>
      <Gradient currGradient={session?.user.gradient as string} />
    </main>
  );
}