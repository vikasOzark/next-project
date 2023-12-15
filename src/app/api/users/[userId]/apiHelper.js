import getUserId from "@/utils/userByToken";

export const handleTagRemove = async (request, query, params) => {
  const userId = await getUserId(request);
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