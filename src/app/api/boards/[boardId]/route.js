import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function DELETE(request, context) {
    const prismaClient = new PrismaClient()
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
        console.log(error.message);
        return ErrorResponse({ error: error })
    } finally {
        prismaClient.$disconnect()
    }
}