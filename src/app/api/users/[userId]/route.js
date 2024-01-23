import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Role } from "@prisma/client";
import { handleUpdateUser, handleUserAlter } from "./apiHelper";
import exclude from "@/lib/exclude";

const prisma = new PrismaClient();

export async function PATCH(request, context) {
  const userId = await getUserId();
  const { params } = context;
  const targetUser = params.userId;
  const body = await request.json();
  await prisma.$connect();

  try {
    if (!userId) {
      return ErrorResponse(
        { message: "User session expired, Please login." },
        httpStatus.HTTP_401_UNAUTHORIZED
      );
    }

    const isAdmin = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      return ErrorResponse(
        { message: "Invalid user credentials." },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    if (isAdmin.role !== Role.Admin) {
      return ErrorResponse(
        { message: "You don't have valid permission." },
        httpStatus.HTTP_401_UNAUTHORIZED
      );
    }

    switch (body.OPERATION_TYPE.toUpperCase()) {
      case "DISABLE_USER":
        const userDataDisabled = await handleUpdateUser(targetUser, userId, {
          isDisabled: true,
        });

        return SuccessResponseHandler(
          userDataDisabled,
          "User has been disabled successfully.",
          httpStatus.HTTP_202_ACCEPTED
        );

      case "ENABLE_USER":
        const userDataEnabled = await handleUpdateUser(targetUser, userId, {
          isDisabled: false,
        });

        return SuccessResponseHandler(
          userDataEnabled,
          "User has been enabled successfully/",
          httpStatus.HTTP_202_ACCEPTED
        );

      case "ALTER_ROLE":
        const userData = isAdmin;
        return await handleUserAlter(body, userData, targetUser, userId);
    }
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}

export async function GET(request, context) {
  try {
    const { userId } = context.params;
    await prisma.$connect();
    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const filteredUserData = exclude(userData, ["password"]);

    return SuccessResponseHandler(filteredUserData);
  } catch (error) {
    console.log(error.message);
    return ErrorResponse({ error: error });
  }
}
