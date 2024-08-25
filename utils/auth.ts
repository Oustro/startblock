import NextAuth from "next-auth";
import Postmark from "next-auth/providers/postmark";
import prisma from "./db";
import { CustomPrismaAdapter } from "./adapter";

import { customAlphabet } from "nanoid";
import { Client } from "postmark";

const nanoid = customAlphabet("1234567890", 6);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    Postmark({
      from: "no-reply@useziggy.com",
      async generateVerificationToken() {
        return nanoid();
      },
      maxAge: 3 * 60,
      async sendVerificationRequest({ token, identifier }) {
        const client = new Client(process.env.AUTH_POSTMARK_KEY as string);

        await client.sendEmail({
          From: "StartBlock <howdy@useziggy.com>",
          To: identifier,
          Subject: "StartBlock Verification Code",
          TextBody: "Howdy,\n\nYour verification code is " + token,
        });
      },
    }),
  ],
});
