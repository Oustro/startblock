"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";
import { createGradient } from "./utils";
import Stripe from "stripe";

export async function onboardUserStepOne(name: string): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const customer = await stripe.customers.create({
    name: name,
    email: session?.user.email,
  });

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      name: name,
      gradient: createGradient(),
      stripeId: customer.id as string,
    },
  });

  return;
}

export async function onboardUserStepTwo(): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      onboarded: true,
    },
  });

  return;
}
