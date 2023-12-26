import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId, { getTokenNew } from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";
import { provideFilter } from "./ticketFilter.provider";

const prisma = new PrismaClient();

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("self: Please re-login, and try again.");
    }

    const createdTicket = await prisma.tickets.create({
      data: {
        taskTitle: requestBody.taskTitle,
        ticketDetil: requestBody.ticketDetil,
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
          connect: requestBody.tags?.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ticket is created successfully.",
      data: [createdTicket],
    });
  } catch (error) {
    return ErrorResponseHandler(error);
  }
}

export async function GET(request) {
  try {
    const userObjectId = await getUserId(true);
    await prisma.$connect();

    const ticketsData = await prisma.tickets.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObjectId.userObjectId,
        },
      },

      include: {
        department: true,
        tags: true,
        _count: {
          select: {
            mergedTicket: true,
          },
        },
      },

      orderBy: provideFilter(request),
    });

    return NextResponse.json(
      {
        message: "Successfully get the tickets data.",
        success: true,
        data: ticketsData,
        ticketStatus: Status,
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    console.log(error.message);
    return ErrorResponse({
      error: error,
      message: "Something went wrong, Please try again.",
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request) {
  const requestBody = await request.json();

  try {
    const createdTicket = await prisma.tickets.update({
      where: {
        id: requestBody?.ticketId,
      },
      data: {
        taskTitle: requestBody.taskTitle,
        ticketDetil: requestBody.ticketDetil,
        department: {
          connect: {
            id: requestBody.department,
          },
        },
        tags: {
          connect: requestBody.tags?.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ticket is updated successfully.",
      data: [createdTicket],
    });
  } catch (error) {
    return ErrorResponse({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
