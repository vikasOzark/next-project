import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request) {
  const requestBody = await request.json();
  try {
    const userId = await getUserId(request);
    const createdTicket = await prisma.tickets.create({
      data: {
        taskTitle: requestBody.taskTitle,
        ticketDetil: requestBody.ticketDetil,
        department: {
          connect: {
            id: requestBody.department,
          },
        },
        createdById: {
          connect: {
            id: userId,
          },
        },
        tags: {
  connect: requestBody.tags?.map((tag) => ({ id: tag.id })),
},
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ticket is created successfully.",
      data: [createdTicket],
    });
  } catch (error) {
    console.log(error.message);
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
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(request) {
  try {
    const userObjectId = await getUserId(request);
    prisma.$connect();

    const ticketsData = await prisma.tickets.findMany({
      where: {
        userId: userObjectId,
      },

      include: {
        department: true,
        tags: true,
        where: userObjectId,
      },
    });

    return NextResponse.json(
      {
        message: "Successfully get the department data.",
        success: true,
        data: ticketsData,
        ticketStatus: Status,
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
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(request) {
  const requestBody = await request.json();

  try {
    const createdTicket = await prisma.tickets.update({
      where : {
        id : requestBody.ticketId
      },
      data: {
        taskTitle: requestBody.taskTitle,
        ticketDetil: requestBody.ticketDetil,
        department: {
          connect: {
            id: requestBody.department,
          },
        },
        tags: {
          connect: requestBody.tags?.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ticket is created successfully.",
      data: [createdTicket],
    });

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
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE  (data) {
  const params = useParams()
  console.log(params);
  try {

    switch (params) {
      case value:
        
        break;
    
      default:
        break;
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