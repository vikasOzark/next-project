import ErrorResponseHandler from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { test } from "../../../../backend/env/lib/python3.11/site-packages/django/contrib/admin/static/admin/js/vendor/xregexp/xregexp";
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    await prisma.$connect();

    const bcrypt = require("bcrypt");
    const saltRounds = 10;

    if (!requestBody.password) {
      throw new Error("Password should not be empty.");
    }

    const isAvailable = await prisma.user.findFirst({
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

    if (!isAvailable) {
      const hashedPassword = await bcrypt.hash(
        requestBody.password,
        saltRounds
      );
      requestBody.password = hashedPassword;

      const userId = await getUserId(request);
      const user = await prisma.user.create({
        data: {
          ...requestBody,
          parent: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "User created successfully.",
        data: [],
      });
    } else {
      throw new Error("self: Your Email or Contact number is already exists.");
    }
  } catch (error) {
     
    const errorMessage = error.message.split(":");
    let message = null;
    if (errorMessage[0] === "self") {
      message = errorMessage[1];
    } else {
      message = "Something went wrong, Please try again.";
    }

    return NextResponse.json({
      success: false,
      message: message,
      data: [],
    });
  }
}

export async function GET(request) {
  try {
    await prisma.$connect();
    const userId = await getUserId(request);
    const userList = await prisma.user.findMany({
      where: {
        parentUserId: userId,
      },
      include: {
        parent: true,
      },
    });
     
    return SuccessResponseHandler(userList);
  } catch (error) {
    return ErrorResponseHandler(error);
  } finally {
    await prisma.$disconnect();
  }
}
