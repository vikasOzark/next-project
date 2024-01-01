import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const handleUpdateUser = async (targetUser, parentUserId, data = {}) => {
  await prisma.$connect();
  const userDataEnabled = await prisma.user.update({
    where: {
      id: targetUser,
      parentUserId: parentUserId,
    },
    data: data,
  });
  // console.log(userDataEnabled);
  return userDataEnabled;
};

export const handleUserAlter = async (body, userData, targetUser, userId) => {
  if (!userData) {
    return ErrorResponse(
      { message: "You are not authorized, Please login again." },
      httpStatus.HTTP_401_UNAUTHORIZED
    );
  }
  // console.log("passes the ............");
  const isUser = await bcrypt.compare(body.password, userData.password);
  // console.log(isUser);

  if (!isUser) {
    return ErrorResponse(
      { message: "Password is incorrect. Please try again." },
      httpStatus.HTTP_400_BAD_REQUEST
    );
  }

  // console.log(isUser);

  if (userData.role !== Role.Admin) {
    return ErrorResponse(
      { message: "You don't have valid authorization to alter user." },
      httpStatus.HTTP_400_BAD_REQUEST
    );
  }

  // console.log("user passes adming check");

  const userDataAlter = await handleUpdateUser(targetUser, userId, {
    role: Role[body.role],
  });

  // console.log(userDataAlter);

  return SuccessResponseHandler(
    userDataAlter,
    `User's role has been updated to ${body.role} successfully.`,
    httpStatus.HTTP_202_ACCEPTED
  );
};

// class UserOperation {
//   constructor (body, userData, targetUser, userId) {
//     this.body = body;
//     this.userData = userData;
//     this.targetUser = targetUser;
//     this.userId = userId;
//     this.prisma = new PrismaClient();
//   }

//   isAuthorized () {

//     return true
//   }
// }
