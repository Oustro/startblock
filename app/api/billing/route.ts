import { NextResponse, NextRequest } from "next/server";

import prisma from "@/utils/db";

import Stripe from "stripe";
import { Client } from "postmark";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const sig = request.headers.get("stripe-signature") as string;
  const payload = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    if (event.type === "customer.subscription.created") {
      await prisma.team.update({
        where: {
          id: event.data.object.metadata.teamId as string,
        },
        data: {
          activated: true,
        },
      });
    } else if (event.type === "customer.subscription.deleted") {
      await prisma.team.update({
        where: {
          id: event.data.object.metadata.teamId as string,
        },
        data: {
          activated: false,
        },
      });
    } else if (event.type === "invoice.payment_failed") {
      if (
        event.data.object.attempt_count === 1 ||
        event.data.object.attempt_count === 9
      ) {
        const client = new Client(process.env.AUTH_POSTMARK_KEY as string);

        client.sendEmail({
          From: "StartBlock <howdy@useziggy.com>",
          To: event.data.object.customer_email as string,
          Subject: "StartBlock Verification Code",
          TextBody:
            "Howdy,\n\nWe're having trouble processing your payment. Please update your payment information. Failure to do so, will result in deactivation of your team on StartBlock.\n\nThanks,\nTeam StartBlock",
        });
      }
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
