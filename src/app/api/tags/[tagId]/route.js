import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function DELETE(request, context) {
  const { params } = context;
  /**
 * @type {PrismaClient}
 */
  const prisma = prismaInstance;

  try {
    await prisma.$connect();
    await prisma.tags.delete({
      where: {
        id: params.tagId,
      },
    });
    return SuccessResponseHandler(
      [],
      "Tag is deleted successfully.",
      httpStatus.HTTP_200_OK
    );
  } catch (error) {
    return ErrorResponse({
      error: error,
      message: "Something unwanted happened, Please try again",
    });
  }
}
