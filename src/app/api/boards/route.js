import ErrorResponseHandler, { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function POST(request) {
    const prismaClient = new PrismaClient()
    const response = await request.json()
    const userObject = await getUserId();
    try {
        const taskBoard = await prismaClient.board.create({
            data: {
                boardTitle: response.boardTitle,
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
        console.log(response);
        return SuccessResponseHandler(taskBoard, "Created successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    } finally {
        prismaClient.$disconnect()
    }
}