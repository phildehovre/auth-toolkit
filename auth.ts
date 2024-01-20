import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"


export const { 
  handlers: {GET, POST}, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  callbacks: {
    async redirect({url, baseUrl}) {
      console.log("Callback redirect")
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
      }
        else if ( new URL(url, baseUrl).origin === baseUrl) {
        return url
      }

    }}
    ,

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})