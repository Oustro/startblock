"use server";

import prisma from "@/utils/db";
import { auth } from "@/utils/auth";

import { questions } from "@/types/startblock";

import { getTeamForUser } from "./team";

export async function createJob(
  jobTitle: string,
  jobLocation: string,
  jobPay: string,
  jobDescription: string,
  jobRequirements: string,
  additionalQuestions: questions[],
  customQuestions: questions[]
): Promise<undefined> {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const userTeam = await getTeamForUser();

  await prisma.job.create({
    data: {
      title: jobTitle,
      location: jobLocation,
      salary: jobPay,
      description: jobDescription,
      requirements: jobRequirements,
      questions: [...additionalQuestions, ...customQuestions] as any,
      teamId: userTeam?.id as string,
    },
  });

  return;
}

export async function getJobById(jobId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return job;
}

export async function getApplicantsForJob(jobId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const applicants = await prisma.application.findMany({
    where: {
      jobId: jobId,
    },
  });

  return applicants;
}
