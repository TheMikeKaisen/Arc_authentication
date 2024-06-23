'use server';

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

import { db } from "@/lib/db";
import bcrypt from 'bcrypt'
import { getUserByEmail } from "@/data/user";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = await RegisterSchema.safeParse(values)
    if(!validatedFields.success) {
        return {error: "Invalid fields!"}
    }

    const {email, password, name} = validatedFields.data;

    const userExists = await getUserByEmail(email)

    if(userExists) {
        return {error: "Email already in use."}
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    await db.user.create({
        data: {
            name, 
            email, 
            password: hashedPassword
        }
    })
    return { success: "User Created!"}
}