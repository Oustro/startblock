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
      team: {
        OR: [
          {
            owners: {
              some: {
                email: session.user.email,
              },
            },
          },
          {
            members: {
              some: {
                email: session.user.email,
              },
            },
          },
        ],
      },
    },
    include: {
      applications: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!job) {
    throw new Error("You do not have permission to view this job.");
  }

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

export async function updateApplicantStatus(
  applicationId: string,
  status: string
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.application.update({
    where: {
      id: applicationId,
      job: {
        team: {
          OR: [
            {
              owners: {
                some: {
                  email: session.user.email,
                },
              },
            },
            {
              members: {
                some: {
                  email: session.user.email,
                },
              },
            },
          ],
        },
      },
    },
    data: {
      status: status,
    },
  });

  return;
}

export async function updateApplicantScore(
  applicationId: string,
  score: string
) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  await prisma.application.update({
    where: {
      id: applicationId,
      job: {
        team: {
          OR: [
            {
              owners: {
                some: {
                  email: session.user.email,
                },
              },
            },
            {
              members: {
                some: {
                  email: session.user.email,
                },
              },
            },
          ],
        },
      },
    },
    data: {
      score: score,
    },
  });

  return;
}

export async function updateJobStatus(jobId: string, status: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You must be logged in to access this resource.");
  }

  const userTeam = await getTeamForUser();

  await prisma.job.update({
    where: {
      id: jobId,
      teamId: userTeam?.id as string,
    },
    data: {
      status: status,
    },
  });

  return;
}
