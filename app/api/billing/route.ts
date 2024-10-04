import { NextResponse, NextRequest } from "next/server";

import prisma from "@/utils/db";

import Stripe from "stripe";
import { Client } from "postmark";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function POST(request: NextRequest) {
  const redis = new Redis({
    url: process.env.UPSTASH_URL || "",
    token: process.env.UPSTASH_TOKEN || "",
  });

  const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"),
  });

  const identifier = "Stripe Webhook API";
  const { success } = await ratelimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { message: "Rate limit exceeded" },
      { status: 429 }
    );
  }

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
          stripeCustomerId: event.data.object.customer as string,
        },
      });
    } else if (event.type === "customer.subscription.deleted") {
      await prisma.team.update({
        where: {
          id: event.data.object.metadata.teamId as string,
        },
        data: {
          activated: false,
          stripeCustomerId: null,
        },
      });

      const customer_email = await prisma.user.findFirst({
        where: {
          stripeId: event.data.object.customer as string,
        },
        select: {
          email: true,
        },
      });

      const client = new Client(process.env.AUTH_POSTMARK_KEY as string);

      client.sendEmail({
        From: "StartBlock <howdy@useziggy.com>",
        To: customer_email?.email as string,
        Subject: "StartBlock Subscription Cancelled",
        TextBody:
          "Howdy,\n\nWe're writing to let you know that your subscription to StartBlock has been successfully cancelled. We're sorry to see you go and we hope to see you again soon!\n\nThanks for the memories,\nTeam StartBlock",
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
          Subject: "StartBlock Payment Failed",
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
