import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";
/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function PATCH(request, context) {
  const { params } = context;
  const requestBody = await request.json();

  try {
    ;
    const userObject = getUserId(true);

    const appendedTickets = await prisma.tickets.update({
      where: {
        id: params.mergeTicketId,
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
      },
      data: {
        mergedTicket: {
          connect: requestBody.ticketsIds?.map((ticketId) => ({
            id: ticketId,
          })),
        },
      },
    });

    return SuccessResponseHandler(
      [],
      "Appended tickets into the merge ticket."
    );
  } catch (error) {

    return ErrorResponse({ error: error });
  }
}
