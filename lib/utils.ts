import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "@/utils/db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGradient() {
  const gradients = [
    "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
    "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
    "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
}

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

export function getJobs(publicKey: string) {
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
    },
  });
}
