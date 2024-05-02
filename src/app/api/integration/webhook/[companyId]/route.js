import prismaInstance from "@/lib/dbController"
import { ErrorResponse } from "@/utils/ErrorResponseHandler"
import SuccessResponseHandler from "@/utils/SuccessResponseHandler"
import getUserId from "@/utils/userByToken"
import { PrismaClient } from "@prisma/client"

export async function GET(request, context) {
    const { companyId } = context.params
    try {
        const userObject = await getUserId(true)
        if (!userObject) {
            return
        }

        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance
        const data = await prisma.integrations.findMany({
            where: {
                uniqueCompanyId: companyId,
                AND: {
                    userId: userObject.userId
                }
            },
            include: {
                createdBy: {
                    select: {
                        first_name: true,
                        last_name: true,
                    }
                }
            },
        })
        return SuccessResponseHandler(data, "Integration fetched successfully.")
    } catch (error) {
        return ErrorResponse({ error })
    }
}
