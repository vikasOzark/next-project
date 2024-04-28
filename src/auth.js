import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/app/schemas/login.schema";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    let user = null
                    const { email, password } = await signInSchema.parseAsync(credentials)
                    user = handleAuthentication({ email, password })

                    console.log(user);

                    if (!user) {
                        throw new Error("User not found.")
                    }

                    return user
                } catch (error) {
                    if (error instanceof ZodError) {
                        return null
                    }
                }
            },
        }),
    ],
})

export const { GET, POST } = handlers

const handleAuthentication = async (credentials) => {
    try {
        /**
     * @type {PrismaClient}
     */
        const prisma = prismaInstance;
        const userData = await prisma.user.findFirst({
            where: {
                email: credentials.email,
            },
        });

        if (!userData) {
            return null
        }

        const isUser = await bcrypt.compare(
            credentials.password,
            userData.password
        );
        if (!isUser) {
            return null
        }
        return {
            success: true,
            data: userData,
        };
    } catch (error) {
        return null
    }
};
