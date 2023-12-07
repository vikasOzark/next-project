import ErrorResponseHandler from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userId = await getUserId(request);
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
    const errorMessage = error.message.split(":");

    let message = null;
    if (errorMessage[0] === "self") {
      message = errorMessage[1];
    } else {
      message = "Something went wrong. Please try again.";
    }

    return NextResponse.json({
      success: false,
      message: message,
      data: [],
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request) {
  try {
    const userObjectId = await getUserId(request);
    await prisma.$connect();

    const ticketsData = await prisma.tickets.findMany({
      where: {
        userId: userObjectId,
      },

      include: {
        department: true,
        tags: true,
        where: userObjectId,
      },
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
    return ErrorResponseHandler(error);
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
      message: "Ticket is created successfully.",
      data: [createdTicket],
    });
  } catch (error) {
    console.log(error.message);
    const errorMessage = error.message.split(":");

    let message = null;
    if (errorMessage[0] === "self") {
      message = errorMessage[1];
    } else {
      message = "Something went wrong.";
    }

    return NextResponse.json({
      success: false,
      message: message,
      data: [],
    });
  } finally {
    await prisma.$disconnect();
  }
}
