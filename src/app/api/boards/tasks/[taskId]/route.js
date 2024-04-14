import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function DELETE(request, context) {
    /**
     * @type {PrismaClient}
     */
    const prismaClient = prismaInstance

    try {
        const { params } = context
        const userObject = await getUserId();
        await prismaClient.tasks.delete({
            where: {
                id: params.taskId,
                AND: {
                    userId: userObject
                }
            }
        })
        return SuccessResponseHandler([], "Boards has been delete successfully.")
    } catch (error) {
        return ErrorResponse({ error: error })
    }
}