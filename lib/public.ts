"use server";

import prisma from "@/utils/db";

import { answers } from "@/types/startblock";

export async function verifyOrigin(
  origin: string,
  publicKey: string
): Promise<boolean> {
  const team = await prisma.team.findFirst({
    where: {
      publicId: publicKey,
    },
    select: {
      whitelist: true,
    },
  });

  if (!team) {
    return false;
  }

  for (const domain of team.whitelist) {
    const requestOrigin = origin.replace(/^https?:\/\//, "");
    const allowedOrigin = domain.replace(/^https?:\/\//, "");

    if (requestOrigin === allowedOrigin) {
      return true;
    }
  }

  return false;
}

export async function getJobs(publicKey: string) {
  return prisma.job.findMany({
    where: {
      team: {
        publicId: publicKey,
      },
      status: "Active",
    },
    select: {
      id: true,
      title: true,
      location: true,
      salary: true,
      description: true,
      requirements: true,
      questions: true,
      team: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function applyToJob(jobId: string, answers: answers[]) {
  await prisma.application.create({
    data: {
      jobId: jobId,
      answers: answers as any,
    },
  });

  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      applicant: {
        increment: 1,
      },
    },
  });
}
