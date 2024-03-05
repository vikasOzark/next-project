import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    await prisma.$connect();

    if (!requestBody.role) {
      return ErrorResponse(
        { message: "User role is not provided. " },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    if (isNaN(Number(requestBody.contact_number))) {
      return ErrorResponse(
        {
          message:
            "Contact number potentially contains character or special character.",
        },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    if (requestBody.contact_number.toString().length !== 10) {
      return ErrorResponse(
        { message: "Provided contact number should be 10 digit." },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    if (!requestBody.password) {
      return ErrorResponse(
        { message: "Password should not be empty." },
        httpStatus.HTTP_400_BAD_REQUEST
      );
    }

    const isAlreadyExists = await prisma.user.findFirst({
      select: {
        email: true,
        contact_number: true,
      },
      where: {
        OR: [
          { email: requestBody.email },
          { contact_number: requestBody.contact_number },
        ],
      },
    });

    if (isAlreadyExists) {
      if (isAlreadyExists.contact_number === requestBody.contact_number) {
        return ErrorResponse(
          { message: "Phone is already exists." },
          httpStatus.HTTP_400_BAD_REQUEST
        );
      }
      if (isAlreadyExists.email === requestBody.email) {
        return ErrorResponse(
          { message: "Email is already exists." },
          httpStatus.HTTP_400_BAD_REQUEST
        );
      }
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(requestBody.password, saltRounds);

    const userInfo = await getUserId(true);

    requestBody.password = hashedPassword;
    requestBody.uniqueCompanyId = userInfo.uniqueCompanyId;

    const user = await prisma.user.create({
      data: {
        ...requestBody,
        parent: {
          connect: {
            id: userInfo.userId,
          },
        },
      },
    });
    delete user.password;

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (error) {

    return ErrorResponse(
      {
        message: "Something went wrong, Please try again.",
        error: error,
      },
      httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
}

export async function GET(request) {
  try {
    await prisma.$connect();
    const userId = await getUserId(true);
    const userList = await prisma.user.findMany({
      where: {
        uniqueCompanyId: userId.uniqueCompanyId,
      },
      include: {
        parent: true,
      },
    });

    return SuccessResponseHandler(userList);
  } catch (error) {
    return ErrorResponse({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
