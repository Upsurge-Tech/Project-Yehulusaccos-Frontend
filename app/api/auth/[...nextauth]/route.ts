import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { Admin } from "@/data-types/Admin";
import db from "@/db";
import { eq, and } from "drizzle-orm";
import { adminTable } from "@/db/schema";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Email and Password",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("credentials", credentials);

        if (!credentials) {
          return null;
        }

        let res;
        try {
          res = await db
            .select()
            .from(adminTable)
            .where(
              and(
                eq(adminTable.email, credentials.email),
                eq(adminTable.password, credentials.password)
              )
            );
        } catch (e) {
          console.error(e);
          throw new Error("An Error Occured" + e);
        }

        if (res.length === 0) {
          return null;
        }

        return { id: res[0].id } as any;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
