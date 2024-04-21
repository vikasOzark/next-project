"use client";

import React from "react";
import { isLatestTicket } from "@/utils/dateTimeFormat";
import { Status } from "@prisma/client";

export const TicketStatus = ({ status }) => {
    if (Status.PENDING === status) {
        return (
            <>
                <div className="inline-flex items-center px-3 py-[3px]  rounded-full gap-2 bg-yellow-200  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                    <h2 className=" text-yellow-700  font-bold text-sm">
                        {status}
                    </h2>
                </div>
            </>
        );
    }

    if (Status.CLOSE === status) {
        return (
            <>
                <div className="inline-flex items-center px-3 py-[3px]  rounded-full gap-2 bg-green-200  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    <h2 className=" text-green-700  font-bold text-sm">
                        {status}
                    </h2>
                </div>
            </>
        );
    }

    if (Status.HOLD === status) {
        return (
            <>
                <div className="inline-flex items-center px-3 py-[3px]  rounded-full gap-2 bg-blue-200  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                    <h2 className=" text-blue-700  font-bold text-sm">
                        {status}
                    </h2>
                </div>
            </>
        );
    }

    if (Status.REJECT === status) {
        return (
            <>
                <div className="inline-flex items-center px-3 py-[3px]  rounded-full gap-2 bg-red-200  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                    <h2 className=" text-red-700  font-bold text-sm">
                        {status}
                    </h2>
                </div>
            </>
        );
    }

    if (Status.PROCESS === status) {
        return (
            <>
                <div className="inline-flex items-center px-3 py-[3px]  rounded-full gap-2 bg-violet-500  ">
                    <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                    <h2 className=" text-white font-bold text-sm">{status}</h2>
                </div>
            </>
        );
    }
};

export const TableFlag = ({ ticketData }) => {
    const mergedCount = ticketData._count?.mergedTicket;
    return (
        <>
            <div className="flex items-center gap-2">
                {isLatestTicket(ticketData.createdAt) && (
                    <span>
                        <small className=" bg-purple-500 text-white px-3 py-1 rounded-full">
                            New
                        </small>
                    </span>
                )}
                {ticketData.isMerged && (
                    <span>
                        <small className=" bg-green-500 text-white px-3 flex gap-2 rounded-full">
                            <span>Merged</span>
                            {mergedCount.toString()}
                        </small>
                    </span>
                )}
            </div>
        </>
    );
};
