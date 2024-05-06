import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * @param {NextRequest} request 
 * @param {import("next").NextPageContext} context 
 */
export async function GET(request, context) {
    try {
        /**
         * @type {PrismaClient}
         */
        const prisma = PrismaClient()
        const ticket = await prisma.tickets
    } catch (error) {

    }
}