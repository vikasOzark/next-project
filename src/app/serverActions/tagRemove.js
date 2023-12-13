export async function removeTag(data) {
  "use server";

   

  //    

  //     switch (operationTO) {
  //       case "tag":

  //         break;

  //       default:
  //         break;
  //     }

  const prisma = await new PrismaClient();
  prisma.$connect();

  try {
    // await prisma.tickets.update({
    //   where : {
    //     id : params.ticketId
    //   }
    // })

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
