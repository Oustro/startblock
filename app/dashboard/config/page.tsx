import { getTeamForUser } from "@/lib/team";

import ActivateLink from "@/components/ui/activate-link";
import ApiKey from "@/components/spc/config/apikey";
import WhiteList from "@/components/spc/config/whitelist";

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
      <WhiteList teamId={team.id} />
    </main>
  );
}