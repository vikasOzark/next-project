import prismaInstance from "@/lib/dbController";
import {
    ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function POST(request) {
    const requestBody = await request.json();
    try {
        const userObject = await getUserId(true);

        if (!userObject) {
            return ErrorResponse({ message: "Not authorized." }, httpStatus.HTTP_403_FORBIDDEN)
        }

        const hashedSecret = await bcrypt.hash(
            requestBody.access_token,
            process.env.SALT
        );

        const data = await prisma.integrations.create({
            data: {
                providerName: await INTEGRATION_PROVIDER[requestBody.provider],
                isActive: true,
                webhookurl: requestBody.webhookUrl,
                webhookSecret: requestBody.webhook_secret,
                uniqueCompanyId: userObject.userData.uniqueCompanyId,
                secrets: { access_token: hashedSecret },
                createdBy: {
                    connect: {
                        id: userObject.userData.id
                    }
                }
            }
        })
        return SuccessResponseHandler(data, `${body.provider} connection created successfully.`)
    } catch (error) {
        return ErrorResponse({ error })
    }
}
