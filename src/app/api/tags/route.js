import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";
import { NextResponse } from "next/server";
/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userObjectId = await getUserId();
    ;

    if (!requestBody.color) {
      return ErrorResponse({
        message: "Color is required.",
      });
    }

    const tagsData = await prisma.tags.create({
      data: {
        title: requestBody.title,
        color: requestBody.color,
        createdById: {
          connect: {
            id: userObjectId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Successfully created tags .",
        success: true,
        data: tagsData,
      },
      { status: httpStatus.HTTP_201_CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error, Please try again." + error.message,
        success: false,
        data: [],
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function GET(request) {
  try {
    const userObject = await getUserId(true);
    ;

    const tagsData = await prisma.tags.findMany({
      where: {
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
      },
    });

    return NextResponse.json(
      {
        message: "Successfully get the tags data.",
        success: true,
        data: tagsData,
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
