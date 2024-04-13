import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function GET() {
  try {
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance;
    await prisma.$connect();
    const userObject = await getUserId(true);

    const currentDate = new Date();

    const recentTickets = await prisma.tickets.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
        OR: [
          {
            createdAt: {
              gte: currentDate,
            },
          },
          {
            createdAt: {
              lte: currentDate,
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedTicketsData = recentTickets.map((ticket) => ({
      ...ticket,
      ["url"]: `/dashboard/tickets/${ticket.id}`,
    }));

    return SuccessResponseHandler(
      formattedTicketsData,
      "Successfully activity data is fetched.",
      httpStatus.HTTP_200_OK
    );
  } catch (error) {

    return ErrorResponse({ error: error });
  }
}
