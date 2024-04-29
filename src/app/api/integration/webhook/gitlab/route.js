import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import { PrismaClient } from "@prisma/client";
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
        prisma.integrations.create(

        )

    } catch (error) {
        return ErrorResponse({ error })
    }
} 