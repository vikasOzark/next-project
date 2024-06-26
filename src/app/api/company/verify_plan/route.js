import { user } from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient } from "@prisma/client";
import prismaInstance from "@/lib/dbController";

export async function POST(request, context) {
  try {
    const body = await request.json();
    /**
 * @type {PrismaClient}
 */
    const prisma = prismaInstance;
    const users = await prisma.user.findFirst({
      where: {
        uniqueCompanyId,
      },
    });
    delete users.password;

    return SuccessResponseHandler(users, "Users data fetched successfully");
  } catch (error) {
    return ErrorResponse({ error: error });
  }
}
