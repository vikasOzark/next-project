import ErrorResponseHandler from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import NextResponse from "next/server";
const prisma = await new PrismaClient();

export async function GET(request, context) {
  try {
    await prisma.$connect();
    const { params } = context;

    const userObjectId = await getUserId(request);
    const ticket = await prisma.tickets.findFirst({
      where: {
        id: params?.ticketId,
      },

      include: {
        department: true,
        tags: true,
        createdById: true,
        where: userObjectId,
      },
    });

    return SuccessResponseHandler(ticket, "Ticket data fetched.");
  } catch (error) {
    return ErrorResponseHandler(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request, context) {
  try {
    const { params } = context;
    const { status } = await request.json();
    await prisma.$connect();
    const data = await prisma.tickets.update({
      where: {
        userId: getUserId(request),
        id: params?.ticketId,
      },
      data: {
        status: Status[status],
      },
    });

    return SuccessResponseHandler(
      data,
      "Successfully ticket status is updated.",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    return ErrorResponseHandler(error);
  }
}

export async function DELETE(request, context) {
  const { params } = context;
  await prisma.$connect();

  try {
    const userId = await getUserId(request);
    await prisma.tickets.delete({
      where: {
        userId: userId,
        id: params.ticketId,
      },
    });

    return SuccessResponseHandler(
      [],
      "Tickets is deleted",
      httpStatus.HTTP_204_NO_CONTENT
    );
  } catch (error) {
    return ErrorResponseHandler(error);
  }
}

export async function PATCH(request, context) {
  const { params } = context;

  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  const prisma = await new PrismaClient();
  prisma.$connect();

  try {
    switch (query.operationTo.toUpperCase()) {
      case "TAG":
        await handleTagRemove(request, query, params);
        break;
      default:
        break;
    }

    return NextResponse.json(
      {
        message: "Successfully tag is removed.",
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return ErrorResponseHandler(error);
  }
}

const handleTagRemove = async (request, query, params) => {
  const userId = await getUserId(request);
  if (!userId) {
    throw new Error("self: Please re-login and try again.");
  }

  if (!query.tagId) {
    throw new Error("self: Something went wrong, Please try again.");
  }

  const prisma = await new PrismaClient();
  prisma.$connect();

  await prisma.tickets.update({
    where: {
      id: params?.ticketId,
    },
    data: {
      tags: {
        disconnect: {
          id: query.tagId,
        },
      },
    },
  });
};
