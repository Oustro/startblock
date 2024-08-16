import { getTeamForUser } from "@/lib/team";

import ActivateLink from "@/components/ui/activate-link";
import ActionButton from "@/components/ui/action-button";
import ApiKey from "@/components/spc/config/apikey";

export default async function Config() {

  const team = await getTeamForUser();

  if (!team?.activated) {
    return (
      <main className="p-8">
        <h1 className="text-4xl font-special">Configuration</h1>
        <ActivateLink 
        page="config"
        isOwner={team?.type === "owner" ? true : false} 
        teamId={team?.id as string}
        />
      </main>
    )
  }
  
  return (
    <main className="p-8">
      <h1 className="text-4xl font-special">Configuration</h1>
      <ApiKey publicId={team.publicId} teamId={team.id} />
      <div className="w-full border border-our-gray py-6 px-8 mt-12">
        <h2 className="text-xl font-heading">Public API Key</h2>
        <p className="text-our-gray mt-2">This key unlocks the StartBlock API and SDK to be used on your own apps.</p>
        <h3 className="mt-6 text-lg font-heading">pk_FAKEAPIKEYHELLO</h3>
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-between items-center">
        <p className="text-our-gray text-sm w-full">Check out our documentation to use StartBlock in your apps.</p>
        <ActionButton 
        className="w-24"
        disabled
        >
          Regenerate
        </ActionButton>
      </div>
    </main>
  );
}