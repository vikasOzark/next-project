import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    await prisma.$connect();
    const userObject = await getUserId(true);

    const ticketsList = await prisma.tickets.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
        isMerged: false,
      },
    });

    return SuccessResponseHandler(
      ticketsList,
      "Ticket list fetched successfully.",
      httpStatus.HTTP_200_OK
    );
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
