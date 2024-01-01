import { ErrorResponse } from "@/utils/ErrorResponseHandler";
import SuccessResponseHandler from "@/utils/SuccessResponseHandler";
import httpStatus from "@/utils/httpStatus";
import getUserId from "@/utils/userByToken";
import { PrismaClient, Status } from "@prisma/client";
import { NextRequest } from "next/server";

/**
 * This method responsible to handle tag remove action.
 * @param {NextRequest} request Request object.
 * @param {Object} query Object of search query params.
 * @param {Object} params object of url params
 * @returns
 */
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
    return SuccessResponseHandler(
      [],
      "Successfully tag removed.",
      httpStatus.HTTP_202_ACCEPTED
    );
  } catch (error) {
    return ErrorResponse({ error: error });
  }
};

/**
 * This method responsible to handle user assignment action on tickets accepts user is in query params.
 * @param {NextRequest} request Request object.
 * @param {Object} query Object of search query params.
 * @param {Object} params object of url params
 * @returns
 */
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

/**
 * This method responsible to handle user unassign action on tickets accepts user is in query params.
 * @param {NextRequest} request Request object.
 * @param {Object} query Object of search query params.
 * @param {Object} params object of url params
 * @returns
 */
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

/** This method is responsible for remove notes from the tickets.
 * @param {NextRequest} request Request object.
 * @param {Object} query Object of search query params.
 * @param {Object} params object of url params
 * @returns
 */
export const removeTicketNote = async (request, query, params) => {
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

/**
 * This method responsible to update merge ticket status is all child ticket's status is closed otherwise denied the request.
 * @param {NextRequest} request
 * @param {Object} params param object which contains ticket id
 * @returns This method returns true is all the child tickets status `CLOSED` else false
 */
export const updateMergeTicketStatus = async (request, params) => {
  try {
    const prisma = await new PrismaClient();
    const userObject = await getUserId(true);
    const ticketData = await prisma.tickets.findFirst({
      where: {
        id: params?.ticketId,
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
      },
      include: {
        mergedTicket: true,
      },
    });

    if (!ticketData.isMerged) {
      return { isMerged: false, allowStatusUpdate: true };
    }

    const ticketStatus = ticketData.mergedTicket.map(
      (ticket) => ticket.status === Status.CLOSE
    );
    return { isMerged: true, allowStatusUpdate: isAllTrue(ticketStatus) };
  } catch (error) {
    return { isMerged: false, allowStatusUpdate: true };
  }
};

/**
 * This helper function is used to check all element in iterable is true
 * @param {Iterable} iterable
 * @returns returns true if all the elements of iterable are truthy, otherwise false.
 * @example
 * all([4, 2, 3, 1]) => true
 * all([4, 2, 3, 0]) => false
 * all([4, 2, 3, null]) => false
 */
function isAllTrue(iterable) {
  for (var index = 0; index < iterable.length; index++) {
    if (!iterable[index]) return false;
  }
  return true;
}

/**
 * This method  responsible to update the parent ticket status.
 * @param {String} parentTicketId Ticket id of the parent ticket.
 * @returns true
 */
export const updateParentTicketStatus = async (parentTicketId, status) => {
  try {
    const prisma = await new PrismaClient();
    const userObject = await getUserId(true);

    if (status === Status.CLOSE) {
      const ticketData = await prisma.tickets.findFirst({
        where: {
          id: parentTicketId,
          createdById: {
            uniqueCompanyId: userObject.uniqueCompanyId,
          },
        },
      });

      updateMergeTicketStatus;
    }

    const ticketData = await prisma.tickets.update({
      where: {
        id: parentTicketId,
        createdById: {
          uniqueCompanyId: userObject.uniqueCompanyId,
        },
      },
      data: {
        status: status,
      },
    });

    if (!ticketData) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export class ParentTicketStatusHandler {
  constructor(requestedStatus, currentTicketData) {
    this.requestedStatus = requestedStatus;
    this.currentTicketData = currentTicketData;
    this.parentTicketId = null;
    this.prisma = new PrismaClient();
    this.userObject = getUserId(true);
  }

  /**
   * This method instaciate the process.
   * @param {Status} status requested status
   */
  async init() {
    const hasMerge = await this.hasMergedParentTicket();
    if (hasMerge && !this.currentTicketData.isMerged) {
      if (
        Status.HOLD === this.requestedStatus ||
        Status.PENDING === this.requestedStatus
      ) {
        this.updateParentStatus(Status.PENDING);
      }

      const canCloseParentTicket = await this.checkChildTicketStatus();
      if (canCloseParentTicket && Status.CLOSE === this.requestedStatus) {
        this.updateParentStatus(Status.CLOSE);
      }
    }
  }

  async hasMergedParentTicket() {
    if (!this.currentTicketData) {
      return false;
    }
    if (this.currentTicketData.mergeTicketId.length === 0) {
      return false;
    }
    this.parentTicketId = this.currentTicketData.mergeTicketId[0];
    return true;
  }

  /**
   * This method checks is all associated ticket's status
   * @default {status=Status.CLOSE}
   * @param {Status} status
   * @returns returns true if all tickets is closed
   */
  async checkChildTicketStatus(status = Status.CLOSE) {
    try {
      if (!this.parentTicketId) {
        return false;
      }

      const ticketData = await this.prisma.tickets.findFirst({
        where: {
          id: this.parentTicketId,
          createdById: {
            uniqueCompanyId: await this.userObject.uniqueCompanyId,
          },
        },
        include: {
          mergedTicket: true,
        },
      });
      const ticketStatus = ticketData.mergedTicket.map(
        (sibling) => sibling.status === status
      );
      const canCloseParentTicket = ticketStatus.every((item) => item === true);
      return canCloseParentTicket;
    } catch (error) {
      return false;
    }
  }

  /**
   * This method updates the parent ticket status to PENDING if any child status is changed.
   * @param {Status} status
   * @returns Return true if status is successfully updated to PENDING if any child status is changed.
   */
  async updateParentStatus(status) {
    const ticketData = await this.updateStatus(status);

    if (!ticketData) {
      return false;
    }
    return true;
  }

  /**
   * this method is used to update the parent ticket status.
   * @param {Status} status
   * @returns
   */
  async updateStatus(status) {
    if (!this.parentTicketId) {
      return false;
    }

    try {
      const ticketDataUpdated = await this.prisma.tickets.update({
        where: {
          id: this.parentTicketId,
          createdById: {
            uniqueCompanyId: this.userObject.uniqueCompanyId,
          },
        },
        data: {
          status: status,
        },
      });
      return ticketDataUpdated;
    } catch (error) {
      return false;
    }
  }
}
