"use server";

import prisma from "@/utils/db";
import { Redis } from "@upstash/redis";

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
