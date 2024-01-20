"use server"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import bcrypt from "bcrypt"
import { get } from "http"
import { getUserByEmail } from "@/data/users"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return {error: validatedFields.error.message}
    }

const { email, password, name } = validatedFields.data
const hashedPassword = await bcrypt.hash(password, 10)

const existingUser = await getUserByEmail(email)

if (existingUser) {
    return {error: "Email already in use."}
}

await db.user.create({
    data: {
        email,
        password: hashedPassword,
        name
    }
});

    return {success: "User created!"}
}