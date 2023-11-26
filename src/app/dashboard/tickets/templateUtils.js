import { Status } from "@prisma/client";

export async function getTickets() {
  const url = process.env.NEXTAUTH_URL;
  const res = await fetch(`${url}/api/tickets`);
  const todos = await res.json();
  return todos;
}

export const overViewFilterData = (response) => {
  try {
    const closedTickets = response.data.filter(
      (ticket) => ticket.status === Status.CLOSE
    )?.length;
    const pendingTickets = response.data.filter(
      (ticket) => ticket.status === Status.PENDING
    )?.length;
    const rejectedTickets = response.data.filter(
      (ticket) => ticket.status === Status.REJECT
    )?.length;
    const holdTickets = response.data.filter(
      (ticket) => ticket.status === Status.HOLD
    )?.length;

    return {
      closed: closedTickets,
      pending: pendingTickets,
      rejected: rejectedTickets,
      hold: holdTickets,
      total: response.data.length,
    };
  } catch (error) {
    return {
      closed: 0,
      pending: 0,
      rejected: 0,
      hold: 0,
      total: 0,
    };
  }
};
