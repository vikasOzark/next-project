import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Role } from "@prisma/client";

export async function DELETE(request, context) {
  try {
    const { params } = context;
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance
    const userId = getUserId();

    if (!userId) {
      return ErrorResponse(
        {
          message: "You not authorized, Please try again.",
        },
        httpStatus.HTTP_401_UNAUTHORIZED
      );
    }

    const user = prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user.role !== Role.Admin && user.isSuperuser) {
      return ErrorResponse(
        {
          message: "Your dont have admin permission to delete the department.",
        },
        httpStatus.HTTP_401_UNAUTHORIZED
      );
    }

    ;
    await prisma.department.delete({
      where: {
        id: params.departmentId,
        createdById: user.id,
      },
    });

    return SuccessResponseHandler([], "Successfully department is deleted.");
  } catch (error) {

    return ErrorResponse({
      message: "Something bad happened, Please try again.",
    });
  }
}

export async function GET(request, context) {
  try {
    const { departmentId } = context.params;
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance;
    ;
    const departmentData = await prisma.department.findFirst({
      where: {
        id: departmentId,
      },
    });

    return SuccessResponseHandler(departmentData);
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
