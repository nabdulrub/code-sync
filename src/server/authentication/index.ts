import { db } from "@/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import signInUserCredentials from "./providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
    };
  }
  interface User {
    id: string;
    email: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        return signInUserCredentials(credentials);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        token.email = session.email;
        token.username = session.username;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { secret: process.env.NEXTAUTH_JWT },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/",
  },
};

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
