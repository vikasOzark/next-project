import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function PATCH(request, context) {
  try {
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance;
    const { mergeTicketId } = context.params;
    const userObject = await getUserId(true);
    const requestBody = await request.json();

    ;
    await prisma.tickets.update({
      where: {
        id: mergeTicketId,
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
      },
      data: {
        mergedTicket: {
          disconnect: { id: requestBody.ticketId },
        },
      },
    });

    return SuccessResponseHandler(
      [],
      "Successfully remove merged ticket.",
      httpStatus.HTTP_200_OK
    );
  } catch (error) {

    return ErrorResponse({ error: error });
  }
}
