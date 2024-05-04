import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient, Status, TICKET_CREATOR_TYPE } from "@prisma/client";
import { NextRequest } from "next/server";

const kind = {
    ISSUE: "issue",
    MERGE: "merge_request"
}

const event_issue_state = {
    MERGED: "merged"
}

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
            return SuccessResponseHandler(null, "failed to create, client side has disabled the service.", httpStatus.HTTP_202_ACCEPTED)
        }

        const { event_type } = body
        if (gitlabConnection.config_json.issue_event && event_type === kind.ISSUE) {
            await createTicket(body, params, gitlabConnection)
        }

        if (gitlabConnection.config_json.merge_event && event_type === kind.MERGE) {
            await updateStatus(body, params)
        }

        return SuccessResponseHandler(null, "Created")
    } catch (error) {
        console.log(error.message);
        return ErrorResponse({ error })
    }
}

const createTicket = async (body, params, { userId }) => {
    const { title, description, iid, created_at } = body.object_attributes
    const { companyId, departmentId } = params

    console.log(iid);
    const isAvailable = await prisma.tickets.findFirst({
        where: {
            webhook_event_id: iid.toString()
        }
    })

    if (isAvailable) {
        return
    }

    return await prisma.tickets.create({
        data: {
            department: {
                connect: {
                    id: departmentId
                },
            },
            createdById: {
                connect: {
                    id: userId
                }
            },
            webhook_body: body,
            creator_type: TICKET_CREATOR_TYPE.GITLAB,
            taskTitle: title,
            ticketDetil: description,
            uniqueCompanyId: companyId,
            webhook_event_id: iid.toString(),
            createdAt: new Date(created_at).toISOString()
        }
    })

}

const updateStatus = async ({ object_attributes }, params) => {
    const { source_branch, state } = object_attributes
    const { companyId, departmentId } = params

    const issueId = source_branch.match(/\d+/)[0]
    if (state === event_issue_state.MERGED) {
        return await prisma.tickets.update({
            where: {
                webhook_event_id: issueId,
                AND: {
                    uniqueCompanyId: companyId,
                    departmentId: departmentId
                }
            },
            data: {
                status: Status.CLOSE
            }
        })
    }

}