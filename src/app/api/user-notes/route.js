import ErrorResponseHandler, { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function POST(request) {
    const requestBody = await request.json();
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    try {
        const userId = await getUserId();


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
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    try {
        const userObject = await getUserId(true);
        ;

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