import { z } from "zod"

export const bulkTicketDelete = z.object({
    ticketIds: z.string().array(),
});
