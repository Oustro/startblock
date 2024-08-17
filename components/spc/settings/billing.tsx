import { auth } from "@/utils/auth";

import ActionButton from "@/components/ui/action-button"

import { getTeamForUser } from "@/lib/team"

import Link from "next/link";
import Stripe from "stripe";

export default async function TeamBilling({ teamId, isOwner, activated } : { teamId: string, isOwner: boolean, activated: boolean }) {
  const session = await auth();
  const team = await getTeamForUser();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  let portalUrl = ''

  if (team?.activated) {
    const stripePortalSession = await stripe.billingPortal.sessions.create({
      customer: team?.stripeCustomerId as string,
      return_url: 'http://localhost:3000/dashboard/settings'
    })

    portalUrl = stripePortalSession.url as string
  }
  else {
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
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
      cancel_url: 'http://localhost:3000/dashboard/settings',
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          teamId: teamId
        }
      }
    })

    portalUrl = stripeCheckoutSession.url as string
  }

  return (
    <>
      <div className="w-full border border-our-gray py-6 px-8 mt-8">
        <h2 className="text-xl font-heading">Billing</h2>
        <p className="text-our-gray mt-2">Manage your billing for StartBlock.</p>
        {isOwner ? (
          <Link
          href={portalUrl}
          >
            <ActionButton
            className="w-40 mt-6"
            >
              {team?.activated ? 'Manage billing' : 'Activate team'}
            </ActionButton>
          </Link>
        ) : (
          <h3 className="mt-6 text-lg font-heading">This team {team?.activated ? "is active." : "has not been activated."}</h3>
        )}
      </div>  
      <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray flex justify-between items-center">
        <p className="text-our-gray text-sm w-full">Email <Link className="underline" href="mailto:billing@startblock.me">billing@startblock.me</Link> if you have any questions about pricing.</p>
      </div>
    </>
  )
}