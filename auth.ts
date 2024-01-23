import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getAccountByUserId } from "./data/users"
import { UserRole } from "@prisma/client"


export const { 
  handlers: {GET, POST}, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  callbacks: {
    async session({token, session}: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({token}) {
      if (!token.sub) return token;

      const existingUser = await getAccountByUserId(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  debug: true,
  session: { strategy: "jwt" },
  ...authConfig,
})