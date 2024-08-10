import { auth } from "@/utils/auth";

import ActionButton from "./action-button";

import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

export default async function ActivateLink({ isOwner, imageSrc, teamId } : { isOwner: boolean, imageSrc: string, teamId: string }) {
  const session = await auth();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID as string,
        quantity: 1
      },
      {
        price: process.env.STRIPE_INTERVIEW_ID as string,
      }
    ],
    customer: session?.user.stripeId as string,
    mode: 'subscription',
    success_url: 'http://localhost:3000/dashboard',
    cancel_url: 'http://localhost:3000/dashboard',
    allow_promotion_codes: true,
    subscription_data: {
      metadata: {
        teamId: teamId
      }
    }
  })

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
            <Link 
            href={stripeSession.url as string}
            >
              <ActionButton
              className="mt-8"
              >
                Activate Team
              </ActionButton>
            </Link>
          </div> 
        </div> 
      ) : (
        <div className="mt-16 flex items-center justify-center">
          <div className="w-[600px]">
            <h1 className="font-heading text-xl">Activate Your Team</h1>
            <p className="mt-4 text-our-gray">As a member of this team, please let the owner know they must activate this team in order to use it.</p>
            <Image
            src={imageSrc}
            width={600}
            height={200}
            alt="Dashboard example"
            className="border border-our-gray mt-4 w-full "
            />
          </div> 
        </div> 
      )}
    </div>
  )
}