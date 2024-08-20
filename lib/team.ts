"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";

import { customAlphabet } from "nanoid";

import { memberList, team } from "@/types/startblock";

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

export async function joinTeam(teamShareCode: string): Promise<boolean> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const team = await prisma.team.findUnique({
    where: {
      shareId: teamShareCode,
    },
  });

  if (!team) {
    return false;
  }

  await prisma.team.update({
    where: {
      shareId: teamShareCode,
    },
    data: {
      members: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });

  return true;
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
          jobs: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      memberTeams: {
        include: {
          jobs: {
            orderBy: {
              createdAt: "asc",
            },
          },
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

export async function updateTeamName(
  teamId: string,
  name: string
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
      name: name,
    },
  });

  return;
}

export async function getTeamMembers(teamId: string): Promise<memberList[]> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const team = await prisma.team.findUnique({
    where: {
      id: teamId,
    },
    include: {
      owners: true,
      members: true,
    },
  });

  let teamMembers = [];

  for (const owner of team?.owners || []) {
    teamMembers.push({
      name: owner.name,
      id: owner.id,
      email: owner.email,
      gradient: owner.gradient,
      type: "Owner",
    });
  }

  for (const owner of team?.members || []) {
    teamMembers.push({
      id: owner.id,
      name: owner.name,
      email: owner.email,
      gradient: owner.gradient,
      type: "Member",
    });
  }

  return teamMembers;
}

export async function updateMemberType(
  teamId: string,
  memberId: string,
  type: string
): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  if (type === "Owner") {
    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        owners: {
          connect: {
            id: memberId,
          },
        },
        members: {
          disconnect: {
            id: memberId,
          },
        },
      },
    });
  } else {
    await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        members: {
          connect: {
            id: memberId,
          },
        },
        owners: {
          disconnect: {
            id: memberId,
          },
        },
      },
    });
  }

  return;
}
