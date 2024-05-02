"use client";

import React, { useEffect, useState } from "react";
import { TicketActionDropdown } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
import CreateTicketButton from "./component/forms/TicketCreateButton";
import { TicketFilter } from "./component/FilterComponent";
import { useSearchParams } from "next/navigation";
import TicketSearch from "./component/TicketSearch";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/queryKeys";
import TableComponent from "@/components/TableComponent";
import CustomPagination from "@/components/Pagination";
import { LoadingState } from "@/components/Buttons";
import { TicketEmptyState } from "@/components/EmptyState";
import { useSearchQuery } from "@/hooks/setQueryParam";
import TableDataProvider from "./component/tableDataProvider";
import { SelectedDataInfo } from "./component/TicketTableComponents";

export const SelectContext = React.createContext();

export default function Tickets({ searchParams }) {
    const [selectedTickets, setSelectedTickets] = useState([]);
    const searchParam = useSearchParams();
    const query = searchParam.get("q");
    const status = searchParam.get("status");
    const setQuery = useSearchQuery();

    const pa = null;
    useEffect(() => {
        setQuery("page", 1);
    }, [pa]);

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
        { name: "Name" },
        { name: "Ticket status" },
        { name: "Department" },
        { name: "Tags" },
        { name: "Action", className: "w-[21rem]" },
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
                    <div className="mt-2 h-auto w-full">
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
                        <div className=" bottom-0 mt-2 flex justify-center">
                            <CustomPagination />
                        </div>
                    </div>
                </main>
            </SelectContext.Provider>
        </>
    );
}
