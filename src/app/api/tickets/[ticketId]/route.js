import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { handleTagRemove, handleUserAssignment } from "./apiHelper";
const prisma = await new PrismaClient();

export async function GET(request, context) {
  try {
    await prisma.$connect();
    const { params } = context;

    const userObjectId = await getUserId();
    const ticket = await prisma.tickets.findFirst({
      where: {
        id: params?.ticketId,
      },

      include: {
        department: true,
        tags: true,
        createdById: true,
        assingedUser: true,
        mergedTicket: true,
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
        userId: getUserId(),
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
    const userId = await getUserId();
    await prisma.tickets.delete({
      where: {
        userId: userId,
        id: params.ticketId,
      },
    });

    return SuccessResponseHandler(
      [],
      "Tickets is deleted",
      httpStatus.HTTP_202_ACCEPTED
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

      case "USER_ASSIGNMENT":
        await handleUserAssignment(request, query, params);
        break;

      case "USER_UNASSIGN":
        await handleUserUnassign(request, query, params);
        break;

      case "NOTE_ADD":
        await handleUserUnassign(request, query, params);
        break;

      default:
        break;
    }

    return SuccessResponseHandler(
      [],
      "Person is assigned successfully.",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    return ErrorResponse(
      {
        message: "Something bad happend, Please try again.",
      },
      httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
}
