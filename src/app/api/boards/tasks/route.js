import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
    const response = await request.json()
    const userId = await getUserId();

    /**
     * @type {PrismaClient}
     */
    const prisma = prismaInstance

    try {
        const taskBoard = await prisma.tasks.create({
            data: {
                taskTitle: response.taskTitle,
                User: {
                    connect: {
                        id: userId
                    }
                },
                originBoard: {
                    connect: {
                        id: response.boardId
                    }
                }
            },
        })
        return SuccessResponseHandler(taskBoard, "task has been added.")
    } catch (error) {
        return ErrorResponse({ error: error })
    } finally {
        // prismaClient.$disconnect()
    }
}