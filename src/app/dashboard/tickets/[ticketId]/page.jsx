"use client";
import axios from "axios";
import {
    VscArrowDown,
    VscChevronDown,
    VscLibrary,
    VscSymbolEvent,
} from "react-icons/vsc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useContext } from "react";
import MergedTicketCard from "./components/MergedTicketCard";
import { isJSONString } from "@/utils/validateJsonString";
import TicketDetailSection from "./components/detailSection";
import { VscIssues } from "react-icons/vsc";
import { QUERY_KEYS } from "@/queryKeys";
import DetailSidePanel from "./components/DetailSidePanel";
import MessageThread from "./MessageThread";
import ActivitySection from "./components/ActivitySection";
import TicketAction from "./components/TicketAction";
import { TicketStatusUpdate } from "../component/TicketTableMenu";
import { ButtonComponent } from "@/components/Buttons";
import toast from "react-hot-toast";
import { Status } from "@prisma/client";

export const TicketDataContext = React.createContext();

export default function Page({ params }) {
    const { ticketId } = params;

    const { data, isLoading, refetch } = useQuery({
        queryKey: [QUERY_KEYS.TICKET_DETAIL, ticketId],
        queryFn: () => {
            return axios.get(`/api/tickets/${ticketId}`);
        },
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const ticketData = data?.data.data || {};
    const isJsonString = isJSONString(ticketData?.ticketDetil);

    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = ticketData?.ticketDetil;
    }

    return (
        <>
            <TicketDataContext.Provider
                value={{ ticketData, params, isLoading, refetch }}
            >
                <section>
                    <div className="grid gap-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        <div
                            className="xl:col-span-4 h-[calc(100vh_-_7em)] overflow-hidden overflow-y-auto lg:grid-span-3"
                            x-chunk="dashboard-01-chunk-4"
                        >
                            <main className="px-2 md:px-10 space-y-4 lg:px-10">
                                <div className="flex justify-between items-center">
                                    <div className="">
                                        <p className="block mt-2 text-sm w-full text-white font-medium leading-6 ">
                                            Title
                                        </p>
                                        <p className="text-md font-bold">
                                            {ticketData?.taskTitle}
                                        </p>

                                        {ticketData?.isLoading && (
                                            <div className="h-[2rem] animate-pulse bg-gray-500 rounded-lg"></div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UpdateStatus />
                                        <TicketAction />
                                    </div>
                                </div>
                                <div className="rounded-md p-1  ">
                                    <TicketDetailSection />
                                    {isLoading && (
                                        <div className="h-[15rem] animate-pulse bg-gray-500 rounded-lg" />
                                    )}
                                </div>
                                <div className="">
                                    <p className="font-bold mb-2 text-md text-white flex items-center gap-2">
                                        <VscIssues size={18} /> Sub tickets
                                    </p>
                                    {ticketData.mergedTicket?.map((ticket) => (
                                        <MergedTicketCard
                                            key={ticket.id}
                                            ticketData={ticket}
                                        />
                                    ))}
                                    {isLoading && (
                                        <div className=" space-y-2">
                                            <div className="h-[3rem] rounded-md animate-pulse bg-gray-500"></div>
                                            <div className="h-[3rem] rounded-md animate-pulse bg-gray-500"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    <p className="font-bold mb-2 text-md text-white flex items-center gap-2">
                                        <VscLibrary size={18} /> Activity
                                    </p>
                                    <ActivitySection />
                                </div>
                                <div className="">
                                    <MessageThread />
                                </div>
                            </main>
                        </div>
                        <div className="">
                            <DetailSidePanel />
                        </div>
                    </div>
                </section>
            </TicketDataContext.Provider>
        </>
    );
}

const UpdateStatus = () => {
    const { ticketData } = useContext(TicketDataContext);
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: async (status) => {
            toast.loading(`Ticket status is updating...`);
            return axios.post(`/api/tickets/${ticketData.id}`, {
                status: status,
            });
        },
        onSuccess: (response) => {
            toast.dismiss();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_LIST],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_DETAIL, ticketData.id],
            });
            toast.success("Successfully status is updated.");
        },
        onError: async (error) => {
            const err = await error.response.data;
            toast.dismiss();
            toast.error(
                err?.message || "Something went wrong, Please try again."
            );
        },
    });

    return (
        <div className="rounded-md flex items-center gap-2">
            <span className="px-3 font-bold">{ticketData.status}</span>
            <div className="flex rounded-full ">
                <ButtonComponent
                    icon={<VscSymbolEvent size={20} />}
                    title={
                        ticketData.status === Status.CLOSE ? "Pending" : "Close"
                    }
                    isLoading={isLoading}
                    onClick={() =>
                        mutate(
                            ticketData.status === Status.CLOSE
                                ? Status.PENDING
                                : Status.CLOSE
                        )
                    }
                    className={
                        " bg-green-600 border-e hover:bg-green-700 border-0 rounded-e-none rounded-s-md"
                    }
                />
                <TicketStatusUpdate
                    actionData={ticketData}
                    btnClassName={
                        "border-0 hover:bg-green-600 bg-green-700 px-1 rounded-s-none rounded-e-md"
                    }
                    icon={<VscChevronDown size={20} />}
                />
            </div>
        </div>
    );
};
