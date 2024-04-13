import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;
export async function GET(request, context) {
  const { params } = context;

  try {
    const userObjectId = await getUserId(true);
    await prisma.$connect();

    const tagsData = await prisma.tags.findMany({
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
        message: "Successfully get the tags data.",
        success: true,
        data: tagsData,
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return ErrorResponse({
      error: error,
    });
  } finally {
    await prisma.$disconnect();
  }
}
