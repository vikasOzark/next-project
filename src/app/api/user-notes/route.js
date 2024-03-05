import ErrorResponseHandler, { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
    const requestBody = await request.json();
    const prisma = new PrismaClient()
    try {
        const userId = await getUserId();

        prisma.$connect()
        if (!userId) {
            throw new Error("self: Please re-login, and try again.");
        }

        const createdNote = await prisma.userNotes.create({
            data: {
                title: requestBody.title,
                userId: userId
            },
        });

        return SuccessResponseHandler(
            createdNote,
            "Successfully note created."
        );
    } catch (error) {
        return ErrorResponse({ error });
    }
}

export async function GET(request) {
    const prisma = new PrismaClient()
    try {
        const userObject = await getUserId(true);
        await prisma.$connect();

        const userNotes = await prisma.userNotes.findMany({
            where: {
                userId: userObject.userId
            }
        })
        return SuccessResponseHandler(
            userNotes
        )
    } catch (error) {
        return ErrorResponse({ error });
    }
}