import prismaInstance from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export const handleUpdateUser = async (targetUser, parentUserId, data = {}) => {
  ;
  const userDataEnabled = await prisma.user.update({
    where: {
      id: targetUser,
      parentUserId: parentUserId,
    },
    data: data,
  });
  return userDataEnabled;
};

export const handleUserAlter = async (body, userData, targetUser, userId) => {
  if (!userData) {
    return ErrorResponse(
      { message: "You are not authorized, Please login again." },
      httpStatus.HTTP_401_UNAUTHORIZED
    );
  }
  const isUser = await bcrypt.compare(body.password, userData.password);

  if (!isUser) {
    return ErrorResponse(
      { message: "Password is incorrect. Please try again." },
      httpStatus.HTTP_400_BAD_REQUEST
    );
  }


  if (userData.role !== Role.Admin) {
    return ErrorResponse(
      { message: "You don't have valid authorization to alter user." },
      httpStatus.HTTP_400_BAD_REQUEST
    );
  }


  const userDataAlter = await handleUpdateUser(targetUser, userId, {
    role: Role[body.role],
  });


  return SuccessResponseHandler(
    userDataAlter,
    `User's role has been updated to ${body.role} successfully.`,
    httpStatus.HTTP_202_ACCEPTED
  );
};
