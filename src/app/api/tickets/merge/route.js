import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("self: Please re-login, and try again.");
    }

    if (!requestBody?.mergingTicketIds.length) {
      return ErrorResponse(
        {
          message: "Please select at least two tickets to merge.",
        },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    const createdTicket = await prisma.tickets.create({
      data: {
        taskTitle: requestBody.taskTitle,
        ticketDetil: requestBody.ticketDetil,
        isMerged: true,
        department: {
          connect: {
            id: requestBody.department,
          },
        },
        createdById: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connect: requestBody.tags?.map((tagId) => ({ id: tagId })),
        },
        mergedTicket: {
          connect: requestBody.mergingTicketIds?.map((ticketId) => ({
            id: ticketId,
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tickets is merged successfully.",
      data: [createdTicket],
    });
  } catch (error) {
    console.log(error.message);
    return ErrorResponse({ error: error });
  }
}
