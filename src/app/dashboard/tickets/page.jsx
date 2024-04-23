"use client";

import { TableFlag, TicketStatus } from "./component/components";
import {
    VscChromeClose,
    VscGroupByRefType,
    VscPass,
    VscPassFilled,
} from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { TicketActionDropdown } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
import CreateTicketButton from "./component/forms/TicketCreateButton";
import { TicketFilter } from "./component/FilterComponent";
import { useSearchParams } from "next/navigation";
import TicketSearch from "./component/TicketSearch";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/queryKeys";
import Tag from "@/components/Tag";
import { TicketDeleteButton } from "./ticketActionUtils";
import { TicketStatusUpdate } from "./component/TicketTableMenu";
import UpdateTicketButtonModal from "./component/UpdateTicketButtonModal";
import TableComponent from "@/components/TableComponent";
import handleTimeFormat from "@/utils/dateTimeFormat";
import { urlRoutes } from "@/utils/urlRoutes";
import Link from "next/link";
import CustomPagination from "@/components/Pagination";
import { LoadingState } from "@/components/Buttons";
import { TicketEmptyState } from "@/components/EmptyState";
import { useSearchQuery } from "@/hooks/setQueryParam";

export const SelectContext = React.createContext();

export default function Tickets({ searchParams }) {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const searchParam = useSearchParams();
    const query = searchParam.get("q");
    const status = searchParam.get("status");
    const setQuery = useSearchQuery();
    useEffect(() => {
        setQuery("page", 1);
    }, [setQuery]);

    const ticketResponse = useQuery({
        queryKey: [QUERY_KEYS.TICKET_LIST, searchParam.toString()],

        queryFn: async ({ queryKey }) => {
            const [_, query] = queryKey;

            const response = await fetch(`/api/tickets?${query}`);
            if (response.status === 500) {
                throw new Error("Couldn't load the tickets at the moment.");
            }
            const json_response = await response.json();
            return json_response;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: 0,
        staleTime: 0,
        enabled: !!searchParam,
    });

    const tickets = ticketResponse?.data?.data || []; //
    const filteredTickets = tickets
        .filter((ticket) =>
            ticket.taskTitle
                .toLowerCase()
                .includes(query ? query.toLowerCase() : "")
        )
        .filter((ticket) => {
            return ticket.status
                .toLowerCase()
                .includes(status ? status.toLowerCase() : "");
        });

    const headers = [
        "Name",
        "Ticket status",
        "Department",
        "Created",
        "Tags",
        "Action",
    ];

    return (
        <>
            <SelectContext.Provider
                value={{
                    selectedTickets,
                    setSelectedTickets,
                    searchParams,
                }}
            >
                <main>
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <SelectedDataInfo
                                selectedTickets={selectedTickets}
                                setSelectedTickets={setSelectedTickets}
                            />
                            <TicketSearch searchName={"q"} />
                            <TicketFilter />
                        </div>
                        <div className="flex items-center gap-2">
                            <MergeTickets />
                            <CreateTicketButton />
                            <TicketActionDropdown />
                        </div>
                    </div>
                    <div className="mt-2 relative min-h-[35em] max-h-full w-full">
                        <TableComponent
                            headers={headers}
                            tableData={TableDataProvider(
                                filteredTickets,
                                setSelectedTickets,
                                selectedTickets
                            )}
                        />
                        {!ticketResponse.isLoading &&
                            filteredTickets.length === 0 && (
                                <TicketEmptyState />
                            )}
                        {ticketResponse.isLoading && (
                            <>
                                <div className="grid place-content-center">
                                    <LoadingState message={"Loading tickets"} />
                                </div>
                            </>
                        )}
                        <div className=" absolute bottom-0 flex justify-center">
                            <CustomPagination />
                        </div>
                    </div>
                </main>
            </SelectContext.Provider>
        </>
    );
}

const SelectedDataInfo = ({ selectedTickets, setSelectedTickets }) => {
    if (selectedTickets.length) {
        return (
            <span className="temp-bg flex gap-2 text-white items-center rounded-full px-4 py-1">
                <div className="flex gap-2">
                    <span>Selected ticket</span>
                    <span className="text-blue-500 font-bold">
                        {selectedTickets.length}
                    </span>
                </div>
                <VscChromeClose
                    size={20}
                    onClick={() => setSelectedTickets([])}
                    className="hover:bg-gray-700 rounded-full cursor-pointer"
                />
            </span>
        );
    }
    return null;
};

const TableDataProvider = (tickets, setSelectedTickets, selectedTickets) => {
    const dateTime = (date) => {
        return handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });
    };

    const handleSelect = (ticket) => {
        setSelectedTickets((pre) => {
            const isAvailable = pre.find(
                (selectedTicket) => selectedTicket.id === ticket.id
            );
            if (isAvailable) {
                return pre.filter(
                    (selectedTicket) => selectedTicket.id !== ticket.id
                );
            }
            return [...pre, ticket];
        });
    };
    const selectedIds = selectedTickets.map((ticket) => ticket.id);
    return tickets.map((ticket) => ({
        id: ticket.id,
        columns: [
            {
                content: (
                    <div className="inline-flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                            <div className=" flex gap-3 items-center">
                                <div className="">
                                    {selectedIds.includes(ticket.id) ? (
                                        <VscPassFilled
                                            className="text-green-500"
                                            onClick={() => handleSelect(ticket)}
                                            size={20}
                                        />
                                    ) : (
                                        <VscPass
                                            onClick={() => handleSelect(ticket)}
                                            size={20}
                                        />
                                    )}
                                </div>
                                <Link
                                    href={`${urlRoutes.TICKETS}/${ticket.id}`}
                                    className="font-medium  text-gray-300 dark:text-white hover:underline"
                                >
                                    <p className="text-wrap">
                                        {ticket.taskTitle}
                                    </p>
                                </Link>
                                <TableFlag ticketData={ticket} />
                            </div>
                        </div>
                    </div>
                ),
                className: "min-w-[8rem] max-w-[14rem]",
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
                content: ticket?.department?.name || "N/A",
            },
            { content: dateTime(ticket.createdAt), className: "text-sm" },
            {
                content: (
                    <div className="flex flex-wrap gap-1">
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
                                "hover:bg-gray-200 bg-transparent px-3 py-[3px] font-medium rounded-md text-gray-300"
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
};
