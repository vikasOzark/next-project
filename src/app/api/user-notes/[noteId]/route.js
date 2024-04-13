import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function DELETE(request, context) {
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    const { params } = context;
    try {
        const userObjectId = await getUserId();
        await prisma.$connect();

        await prisma.userNotes.delete({
            where: {
                id: params.noteId,
                AND: {
                    userId: userObjectId
                }
            }
        })
        return SuccessResponseHandler()
    } catch (error) {
        return ErrorResponse({ error });
    }
}

export async function GET(request, context) {
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    const { params } = context;
    try {
        const userObjectId = await getUserId();
        await prisma.$connect();

        const note = await prisma.userNotes.findFirst({
            where: {
                id: params.noteId,
                AND: {
                    userId: userObjectId
                }
            }
        })
        return SuccessResponseHandler(note)
    } catch (error) {
        return ErrorResponse({ error });
    }
}

export async function PATCH(request, context) {
    const response = await request.json()
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    const { params } = context;
    try {
        const userObjectId = await getUserId();
        await prisma.$connect();
        const updatedNote = await prisma.userNotes.update({
            where: {
                id: params.noteId,
                AND: {
                    userId: userObjectId
                }
            },
            data: response
        })

        return SuccessResponseHandler(updatedNote)
    } catch (error) {
        return ErrorResponse({ error });
    }
}