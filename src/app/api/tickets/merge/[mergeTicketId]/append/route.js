import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import getUserId from "@/utils/userByToken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function PATCH (request, context) {
    const {params} = context
    const responseBody = await request.json()
    console.log(responseBody);
    console.log(params);
    
    try {
        await prisma.$connect()
        const userObject = getUserId(true)

        const appendedTickets = await prisma.tickets.update({
            where : {
                id : params.mergeTicketId,
                createdById : {
                    uniqueCompanyId : userObject.uniqueCompanyId
                }
            },
            data : {
                mergedTicket: {
                    connect: requestBody.ticketsIds?.map((ticketId) => ({
                      id: ticketId,
                    })),
                  },
            }
        })

        console.log(appendedTickets);
        return SuccessResponseHandler([], "Appended tickets into the merge ticket.")
    } catch (error) {
        return ErrorResponse({error : error})
    }
}