"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";

import { customAlphabet } from "nanoid";

import { team } from "@/types/startblock";

export async function createTeam(teamName: string): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

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

export async function getTeamForUser(): Promise<team | undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const team = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      ownedTeams: {
        include: {
          jobs: true,
        },
      },
      memberTeams: {
        include: {
          jobs: true,
        },
      },
    },
  });

  if (!team) {
    return;
  }

  let type = "member";
  if (team?.ownedTeams.length !== 0) {
    type = "owner";
  }

  return {
    ...(team.memberTeams[0] || team.ownedTeams[0]),
    type: type,
  } as team;
}

export async function regeneratePublicId(teamId: string): Promise<string> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const newPublicId = customAlphabet(
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    20
  )();

  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      publicId: newPublicId,
    },
  });

  return newPublicId;
}

export async function saveWhiteList(
  teamId: string,
  whitelist: string[]
): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      whitelist: whitelist,
    },
  });

  return;
}
