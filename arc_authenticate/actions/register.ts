'use server';

import { RegisterSchema } from "@/schemas";
import { z } from "zod";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = await RegisterSchema.safeParse(values)
    if(!validatedFields) {
        return {error: "Invalid fields!"}
    }

    return { success: "Email Sent!"}
}