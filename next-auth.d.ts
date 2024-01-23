import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "@auth-core" {
    interface Session {
        user: ExtendedUser
    }
}