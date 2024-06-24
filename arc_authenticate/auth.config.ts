import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from 'bcryptjs'

export default { providers: [
    Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials)
          if(validatedFields.success){
            const {email, password} = validatedFields.data;

            const userExists = await getUserByEmail(email)
            if(!userExists || !userExists.password ){ // password would'nt exist if user logs in through google OAuth or GitHub
                return null;
            }
            const isPasswordCorrect = await bcrypt.compare(password, userExists.password)
            if(isPasswordCorrect){
                return userExists;
            }
        }
        return null;
        }
      })
] } satisfies NextAuthConfig