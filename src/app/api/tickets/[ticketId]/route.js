import ErrorResponseHandler from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import NextResponse from "next/server"

export async function POST(request, context) {
  const { params } = context;
  const { status } = await request.json();

  const prisma = await new PrismaClient();
  prisma.$connect();

  await prisma.tickets.update({
    where: {
      userId: getUserId(request),
      id: params.ticketId,
    },
    data: {
      status: Status[status],
    },
  });

  try {
    return NextResponse.json(
      {
        message: `Successfully task status is updated to ${status}`,
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return ErrorResponseHandler(error)
  }
}

export async function DELETE(request, context) {
  const { params } = context;

  const prisma = await new PrismaClient();
  prisma.$connect();

  const userId = await getUserId(request);
  await prisma.tickets.delete({
    where: {
      userId: userId,
      id: params.ticketId,
    },
  });

  try {
    return NextResponse.json(
      {
        message: "Successfully ticket is deleted.",
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return ErrorResponseHandler(error)
  }
}

export async function PATCH(request, context) {
  const { params } = context;

  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  const prisma = await new PrismaClient();
  prisma.$connect();

  try {
    switch (query.operationTo) {
      case "tag":
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
   return ErrorResponseHandler(error)
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
      id: params.ticketId,
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
