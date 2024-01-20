"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import {  DEFAULT_REDIRECT_PATH } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: validatedFields.error.message}

    }

    const {email, password} = validatedFields.data

    try {
        await signIn("credentials", {email, password, redirectTo: DEFAULT_REDIRECT_PATH})
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