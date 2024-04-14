"use client";

import {
    TableFlag,
    TicketStatus,
    TicketTableComponent,
} from "./component/components";
import {
    VscChromeClose,
    VscClose,
    VscGroupByRefType,
    VscSearch,
    VscSymbolKeyword,
} from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
import CreateTicketButton from "./component/forms/TicketCreateButton";
import { FilterByCreation } from "./component/FilterComponent";
import { useSearchParams, useRouter } from "next/navigation";
import TicketSearch from "./component/TicketSearch";
import { Paginator } from "@/components/Pagination";
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

export const SelectContext = React.createContext();

export default function Tickets({ searchParams }) {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [queryTicketTitle, setSearchQuery] = useState("");

    const ticketResponse = useQuery({
        queryKey: [QUERY_KEYS.TICKET_LIST, ""],

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
    });

    const tickets = ticketResponse?.data?.data || [];

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
                    queryTicketTitle,
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
                            <TicketSearch
                                queryTicketTitle={queryTicketTitle}
                                setSearchQuery={setSearchQuery}
                            />
                            <FilterByCreation />
                        </div>
                        <div className="flex items-center gap-2">
                            <MergeTickets />
                            <CreateTicketButton />
                            <DropdownMenuButton
                                title={"Actions"}
                                icon={<VscSymbolKeyword />}
                                styleButton="hover:bg-slate-600 bg-transparent text-white"
                            />
                        </div>
                    </div>
                    <div className="mt-2 w-full">
                        <TableComponent
                            headers={headers}
                            tableData={tableDataProvider(
                                tickets,
                                setSelectedTickets,
                                selectedTickets
                            )}
                        />
                    </div>
                </main>
            </SelectContext.Provider>
        </>
    );
}

const SelectedDataInfo = ({ selectedTickets, setSelectedTickets }) => {
    const handleUnSelectAll = () => {
        selectedTickets.map((ticket) => {
            document.getElementById(ticket.id).checked = false;
        });
        setSelectedTickets([]);
    };

    if (selectedTickets.length) {
        return (
            <span className="bg-white flex gap-2 items-center rounded-full px-4 py-1">
                <div className="flex gap-2">
                    <span>Selected ticket</span>
                    <span className="text-blue-900 font-bold">
                        {selectedTickets.length}
                    </span>
                </div>
                <VscChromeClose
                    onClick={handleUnSelectAll}
                    className="hover:bg-gray-300 rounded-full cursor-pointer"
                />
            </span>
        );
    }
    return null;
};

const tableDataProvider = (tickets, setSelectedTickets, selectedTickets) => {
    const handleSelect = (event, ticketData) => {
        if (event.target.checked) {
            setSelectedTickets([...selectedTickets, ticketData]);
        } else {
            setSelectedTickets(
                selectedTickets.filter((ticket) => ticket.id !== ticketData.id)
            );
        }
    };

    const dateTime = (date) =>
        handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });

    return tickets.map((ticket) => ({
        id: ticket.id,
        columns: [
            {
                content: (
                    <div className="inline-flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                            <div className=" flex gap-3 items-center">
                                <input
                                    id={ticket.id}
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onClick={(event) =>
                                        handleSelect(event, ticket)
                                    }
                                />
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
                className: "w-[10rem]",
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
                content: ticket.department?.name | "N/A",
            },
            { content: dateTime(ticket.createdAt) },
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
                            key={ticket.id}
                            title={"Status"}
                            icon={<VscGroupByRefType />}
                            actionData={ticket}
                            revalidateKey={QUERY_KEYS.TICKET_LIST}
                        />
                        <UpdateTicketButtonModal
                            className={
                                "hover:bg-gray-200 bg-transparent px-3 py-[3px] font-medium rounded-full text-gray-300"
                            }
                            title={"Update"}
                            ticketData={ticket}
                        />
                    </div>
                ),
            },
        ],
    }));
};
