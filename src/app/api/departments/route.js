import { NextResponse, NextRequest } from "next/server";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import httpStatus from "@/utils/httpStatus";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const userObject = await getUserId(true);
    await prisma.$connect();
    const departmentList = await prisma.department.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
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
    const userObject = await getUserId();

    await prisma.department.create({
      data: {
        name: requestBody.department,
        createdById: {
          connect: {
            id: userObject,
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

    return ErrorResponse(
      { message: "Something bad happened, Please try again later." },
      httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
}
