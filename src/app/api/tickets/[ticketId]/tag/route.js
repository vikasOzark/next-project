import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function PATCH(request, context) {
    const { params } = context;
    const body = await request.json()
    /**
     * @type {PrismaClient}
     */
    const prisma = prismaInstance

    try {
        const userId = await getUserId();
        if (!userId) {
            return ErrorResponse({ message: "Please re-login and try again." });
        }

        const ticket = await prisma.tickets.findFirst({
            where: {
                id: params?.ticketId,
                createdById: {
                    id: userId
                }
            },
        })
        const query = {}
        if (ticket.tagsId?.includes(body.tagId)) {
            query.disconnect = {
                id: body.tagId,
            }
        } else {
            query.connect = {
                id: body.tagId,
            }
        }

        await prisma.tickets.update({
            where: {
                id: params?.ticketId,
            },
            data: {
                tags: query,
            },
        });
        return SuccessResponseHandler(
            [],
            "Successfully tag removed.",
            httpStatus.HTTP_202_ACCEPTED
        );
    } catch (error) {
        return ErrorResponse({ error: error });
    }
}