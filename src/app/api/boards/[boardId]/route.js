import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function DELETE(request, context) {
    const prismaClient = prismaInstance
    const { params } = context
    const userObject = await getUserId();
    try {
        await prismaClient.tasks.deleteMany({
            where: {
                boardId: params.boardId,
                AND: {
                    userId: userObject
                }
            }
        })
        const taskBoard = await prismaClient.board.delete({
            where: {
                id: params.boardId,
                AND: {
                    userId: userObject
                }
            }
        })
        return SuccessResponseHandler(taskBoard, "Boards has been delete successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    }
}

export async function PATCH(request, context) {
    try {
        const { params } = context
        /**
         * @type {PrismaClient}
         */
        const prismaClient = prismaInstance
        const response = await request.json()

        const updatingData = {}
        if (response.boardTitle) {
            updatingData.boardTitle = response.boardTitle
        }

        if (response.boardTitle) {
            updatingData.boardColor = response.boardColor
        }

        const userObject = await getUserId();
        if (Object.keys(updatingData).length === 0) {
            throw new Error("Not a valid value.")
        }

        const taskBoard = await prismaClient.board.update({
            data: { ...response },
            where: {
                id: params.boardId,
                AND: {
                    userId: userObject
                }
            }
        })

        return SuccessResponseHandler(taskBoard, "board updated successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    }
}