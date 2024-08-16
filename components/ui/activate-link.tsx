import { auth } from "@/utils/auth";

import ActionButton from "./action-button";

import { Ellipsis } from 'lucide-react';

import Link from "next/link";
import Stripe from "stripe";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function ActivateLink({ isOwner, page, teamId } : { isOwner: boolean, page: string, teamId: string }) {
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
    <div className="relative">
      <div className="border border-our-gray shadow w-96 flex flex-col z-20 justify-center mx-auto mt-48 bg-white border p-8 h-56 text-center">
        <p className="text-2xl font-heading">Activate your team.</p>
        <p className="text-our-gray mt-4">Activate your team to begin using StartBlock's deligthfully simple ATS.</p>
        {isOwner && (
          <Link 
          href={stripeSession.url as string}
          >
            <ActionButton
            className="w-36 mt-8"
            >
              Activate Your Team
            </ActionButton>
          </Link>
        )}
      </div>

      {page === "dashboard" ? (
        <Table className="-z-20 blur fixed -mt-96">
          <TableHeader>
            <TableRow className="font-heading hover:bg-transparent border-our-gray">
              <TableHead className="w-[200px] text-our-gray">Job Title</TableHead>
              <TableHead className="text-our-gray w-[150px]">Status</TableHead>
              <TableHead className="text-our-gray">Applicants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10).fill(0).map((_, i) => (
              <TableRow className="hover:bg-transparent border-our-gray" key={i}>
                <TableCell className="font-medium">Product {i % 3 === 0 ? "Active" : "Arc"}</TableCell>
                <TableCell>{i % 3 === 0 ? "Active" : "Archived"}</TableCell>
                <TableCell>{i % 3 === 0 ? i / 3 : i * 23}</TableCell>
                <TableCell className="flex justify-end">
                  <Ellipsis />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="-z-20 absolute w-full -mt-96 blur">
          <div className="w-full border border-our-gray py-6 px-8">
            <h2 className="text-xl font-heading">Team Share Code</h2>
            <p className="text-our-gray mt-2">Share this code with members trying to join your team.</p>
            <h3 className="mt-6 text-lg font-heading">FAKECODEHELLO</h3>
          </div>  
          <div className="py-4 px-8 bg-white border-r border-l border-b border-our-gray">
            <p className="text-our-gray text-sm">This code can be used during onboarding to join this team.</p>
          </div>

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
        </div>
      )}
    </div>
  )
}