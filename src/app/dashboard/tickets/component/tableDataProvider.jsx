"use client";

import Tag from "@/components/Tag";
import { QUERY_KEYS } from "@/queryKeys";
import handleTimeFormat from "@/utils/dateTimeFormat";
import { VscGroupByRefType } from "react-icons/vsc";
import { TicketTitle } from "./TicketTableComponents";
import { TicketStatus } from "./components";
import { TicketDeleteButton } from "../ticketActionUtils";
import { TicketStatusUpdate } from "./TicketTableMenu";
import UpdateTicketButtonModal from "./UpdateTicketButtonModal";

export default function TableDataProvider(
    tickets,
    setSelectedTickets,
    selectedTickets
) {
    const props = {
        setSelectedTickets,
        selectedTickets,
    };

    return tickets.map((ticket) => ({
        id: ticket.id,
        columns: [
            {
                content: <TicketTitle {...props} ticket={ticket} />,
                className: "min-w-[8rem] max-w-[16rem] text-sm truncate",
            },
            {
                content: (
                    <TicketStatus
                        key={`status-${ticket.id}`}
                        status={ticket.status}
                    />
                ),
            },
            {
                content: ticket?.department?.name,
                className: "w-auto",
            },
            {
                content: (
                    <div className="flex flex-wrap w-auto gap-1">
                        {ticket?.tags?.map((tag) => (
                            <Tag
                                key={tag.id}
                                ticketId={ticket.id}
                                queryKey={QUERY_KEYS.TICKET_LIST}
                                tag={tag}
                            />
                        ))}
                    </div>
                ),
            },
            {
                content: (
                    <div
                        key={`action-${ticket.id}`}
                        className="flex items-center gap-2"
                    >
                        <TicketDeleteButton
                            key={`${ticket.id}-key`}
                            ticketId={ticket.id}
                            revalidateKey={QUERY_KEYS.TICKET_LIST}
                            title={"Delete"}
                            className={"delete-btn"}
                        />

                        <TicketStatusUpdate
                            actionData={ticket}
                            title={"Update"}
                            icon={<VscGroupByRefType />}
                        />
                        <UpdateTicketButtonModal
                            className={
                                "hover:bg-gray-600 bg-transparent px-3 py-[3px] font-medium rounded-md text-white hover:text-white"
                            }
                            title={"Edit"}
                            ticketData={ticket}
                        />
                    </div>
                ),
                className: "w-fit",
            },
        ],
    }));
}
