import { PrismaClient, Role } from "@prisma/client";
import httpStatus from "./httpStatus";
import getUserId from "./userByToken";
import bcrypt from "bcrypt";

export async function verifyIsAdmin() {
  /**
 * @type {PrismaClient}
 */
  const prisma = prismaInstance;

  try {
    await prisma.$connect();
    const userId = await getUserId();

    const isAdmin = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw httpStatus.HTTP_400_BAD_REQUEST;
    }

    if (isAdmin.role !== Role.Admin) {
      throw httpStatus.HTTP_401_UNAUTHORIZED;
    }

    return true;
  } catch (error) {
    throw httpStatus.HTTP_500_INTERNAL_SERVER_ERROR;
  }
}

/**
 * This method automatically verifies if the user is an admin and its password is matched.
 * @param {User.password} password User password to verify
 * @returns {Boolean} true if the user is an admin and its password is matched.
 * @example throw 500 : Un handled error.
 * throw 400 : User dows not have admin privilege.
 * throw 404 : Logged in user id not found.
 * throw 401 : Provided admin password is not matched.
 */
export async function verifyAdminPassword(password) {
  /**
 * @type {PrismaClient}
 */
  const prisma = prismaInstance;

  try {
    await prisma.$connect();
    const userId = await getUserId();

    const isAdmin = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!isAdmin) {
      throw httpStatus.HTTP_404_NOT_FOUND;
    }

    if (isAdmin.role !== Role.Admin) {
      throw httpStatus.HTTP_400_BAD_REQUEST;
    }

    const isValid = await bcrypt.compare(password, isAdmin.password);

    if (!isValid) {
      throw httpStatus.HTTP_401_UNAUTHORIZED;
    }

    return isValid;
  } catch (error) {
    throw error;
  }
}
