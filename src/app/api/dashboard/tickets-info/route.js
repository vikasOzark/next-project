import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const userId = getUserId();
  } catch (error) {}
}
