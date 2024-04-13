import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";
import { verifyAdminPassword } from "@/utils/userVerify";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import bcrypt from "bcrypt";
import httpStatus from "@/utils/httpStatus";

export async function POST(request, context) {
  const { password, confirmPassword, adminPassword } = await request.json();
  try {
    if (!password || !confirmPassword || !adminPassword) {
      return ErrorResponse({ message: "All fields are required." });
    }

    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance;
    await prisma.$connect();

    const { userId } = context.params;
    const isAdminVerified = await verifyAdminPassword(adminPassword);

    if (!isAdminVerified) {
      throw 401;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return SuccessResponseHandler(
      [],
      "Password changed successfully",
      httpStatus.HTTP_200_OK
    );
  } catch (error) {
    switch (error) {
      case 400:
        return ErrorResponse(
          {
            message: "You are not authorized for this operation.",
          },
          error
        );

      case 401:
        return ErrorResponse(
          {
            message: "Admin password is wrong.",
          },
          error
        );

      case 404:
        return ErrorResponse(
          {
            message: "Something went wrong please, Login again.",
          },
          error
        );

      default:
        return ErrorResponse({ error: error });
    }
  }
}
