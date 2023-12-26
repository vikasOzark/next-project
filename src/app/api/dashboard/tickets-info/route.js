import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const pendingData = await getTicketData(Status.PENDING);
    const closedgData = await getTicketData(Status.CLOSE);
    const rejectData = await getTicketData(Status.REJECT);
    const holdData = await getTicketData(Status.HOLD);

    return SuccessResponseHandler(
      [pendingData, closedgData, rejectData, holdData],
      "Successfully get ticket data."
    );
  } catch (error) {
    console.log(error.message);
    return ErrorResponse({ error: error });
  }
}

export const getTicketData = async function (statusType) {
  try {
    await prisma.$connect();
    const userObject = getUserId(true);
    const data = await prisma.tickets.count({
      where: {
        AND: [
          { status: statusType },
          {
            createdById: {
              uniqueCompanyId: userObject.uniqueCompanyId,
            },
          },
        ],
      },
    });
    return { count: data, type: statusType };
  } catch (error) {
    return { count: "N/A", type: statusType };
  } finally {
    await prisma.$disconnect();
  }
};
