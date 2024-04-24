import prismaInstance from "@/lib/dbController";
import {
    ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import NextPageContext from "next"

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

/**
 * 
 * @param {NextRequest} request 
 * @param {NextPageContext} context 
 * @returns 
 */
export async function PATCH(request, context) {
    const { params } = context
    const user = await getUserId(true)
    if (!user) {
        return ErrorResponse({ message: "Not authorized." }, httpStatus.HTTP_403_FORBIDDEN)
    }

    let requestBody;
    try {
        requestBody = await request?.json();
    } catch (error) {

        return ErrorResponse({ message: "Request body is missing." }, httpStatus.HTTP_400_BAD_REQUEST)
    }

    if (Object.keys(requestBody).length === 0) {
        return ErrorResponse({ message: "Fields are missing." }, httpStatus.HTTP_400_BAD_REQUEST)
    }

    const dataObject = {}
    if ("taskTitle" in requestBody) {
        dataObject.taskTitle = requestBody.taskTitle
    }
    if ("ticketDetil" in requestBody) {
        dataObject.ticketDetil = requestBody.ticketDetil
    }
    if ("department" in requestBody) {
        dataObject.department = {
            connect: {
                id: requestBody.department,
            }
        }
    }

    if ("status" in requestBody) {
        dataObject.status = Status[requestBody.status]
    }

    if ("tags" in requestBody && requestBody.tags?.length > 0) {
        dataObject.tags = {
            connect: requestBody.tags?.map((tag) => ({ id: tag.id })),
        }
    }

    try {
        const createdTicket = await prisma.tickets.update({
            where: {
                id: params?.ticketId,
                createdById: {
                    uniqueCompanyId: user.uniqueCompanyId
                }
            },
            data: dataObject
        });

        return NextResponse.json({
            success: true,
            message: "Ticket is updated successfully.",
            data: createdTicket,
        });
    } catch (error) {
        console.log(error.message);
        return ErrorResponse({ error: error });
    }
}