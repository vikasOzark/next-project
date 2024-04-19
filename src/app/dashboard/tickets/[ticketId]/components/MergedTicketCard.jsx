import React, { useContext } from "react";
import { TicketDataContext } from "../page";
import { statusCss, TicketStatusUpdate } from "../../component/TicketTableMenu";
import { Status } from "@prisma/client";
import handleTimeFormat from "@/utils/dateTimeFormat";
import Link from "next/link";
import { urlRoutes } from "@/utils/urlRoutes";
import { useMutation, useQueryClient } from "react-query";
import { LoadingState } from "@/components/Buttons";
import toast from "react-hot-toast";
import { HiArrowUpRight } from "react-icons/hi2";
import { RxScissors } from "react-icons/rx";

export default function MergedTicketCard({ ticketData }) {
    return (
        <div className="grid grid-cols-4 border-b border-gray-700 justify-between items-center mb-2 text-white font-bold">
            <div className="5rem">
                <h3
                    className="text-gray-400 text-sm 
                "
                >
                    Ticket title
                </h3>
                <Link
                    className="text-center hover:underline flex items-center gap-2 hover:text-blue-500 "
                    href={`${urlRoutes.TICKETS}/${ticketData.id}`}
                >
                    <HiArrowUpRight /> {ticketData.taskTitle}
                </Link>
            </div>
            <div className="7rem">
                <h3
                    className="text-gray-400 text-sm 
                "
                >
                    Ticket status
                </h3>
                <p
                    className={`${statusCss(
                        ticketData?.status,
                        Status,
                        "text"
                    )}`}
                >
                    {ticketData?.status}
                </p>
            </div>
            <div className="5rem">
                <h3
                    className="text-gray-400 text-sm 
                "
                >
                    Created at
                </h3>
                <p className=" capitalize text-sm  ">
                    {handleTimeFormat(ticketData?.createdAt, {
                        isFormated: true,
                        datePrifix: "/",
                        dateTime: true,
                    })}
                </p>
            </div>
            <div className="5rem flex it gap-2">
                <RemoveMergeTicket ticketData={ticketData} />
                <TicketStatusUpdate actionData={ticketData} />
            </div>
        </div>
    );
}

export const RemoveMergeTicket = ({ ticketData }) => {
    const { params } = useContext(TicketDataContext);
    const queryClient = useQueryClient();

    const removeChildTicket = useMutation({
        mutationKey: "remove-ticket",
        mutationFn: async (event) => {
            const response = await fetch(
                `/api/tickets/merge/${params.ticketId}/remove`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ ticketId: ticketData.id }),
                }
            );
            return await response.json();
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
            queryClient.invalidateQueries(params.ticketId);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return (
        <>
            {removeChildTicket.isLoading ? (
                <div
                    title="Removing tickets from merge."
                    className="flex items-center top-5 right-3"
                >
                    <LoadingState cssClass={"p-0"} />
                </div>
            ) : (
                <button
                    onClick={removeChildTicket.mutate}
                    className=" hover:border-blue-600 text-sm hover:border border border-transparent px-4 cursor-pointer transition-all flex gap-1 items-center rounded-full right-3 p-1 hover:text-blue-500"
                    type="button"
                >
                    <RxScissors size={18} /> Remove
                </button>
            )}
        </>
    );
};
