import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";

const { NextResponse } = require("next/server");


export async function POST(request, context) {
    const { params } = context
    const {status} = await request.json()
    
    const prisma = await new PrismaClient()
    prisma.$connect() 

    await prisma.tickets.update({
      where : {
        userId : getUserId(request),
        id : params.ticketId
      },
      data : {
        status : Status[status]
      }
    })
    
  try {
    return NextResponse.json(
      {
        message: `Successfully task status is updated to ${status}`,
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Something went wrong, Please try again.",
        success: false,
        data: [],
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function DELETE(request, context) {
    const { params } = context
    
    const prisma = await new PrismaClient()
    prisma.$connect() 

    await prisma.tickets.delete({
      where : {
        userId : getUserId(request),
        id : params.ticketId
      }
    })
    
  try {
    return NextResponse.json(
      {
        message: "Successfully ticket is deleted.",
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "SOmething went wrong.",
        success: false,
        data: [],
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}

export async function PATCH(request, context) {
    const { params } = context
    
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams);
    const { operationTo } = query 
    
    try {
      const prisma = await new PrismaClient()
      prisma.$connect() 
      
      switch (operationTo) {
        case "tag":
          const tagId = query.tagId
          await prisma.tickets.update({
            where : {id : params.ticketId},
            data : {
              relatedEntity : {
                disconnect : tagId
              }
            }
        })
          
          break;
      
        default:
          break;
      }
      
    return NextResponse.json(
      {
        message: "Successfully tag removed.",
        success: true,
        data: [],
      },
      { status: httpStatus.HTTP_200_OK }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "SOmething went wrong.",
        success: false,
        data: [],
      },
      { status: httpStatus.HTTP_500_INTERNAL_SERVER_ERROR }
    );
  }
}

