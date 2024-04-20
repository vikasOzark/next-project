import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userId = await getUserId();

    if (!userId) {
      throw new Error("self: Please re-login, and try again.");
    }

    // const users = getMentionedUser(requestBody.ticketDetil)
    // console.log(users);

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

  const sortByTitle = request.nextUrl.searchParams.get("sort");
  const orderCreated = request.nextUrl.searchParams.get("order");
  const filterByStatus = request.nextUrl.searchParams.get("status");
  const queryTicketTitle = request.nextUrl.searchParams.get("q");
  const page = request.nextUrl.searchParams.get("page");

  const size = 10
  const skip = (Number(page) - 1) * size

  try {
    const userObjectId = await getUserId(true);

    const filtering = {
      createdById: {
        uniqueCompanyId: userObjectId.uniqueCompanyId,
      },
    };

    if (queryTicketTitle) {
      filtering.taskTitle = {
        contains: queryTicketTitle,
      };
    }

    if (filterByStatus) {
      filtering.status = Status[filterByStatus];
    }

    const order_filters = []
    if (sortByTitle) {
      order_filters.push({ taskTitle: sortByTitle })
    }

    if (orderCreated) {
      order_filters.push({ createdAt: orderCreated })
    }

    const ticketsData = await prisma.tickets.findMany({
      where: filtering,
      take: size,
      skip: skip,
      include: {
        department: true,
        tags: true,
        _count: {
          select: {
            mergedTicket: true,
          },
        },
      },

      orderBy: order_filters,
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
    return ErrorResponse({
      error: error,
      message: "Something went wrong, Please try again.",
    });
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
