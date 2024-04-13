import ErrorResponseHandler, {
  ErrorResponse,
} from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";
/**
 * @type {PrismaClient}
 */
const prisma = prismaInstance;

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const userId = await getUserId();

    if (!requestBody["id"]) {
      throw new Error("self : ticket id were not provided.");
    }
    prisma.$connect();
    const ticket = await prisma.notes.create({
      data: {
        note: requestBody.note,
        createdBy: { connect: { id: userId } },
        tickets: { connect: { id: requestBody.id } },
      },
    });

    return SuccessResponseHandler(
      ticket,
      "Note created successfully.",
      httpStatus.HTTP_201_CREATED
    );
  } catch (error) {
    return ErrorResponseHandler(error);
  }
}

export async function GET(request, context) {
  try {
    const userId = await getUserId();
    const { params } = context;

    prisma.$connect();
    const notes = await prisma.notes.findMany({
      where: {
        ticketId: { has: params.ticketId },
      },
      include: {
        createdBy: {
          select: {
            first_name: true,
            id: true,
            last_name: true,
            email: true,
            contact_number: this,
            role: true,
          },
        },
      },
    });

    return SuccessResponseHandler(notes, "Notes fetched successfully.");
  } catch (error) {
    return ErrorResponse(
      {
        message: "Something bad happened, Please try again later.",
        error: error,
      },
      httpStatus.HTTP_500_INTERNAL_SERVER_ERROR
    );
  }
}
