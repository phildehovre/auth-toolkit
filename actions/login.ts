"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import {  DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: validatedFields.error.message}

    }

    const {email, password} = validatedFields.data

    try {
        /* 
        This is a custom sign in function that is provided by next-auth for Sever-side authentication.
        The client-side authentication is handled in the social.tsx component of this project.
        It takes in a provider and an object with the credentials.
        */
        await signIn("credentials", {email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
    } catch  (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid email or password"}
                default:
                    return {error: "An error occurred while trying to sign in"}
            }
        }
        throw error
    }
}