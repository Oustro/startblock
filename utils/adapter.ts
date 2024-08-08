import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  let origin = PrismaAdapter(p);
  return {
    ...origin,
    deleteSession: async (sessionToken: any) => {
      try {
        return await p.session.delete({ where: { sessionToken } });
      } catch (e) {
        console.error("Failed to delete session", e);
        return null;
      }
    },
  } as unknown as Adapter;
}
