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
        <div className="mt-16 text-center">
          <p className="text-2xl font-heading">Please activate your team.</p>
          <Image
          src="/dashboard/activate.png"
          alt="Activate your team"
          priority
          width={300}
          draggable={false}
          height={300}
          className="mx-auto mt-8 mb-8"
          />
          <Link 
          href={stripeSession.url as string}
          >
            <ActionButton
            className="w-36"
            >
              Activate Your Team
            </ActionButton>
          </Link>
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-2xl font-heading">Please activate your team.</p>
          <Image
          src="/dashboard/activate.png"
          alt="Activate your team"
          priority
          width={300}
          draggable={false}
          height={300}
          className="mx-auto mt-8 mb-8"
          />
        </div>
      )}
    </div>
  )
}