import { user } from "@/lib/dbController";
import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import { PrismaClient } from "@prisma/client";

export async function POST(request, context) {
  try {
    const body = await request.json();
    const prisma = new PrismaClient();
    const users = await prisma.user.findFirst({
      where: {
        uniqueCompanyId,
      },
    });
    delete users.password;

    return SuccessResponseHandler(users, "Users data fetched successfully");
  } catch (error) {
    return ErrorResponse({ error: error });
  } finally {
    await prisma.$disconnect();
  }
}
