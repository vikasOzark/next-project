import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const userObjectId = await getUserId(request);
    prisma.$connect();

    const tagsData = await prisma.tags.create({
      data: {
        title : "testing",
        createdById : {
            connect : {
                userObjectId
            }
        }
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



export async function GET(request) {
  try {
    const userObjectId = await getUserId(request);
    prisma.$connect();

    const tagsData = await prisma.tags.findMany({
      where: {
        userId: userObjectId,
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
