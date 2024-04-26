"use client";
import axios from "axios";
import {
    VscChevronDown,
    VscChromeClose,
    VscLibrary,
    VscSave,
    VscSymbolEvent,
} from "react-icons/vsc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useContext } from "react";
import MergedTicketCard from "./components/MergedTicketCard";
import TicketDetailSection from "./components/detailSection";
import { VscIssues } from "react-icons/vsc";
import { QUERY_KEYS } from "@/queryKeys";
import DetailSidePanel from "./components/DetailSidePanel";
import MessageThread from "./MessageThread";
import ActivitySection from "./components/ActivitySection";
import TicketAction from "./components/TicketAction";
import { TicketStatusUpdate } from "../component/TicketTableMenu";
import { ButtonComponent, LoadingState } from "@/components/Buttons";
import toast from "react-hot-toast";
import { Status } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useRemoveSearchQuery, useSearchQuery } from "@/hooks/setQueryParam";
import { Suspense } from "react";

export const TicketDataContext = React.createContext();

export default function Page({ params }) {
    const { ticketId } = params;
    const searchParam = useSearchParams();
    const removeQuery = useRemoveSearchQuery();

    const mode = searchParam.get("mode");
    const editable = mode === "edit";

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

    const { mutate, isLoading: updateLoading } = useMutation({
        mutationFn: (formData) =>
            axios.patch(`/api/tickets/${ticketId}/update/`, formData),
        onSuccess: ({ data }) => {
            data?.success
                ? toast.success(data?.message || "Ticket updated successfully.")
                : toast.error(data?.message || "Ticket updated successfully.");
            removeQuery("mode", "edit");
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const taskTitle = form.get("taskTitle");
        const ticketDetil = form.get("ticketDetil");
        mutate({ taskTitle, ticketDetil });
    };

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
                                <form onSubmit={handleSubmit}>
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="block mt-2 text-sm w-full text-white font-medium leading-6 ">
                                                Title
                                            </p>
                                            <input
                                                className="w-full bg-transparent active:outline-none ring-0 focus:outline-none p-1"
                                                defaultValue={
                                                    ticketData?.taskTitle
                                                }
                                                readOnly={!editable}
                                                type="text"
                                                name="taskTitle"
                                            />
                                            {ticketData?.isLoading && (
                                                <div className="h-[2rem] animate-pulse bg-gray-500 rounded-lg"></div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {editable ? (
                                                <CancelEditMode />
                                            ) : (
                                                <UpdateStatus />
                                            )}
                                            <Suspense
                                                fallback={<LoadingState />}
                                            >
                                                <TicketAction />
                                            </Suspense>
                                        </div>
                                    </div>
                                    <div className="rounded-md p-1  ">
                                        <Suspense fallback={<LoadingState />}>
                                            <TicketDetailSection />
                                        </Suspense>
                                        {isLoading && (
                                            <div className="h-[15rem] animate-pulse bg-gray-500 rounded-lg" />
                                        )}
                                        {editable && (
                                            <div className="flex justify-end">
                                                <ButtonComponent
                                                    type={"submit"}
                                                    isLoading={updateLoading}
                                                    className="text-blue-500 border border-blue-500 hover:bg-blue-400 hover:text-white"
                                                    title={"Save"}
                                                    icon={<VscSave size={18} />}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </form>
                                <div className="">
                                    <p className="font-bold mb-2 text-md text-white flex items-center gap-2">
                                        <VscIssues size={18} /> Sub tickets
                                    </p>
                                    <Suspense fallback={<LoadingState />}>
                                        {ticketData.mergedTicket?.map(
                                            (ticket) => (
                                                <MergedTicketCard
                                                    key={ticket.id}
                                                    ticketData={ticket}
                                                />
                                            )
                                        )}
                                    </Suspense>
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
                                    <Suspense fallback={<LoadingState />}>
                                        <ActivitySection />
                                    </Suspense>
                                </div>
                                <div className="">
                                    <Suspense fallback={<LoadingState />}>
                                        <MessageThread />
                                    </Suspense>
                                </div>
                            </main>
                        </div>
                        <div className="">
                            <Suspense fallback={<LoadingState />}>
                                <DetailSidePanel />
                            </Suspense>
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
                        ticketData.status === Status.CLOSE ? "Re-open" : "Close"
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

const CancelEditMode = () => {
    const removeParam = useRemoveSearchQuery();
    return (
        <ButtonComponent
            type={"button"}
            className={"border border-blue-500 text-blue-500"}
            onClick={() => removeParam("mode", "edit")}
            icon={<VscChromeClose size={18} />}
            title={"Cancel"}
        />
    );
};
