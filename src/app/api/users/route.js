import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    await prisma.$connect();
console.log(requestBody);
  //   {
  //   first_name: 'testing',
  //   last_name: 'testi',
  //   contact_number: '1234567890',
  //   email: 'vk4041604@gmail.com',
  //   password: '123',
  //   userType: 'User',
  //   department: '653cfaf885741601a05f2b0a'
  // }

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
          parent : {
            connect : {
              id : userId
            }
          }
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
    console.log(error.message);
    const errorMessage = error.message.split(":")
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
