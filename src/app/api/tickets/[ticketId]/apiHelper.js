import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";

export const handleTagRemove = async (request, query, params) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("self: Please re-login and try again.");
  }

  if (!query.tagId) {
    throw new Error("self: Something went wrong, Please try again.");
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
};

export const handleUserAssignment = async (request, query, params) => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("self: Please re-login and try again.");
  }

  if (!query.assignedUserId) {
    throw new Error("self: Something went wrong, Please try again.");
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
};

export const handleUserUnassign = async (request, query, params) => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("self: Please re-login and try again.");
  }

  if (!query.assignedUserId) {
    throw new Error("self: Something went wrong, Please try again.");
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
};

export const addTicketNote = async (request, query, params) => {
  const userId = await getUserId();

  if (!userId) {
    throw new Error("self: Please re-login and try again.");
  }

  if (!query.assignedUserId) {
    throw new Error("self: Something went wrong, Please try again.");
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
};
