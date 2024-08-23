"use server";

import prisma from "@/utils/db";
import { Redis } from "@upstash/redis";

import { auth } from "@/utils/auth";

export async function checkIfEmailIsInUse(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return true;
  }

  const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_PASS,
  });

  await redis.set(email, "new user", {
    ex: 60 * 3,
    nx: true,
  });

  return false;
}

export async function changeUserName(name: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: name,
    },
  });

  return;
}

export async function changeUserGradient(gradient: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      gradient: gradient,
    },
  });

  return;
}
