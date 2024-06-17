import db from "@/db";
import { adminTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: async ({ session, token }) => {
      console.log("token is", token);
      if (session?.user) {
        if (typeof token.uid !== "number") {
          throw new Error(
            `Type of token.uid is bad ${token} in session callback`
          );
        }
        session.user.id = token.uid;
      } else {
        console.log("skipping adding id to session", session, token);
      }
      console.log("session", session);
      return session;
    },
    jwt: async ({ user, token }) => {
      console.log("user is", user);
      if (user && typeof user.id === "number") {
        console.log("id is ", user.id);
        token.uid = user.id;
      }
      if (!user || !user.id) {
        console.log("skipping token formation user:", user);
      }

      return token;
    },
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

        return { id: res[0].id };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
