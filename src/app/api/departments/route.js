import { NextResponse, NextRequest } from "next/server";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import httpStatus from "@/utils/httpStatus";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const userObjectId = await getUserId(request);
    await prisma.$connect();
    const departmentList = await prisma.department.findMany({
      where: {
        userId: userObjectId,
      },
    });

    return NextResponse.json(
      {
        message: "Successfully get the department data.",
        success: true,
        data: departmentList,
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal server error, Please try again.",
        success: false,
        data: [],
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(request) {
  const requestBody = await request.json();
  try {
    if (!requestBody.department) {
      throw new Error("Name should not be empty.");
    }
    prisma.$connect();
    const userObjectId = await getUserId(request);

    await prisma.department.create({
      data: {
        name: requestBody.department,
        createdById: {
          connect: {
            id: userObjectId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Department is created successfully",
        success: true,
        data: {},
      },
      { status: httpStatus.HTTP_201_CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
        data: {},
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}
