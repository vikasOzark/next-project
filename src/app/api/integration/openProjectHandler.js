import prismaInstance from "@/lib/dbController";
import { INTEGRATION_PROVIDER, PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt"
import getUserId from "@/utils/userByToken";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import jsonwebtoken from "jsonwebtoken"

/**
 * @param {NextRequest} request 
 */
export default async function openProjectHandler(requestBody) {
    try {
        /**
        * @type {PrismaClient}
        */
        const prisma = prismaInstance;

        const userObject = await getUserId(true);
        const openProject = await prisma.integrations.findMany({
            where: {
                providerName: INTEGRATION_PROVIDER.OPEN_PROJECT,
                AND: {
                    uniqueCompanyId: userObject.uniqueCompanyId
                }
            }
        })

        const { access_token,
            openProjectUrl, provider, projectId } = requestBody
        const hasAlready = openProject.find(integration => integration.secrets.projectId === projectId)
        if (hasAlready) {
            return ErrorResponse({ message: "Integration is already available with provided project id" })
        }

        const data = await prisma.integrations.create({
            data: {
                providerName: INTEGRATION_PROVIDER.OPEN_PROJECT,
                isActive: true,
                webhookurl: openProjectUrl,
                webhookSecret: access_token,
                uniqueCompanyId: userObject.userData.uniqueCompanyId,
                secrets: requestBody,
                createdBy: {
                    connect: {
                        id: userObject.userData.id
                    }
                }
            }
        })
        return SuccessResponseHandler(
            data,
            `${provider} connection created successfully.`
        );
    } catch (error) {
        console.log(error.message);
        return ErrorResponse({ error });

    }
}