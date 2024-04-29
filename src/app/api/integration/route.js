import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import { INTERGRATION_PROVIDER, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * @param {NextRequest} request 
 * @returns 
 */
export async function POST(request) {
    try {
        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance
        const body = await request.json()

        prisma.integrations.create({
            data: {
                providerName: INTERGRATION_PROVIDER.GITLAB,

            }
        })
    } catch (error) {
        return ErrorResponse({ error })
    }
}