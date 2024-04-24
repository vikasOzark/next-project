import {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import {
  ParentTicketStatusHandler,
  handleTagRemove,
  handleUserAssignment,
  handleUserUnassign,
  updateMergeTicketStatus,
} from "./apiHelper";
import prismaInstance from "@/lib/dbController";
/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function GET(request, context) {
  try {
    ;
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
    return ErrorResponse({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request, context) {
  try {
    const { params } = context;
    const { status } = await request.json();

    /**
     * This block checks if current ticket has any child tickets and child tickets are closed or not.
     * @returns This method returns true is all the child tickets status `CLOSED` else false
     */
    if (Status[status] === Status.CLOSE) {
      const isMergedAllow = await updateMergeTicketStatus(
        request,
        params
      );
      if (!isMergedAllow?.allowStatusUpdate) {
        return ErrorResponse({
          message:
            "Child ticket are not closed yet, Please close them first.",
        });
      }
    }

    ;
    const data = await prisma.tickets.update({
      where: {
        userId: getUserId(),
        id: params?.ticketId,
      },
      data: {
        status: Status[status],
      },
    });

    const mergedTicketOperation = new ParentTicketStatusHandler(
      Status[status],
      data
    );
    await mergedTicketOperation.init();

    return SuccessResponseHandler(
      data,
      "Successfully ticket status is updated.",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    return ErrorResponse({ error });
  }
}

export async function DELETE(request, context) {
  const { params } = context;
  ;

  try {
    const userObjectId = await getUserId(true);

    await prisma.tickets.delete({
      where: {
        id: params.ticketId,
        createdById: {
          uniqueCompanyId: userObjectId.userObjectId,
        },
      },
    });
    return SuccessResponseHandler(
      [],
      "Tickets is deleted",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    return ErrorResponse({ error });
  }
}

export async function PATCH(request, context) {
  const { params } = context;

  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams);

  /**
   * @type {PrismaClient}
   */
  const prisma = prismaInstance;

  try {
    switch (query.operationTo.toUpperCase()) {
      case "TAG":
        return await handleTagRemove(request, query, params);

      case "USER_ASSIGNMENT":
        return await handleUserAssignment(request, query, params);

      case "USER_UNASSIGN":
        return await handleUserUnassign(request, query, params);

      default:
        return ErrorResponse(
          { message: "Did't matched any any operation type." },
          httpStatus.HTTP_400_BAD_REQUEST
        );
    }
  } catch (error) {
    return ErrorResponse(
      {
        message: "Something bad happened, Please try again.",
      },
      httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
}
