"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";
import { createGradient } from "./utils";

export async function onboardUserStepOne(name: string): Promise<undefined> {
  const session = await auth();

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      name: name,
      gradient: createGradient(),
    },
  });

  return;
}

export async function onboardUserStepTwo(): Promise<undefined> {
  const session = await auth();

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
