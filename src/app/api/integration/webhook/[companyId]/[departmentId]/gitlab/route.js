import { ACTION, createTicket, kind, updateStatus } from "@/app/api/integration/_integrationHandlers/ticketHandler.gitlab";
import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient, Status, TICKET_CREATOR_TYPE } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance

/**
 * @param {NextRequest} request 
 * @returns 
 */
export async function POST(request, { params }) {
    try {
        const headers = await request.headers
        const body = await request.json()
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

        if (!gitlabConnection.isActive) {
            return SuccessResponseHandler(
                null,
                "failed to create, client side has disabled the service.",
                httpStatus.HTTP_202_ACCEPTED
            )
        }

        const { event_type, object_attributes } = body

        if (
            gitlabConnection.config_json.issue_event &&
            event_type === kind.ISSUE &&
            ACTION.OPEN === object_attributes.action
        ) {
            await createTicket(body, params, gitlabConnection)
        }

        if (
            gitlabConnection.config_json.merge_event &&
            event_type === kind.MERGE) {
            await updateStatus(body, params)
        }

        return SuccessResponseHandler(null, "Created")
    } catch (error) {
        console.log(error.message);
        return ErrorResponse({ error })
    }
}
