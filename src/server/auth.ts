import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "~/server/db";
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["ADMIN", "USER", "MINER", "MANUFACTURER"]),
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: "ADMIN" | "USER" | "MINER" | "MANUFACTURER";
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role?: "ADMIN" | "USER" | "MINER" | "MANUFACTURER";
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id as string,
        role: token.role as "ADMIN" | "USER" | "MINER" | "MANUFACTURER",
      },
    }),
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "select", options: ["USER", "ADMIN", "MINER", "MANUFACTURER"] },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const { email, password, role } = userSchema.parse(credentials);
          const user = await db.user.findUnique({ where: { email } });
          if (user && bcrypt.compareSync(password, user.password as string)) {
            return {
              id: user.id,
              email: user.email,
              role: user.role,
              name: user.name,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};

export const getServerAuthSession = () => getServerSession(authOptions);