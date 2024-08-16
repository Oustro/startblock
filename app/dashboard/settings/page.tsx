import { getTeamForUser } from "@/lib/team";

export default async function Settings() {

  const team = await getTeamForUser();
  
  return (
    <main className="p-8">
      <h1 className="text-4xl font-special">Settings</h1>
       <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Team Share Code</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <h3 className="mt-6 text-lg font-heading">{team?.shareId}</h3>
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
      </div>
    </main>
  );
}