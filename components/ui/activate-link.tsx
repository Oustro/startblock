import ActionButton from "./action-button";

import Image from "next/image";

export default function ActivateLink({ isOwner, imageSrc } : { isOwner: boolean, imageSrc: string }) {


  return (
    <div>
      {isOwner ? (
        <div className="mt-16 flex items-center justify-center">
          <div className="w-[600px]">
            <h1 className="font-heading text-xl">Activate Your Team</h1>
            <p className="mt-4 text-our-gray">As a owner of this team, you need to activate it in order to start hirirng!</p>
            <Image
            src={imageSrc}
            width={600}
            height={200}
            alt="Dashboard example"
            className="border border-our-gray mt-4 w-full "
            />
            <ActionButton
            className="mt-8"
            >
              Activate Team
            </ActionButton>
          </div> 
        </div> 
      ) : (
        <p>You're not an owner</p>
      )}
    </div>
  )
}