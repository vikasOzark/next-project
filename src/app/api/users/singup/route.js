import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
import prismaInstance from "@/lib/dbController";

/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function POST(request) {
  try {
    const requestBody = await request.json();
    ;

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
      requestBody.isSuperuser = true;
      requestBody.uniqueCompanyId = v4();
      requestBody.role = Role.Admin;

      const user = await prisma.user.create({
        data: requestBody,
      });

      return NextResponse.json({
        success: true,
        message: "You signed up successfully.",
        data: user,
      });
    } else {
      throw new Error("Your Email or Contact number is already exists.");
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error?.message || "Something went wrong, Please check the details.",
      data: {},
    });
  }
}

export async function GET(request) {
  try {
    await prisma.$connect;
    const userId = await getUserId();
    const users = await prisma.user.findMany({
      where: {
        parentUserId: userId,
      },
    });
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
