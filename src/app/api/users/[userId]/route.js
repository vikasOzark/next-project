import ErrorResponseHandler, {ErrorResponse} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();

export async function PATCH(request, context) {
  const userId = await getUserId(request);
  const { params } = context;
  const targetUser = params.userId;
  const body = await request.json();
  
  if (!userId) {
    throw new Error("self: Not authorized, Please login and try again.");
  }

  const isAdmin = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!isAdmin) {
    return ErrorResponseHandler(error);
  }

  if (isAdmin.role !== Role.Admin) {
    // console.log(sdsdsd);
    // return ErrorResponse({message: "You don't have valid permission."}, httpStatus.HTTP_401_UNAUTHORIZED)
    return NextResponse.json(
      {
        message: "You don't have valid permission.",
        success: false,
        data: [],
        // error: error,
      },
      { status: httpStatus.HTTP_401_UNAUTHORIZED }
    );
  }

  try {
    switch (body.OPERATION_TYPE.toUpperCase() === "REMOVE_USER") {
      case "ADD_USER":
        break;
      case "REMOVE_USER":
        break;
      case "TAG":
        break;
    }

    prisma.$connect();

    return SuccessResponseHandler(
      [],
      "Successfully updated the user.",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    // console.log('error.message', error.message)
    return ErrorResponseHandler(error);
  }
}