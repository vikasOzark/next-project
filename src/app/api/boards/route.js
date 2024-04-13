import ErrorResponseHandler, { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function POST(request) {
    const prismaClient = new PrismaClient()
    const response = await request.json()
    const userObject = await getUserId();
    try {
        const taskBoard = await prismaClient.board.create({
            data: {
                boardTitle: response.boardTitle,
                boardColor: response.color,
                userId: userObject,
            }
        })
        return SuccessResponseHandler(taskBoard, "Created successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    } finally {
        prismaClient.$disconnect()
    }
}

export async function GET(request) {
    const prismaClient = new PrismaClient()
    const userObject = await getUserId();
    try {
        const taskBoard = await prismaClient.board.findMany({
            where: {
                userId: userObject
            },
            include: {
                Tasks: true
            },
        })
        return SuccessResponseHandler(taskBoard, "Boards data fetched successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    } finally {
        prismaClient.$disconnect()
    }
}

export async function PATCH(request) {
    const prismaClient = new PrismaClient()
    const response = await request.json()
    const userObject = await getUserId();
    try {
        await prismaClient.tasks.update({
            data: {
                boardId: response?.destination.droppableId
            },
            where: {
                id: response?.draggableId,
                userId: userObject
            }
        })

        return SuccessResponseHandler(taskBoard, "Created successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    } finally {
        prismaClient.$disconnect()
    }
}