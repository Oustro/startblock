"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";

import { nanoid, customAlphabet } from "nanoid";

export async function createTeam(teamName: string): Promise<undefined> {
  const session = await auth();

  await prisma.team.create({
    data: {
      name: teamName,
      shareId: customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8)(),
      publicId: customAlphabet(
        "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
        20
      )(),
      owners: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });

  return;
}
