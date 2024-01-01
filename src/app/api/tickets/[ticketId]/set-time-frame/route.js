import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function PATCH(request, context) {
  try {
    const { params } = context;
    const requestBody = await request.json();
    const userId = await getUserId(true);
    const prisma = new PrismaClient();

    prisma.$connect();
    const ticket = await prisma.tickets.update({
      where: {
        id: params.ticketId,
        createdById: {
          uniqueCompanyId: userId.uniqueCompanyId,
        },
      },
      data: requestBody,
    });

    return SuccessResponseHandler(
      ticket,
      "Time frame added successfully.",
      httpStatus.HTTP_201_CREATED
    );
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
