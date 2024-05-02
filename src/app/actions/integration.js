"use server"
import prismaInstance from "@/lib/dbController";
import getUserId from "@/utils/userByToken";
import { INTEGRATION_PROVIDER, Prisma, PrismaClient, } from "@prisma/client";
export default async function gitlabIntegrate(formData) {
    try {
        const userObject = await getUserId(true)
        if (!userObject) {
            return false
        }

        const access_token = await formData.get("access_token")
        const webhookUrl = await formData.get("webhookUrl")
        const webhook_secret = await formData.get("webhook_secret")
        const provider = await formData.get("provider")

        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance
        const data = await prisma.integrations.create({
            data: {
                providerName: await INTEGRATION_PROVIDER[provider],
                isActive: true,
                webhookurl: webhookUrl,
                webhookSecret: webhook_secret,
                uniqueCompanyId: userObject.userData.uniqueCompanyId,
                config_json: { access_token },
                createdBy: {
                    connect: {
                        id: userObject.userData.id
                    }
                }
            }
        })
        if (data) {
            return true
        }
        return false
    } catch (error) {
        console.log(error.message);
        return false
    }
}

/**
 * @returns {import("@/types/integration").IntegrationReturnType}
 */
export const getIntegrations = async (provider) => {
    try {
        const userObject = await getUserId(true)
        if (!userObject) {
            if (provider) {
                return {}
            }
            return []
        }

        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance

        if (provider) {
            return await prisma.integrations.findFirst({
                where: {
                    uniqueCompanyId: userObject.userData.uniqueCompanyId,
                    AND: {
                        providerName: INTEGRATION_PROVIDER[provider]
                    }
                }
            })
        }

        return prisma.integrations.findMany({
            where: {
                uniqueCompanyId: userObject.uniquCompanyId,
            }
        })
    } catch (error) {
        console.log(error.message);
        return false
    }
}
