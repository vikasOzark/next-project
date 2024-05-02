import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient, TICKET_CREATOR_TYPE } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * @param {NextRequest} request 
 * @returns 
 */
export async function POST(request, context) {
    const { params } = context
    const { companyId, departmentId } = params
    try {

        /**
         * @type {PrismaClient}
         */
        const prisma = prismaInstance

        const headers = await request.headers
        const body = await request.json()
        const { title, description } = body.object_attributes

        const webhook_secret = headers.get("X-Gitlab-Token")

        const gitlabConnection = await prisma.integrations.findFirst({
            where: {
                webhookSecret: webhook_secret
            }
        })

        if (!gitlabConnection || !webhook_secret) {
            return ErrorResponse({
                message: "Webhook url is broken or X-Gitlab-Token is missing, Please re-configure gitlab connection"
            }, httpStatus.HTTP_404_NOT_FOUND)
        }

        await prisma.tickets.create({
            data: {
                department: {
                    connect: {
                        id: departmentId
                    },
                },
                createdById: {
                    connect: {
                        id: gitlabConnection.userId
                    }
                },
                webhook_body: body,
                creator_type: TICKET_CREATOR_TYPE.GITLAB,
                taskTitle: title,
                ticketDetil: description,
                uniqueCompanyId: companyId
            }
        })
        return SuccessResponseHandler(null, "Created")
    } catch (error) {
        console.log(error.message);
        return ErrorResponse({ error })
    }
} 