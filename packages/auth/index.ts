import Discord from "@auth/core/providers/discord"
import Github from "@auth/core/providers/github"
import type { DefaultSession } from "@auth/core/types"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import { prisma } from "@acme/db"

import { env } from "./env.mjs"

export type { Session } from "next-auth"

export const providers = ["github", "discord"] as const
export type OAuthProviders = (typeof providers)[number]

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental, // will be removed in the future
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),

    // @TODO - if you wanna have auth on the edge
    // jwt: ({ token, profile }) => {
    //   if (profile?.id) {
    //     token.id = profile.id;
    //     token.image = profile.picture;
    //   }
    //   return token;
    // },

    // @TODO
    // authorized({ request, auth }) {
    //   return !!auth?.user
    // }
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
})
