import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      onboarded: boolean;
      email: string;
      id: string;
      name: string | undefined;
      gradient: string | undefined;
      stripeId: string | undefined;
    };
  }
}
