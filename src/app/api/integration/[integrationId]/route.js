import { gitlabUpdateValidator } from "@/app/validators/IntegrationValidator";
import prismaInstance from "@/lib/dbController";
import {
    ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient } from "@prisma/client";

export async function PATCH(request, { params }) {
    const { integrationId } = params
    try {
        const requestBody = await request.json();
        const validator = gitlabUpdateValidator.safeParse(requestBody)

        if (!validator.success) {
            return ErrorResponse({ errors: validator.error.issues })
        }

        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance

        await prisma.integrations.update({
            where: {
                id: integrationId
            },
            data: {
                isActive: requestBody.active,
                config_json: requestBody
            }
        })

        return SuccessResponseHandler(null, "Integration is configuration is updated.")
    } catch (error) {
        return ErrorResponse({ error })
    }
}

