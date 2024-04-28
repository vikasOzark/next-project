import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId, { getTokenNew } from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";
import prismaInstance from "@/lib/dbController";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;
export async function GET(request, context) {
  const { params } = context;

  try {
    const userObjectId = await getUserId(true);
    ;

    const ticketsData = await prisma.tickets.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObjectId.uniqueCompanyId,
          id: params.userId,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        message: "Successfully get the tickets data.",
        success: true,
        data: ticketsData,
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return ErrorResponse({
      error: error,
    });
  }
}
