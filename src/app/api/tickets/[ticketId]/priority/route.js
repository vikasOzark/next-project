import prismaInstance from "@/lib/dbController";
import { PrismaClient } from "@prisma/client";

export async function POST() {
    try {
        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance;
    } catch (error) {

    }
}