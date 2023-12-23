import { NextRequest } from "next/server";

/**
 * This methond is reponsinble to provide the filer option to tickets.
 * @param {NextRequest} request
 * @returns Returns dict of collection key and fileter type crrosponsing to the user selection
 */
export const provideFilter = (request) => {
  const sortByName = request.nextUrl.searchParams.get("sort");
  const sortTicket = request.nextUrl.searchParams.get("sortTicket");

  if (sortByName !== null) {
    return {
      taskTitle: sortByName,
    };
  }

  if (sortTicket !== "null") {
    if (sortTicket === "new-to-old") {
      return {
        createdAt: "desc",
      };
    }
    if (sortTicket === "old-to-new") {
      return {
        createdAt: "asc",
      };
    }
  }
};
