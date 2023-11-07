import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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

      console.log(requestBody);

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
    let message = null;
    if (error.message.split(":")[0] === "self") {
      message = error.message;
    } else {
      message = "Something went wrong.";
    }

    return NextResponse.json({
      success: false,
      message: message,
      data: [],
    });
  }
}

export async function GET(request) {
  await prisma.$connect();

  try {
    const userId = await getUserId();
    const userList = await prisma.user.findMany({
      where: {},
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error?.message || "Something went wrong, Please chck the details.",
      data: [],
    });
  } finally {
    await prisma.$disconnect();
  }
}
