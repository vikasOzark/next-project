import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export const handleTagRemove = async (request, query, params) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return ErrorResponse({ message: "Please re-login and try again." });
    }

    if (!query.tagId) {
      return ErrorResponse();
    }

    const prisma = await new PrismaClient();
    prisma.$connect();

    await prisma.tickets.update({
      where: {
        id: params?.ticketId,
      },
      data: {
        tags: {
          disconnect: {
            id: query.tagId,
          },
        },
      },
    });
    return SuccessResponseHandler([], "Successfully tag removed.");
  } catch (error) {
    return ErrorResponse({ error: error });
  }
};

export const handleUserAssignment = async (request, query, params) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return ErrorResponse({ message: "Please re-loing and try again." });
    }

    if (!query.assignedUserId) {
      return ErrorResponse();
    }

    const prisma = await new PrismaClient();
    prisma.$connect();

    await prisma.tickets.update({
      where: {
        id: params?.ticketId,
      },
      data: {
        assingedUser: {
          connect: {
            id: query.assignedUserId,
          },
        },
      },
    });

    return SuccessResponseHandler([], "User has been assigned successfully.");
  } catch (error) {
    return ErrorResponse({ error: error });
  }
};

export const handleUserUnassign = async (request, query, params) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return ErrorResponse({ message: "Please re-loing and try again." });
    }

    if (!query.assignedUserId) {
      return ErrorResponse();
    }

    const prisma = await new PrismaClient();
    prisma.$connect();

    await prisma.tickets.update({
      where: {
        id: params?.ticketId,
      },
      data: {
        assingedUser: {
          disconnect: {
            id: query.assignedUserId,
          },
        },
      },
    });
    return SuccessResponseHandler([], "User has been unassinged successfully.");
  } catch (error) {
    return ErrorResponse({ error: error });
  }
};

export const addTicketNote = async (request, query, params) => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return ErrorResponse({ message: "Please re-loing and try again." });
    }

    if (!query.assignedUserId) {
      return ErrorResponse();
    }

    const prisma = await new PrismaClient();
    prisma.$connect();

    await prisma.tickets.update({
      where: {
        id: params?.ticketId,
      },
      data: {
        assingedUser: {
          disconnect: {
            id: query.assignedUserId,
          },
        },
      },
    });

    return;
  } catch (error) {
    return ErrorResponse({ error: error });
  }
};
