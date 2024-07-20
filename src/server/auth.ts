import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env";
import { db } from "~/server/db";
import { z } from "zod"

const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
})

//types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: "ADMIN" | "USER" | "MINER" | "MANUFACTURER";
    } & DefaultSession["user"];
  }


}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name : "Credentials",
      credentials : {
        email : { label : "Email", type : "email" },
        password : { label : "Password", type : "password" },
        confirmPassword : { label : "Confirm Password", type : "password" },
        role : { label : "Role", type : "select", options : ["USER", "ADMIN", "MINER", "MANUFACTURER"] }
      },
      async authorize(credential, req) {
        if(!credential) return null

        try {
          const { email, password, role } = userSchema.parse({
            email: credential.email,
            password: credential.password,
            role: credential.role,
          })

          const user = await db.user.findUnique({
            where : { email }
          })

          if(user && bcrypt.compareSync(password, user.password as string)) {
            return { id: user.id, name : user.name, email: user.email, role: user.role}
          }

          return null

        } catch (error) {
          if(error instanceof z.ZodError) {
            console.error(error.errors)
            return null
          }
          return null
        }

      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages : {
    signIn: "/auth/signin",
    error: "/auth/error",
  }
};

export const getServerAuthSession = () => getServerSession(authOptions);
