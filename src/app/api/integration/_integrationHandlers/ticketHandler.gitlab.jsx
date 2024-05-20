import { Status, TICKET_CREATOR_TYPE } from "@prisma/client";
import createWorkPackage from "./createWorkPackage";

export const kind = {
    ISSUE: "issue",
    MERGE: "merge_request",
};

export const STATE = {
    MERGED: "merged",
    OPENED: "opened",
};

export const ACTION = {
    OPEN: "open",
    UPDATE: "update",
    CLOSE: "close",
};

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export const createTicket = async (body, params, { userId }) => {
    const { title, description, iid, created_at } = body.object_attributes;
    const { companyId, departmentId } = params;

    const isAvailable = await prisma.tickets.findFirst({
        where: {
            webhook_event_id: iid.toString(),
        },
    });

    if (isAvailable) {
        return;
    }

    const gitlabConnection = await prisma.integrations.findFirst({
        where: {
            webhookSecret: webhook_secret,
        },
    });

    await prisma.tickets.create({
        data: {
            department: {
                connect: {
                    id: departmentId,
                },
            },
            createdById: {
                connect: {
                    id: userId,
                },
            },
            webhook_body: body,
            creator_type: TICKET_CREATOR_TYPE.GITLAB,
            taskTitle: title,
            ticketDetil: description,
            uniqueCompanyId: companyId,
            webhook_event_id: iid.toString(),
            createdAt: new Date(created_at).toISOString(),
        },
    });

    createWorkPackage();
    return;
};

export const updateStatus = async ({ object_attributes }, params) => {
    const { source_branch, state } = object_attributes;
    const { companyId, departmentId } = params;

    const issueId = source_branch.match(/\d+/)[0];
    if (state === STATE.MERGED) {
        return await prisma.tickets.update({
            where: {
                webhook_event_id: issueId,
                AND: {
                    uniqueCompanyId: companyId,
                    departmentId: departmentId,
                },
            },
            data: {
                status: Status.CLOSE,
            },
        });
    }
};
