"use client";

import { LoadingButton } from "@/components/Buttons";
import handleTimeFormat from "@/utils/dateTimeFormat";
import {
    AssignUserAction,
    TicketDeleteButton,
} from "@/app/dashboard/tickets/ticketActionUtils";
import axios from "axios";
import {
    VscAdd,
    VscCheck,
    VscChevronLeft,
    VscGroupByRefType,
    VscPersonAdd,
    VscServer,
} from "react-icons/vsc";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { urlRoutes } from "@/utils/urlRoutes";
import { TicketStatusUpdate, statusCss } from "../component/TicketTableMenu";
import { Status } from "prisma/prisma-client";
import { TicketHoverCard } from "./HelperComponents";
import { NotesSection } from "./components/NotesSection";
import React, { useEffect, useState } from "react";
import MergedTicketCard from "./components/MergedTicketCard";
import { useContext } from "react";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { SetTimeFrame } from "./components/SetTimeFrame";
import TagsPopover from "@/components/Popover";
import CustomEditor from "@/components/Editor";
import { isJSONString } from "@/utils/validateJsonString";
import TicketDetailSection from "./components/detailSection";
import UpdateTicketButtonModal from "../component/UpdateTicketButtonModal";
export const TicketDataContext = React.createContext();

export default function Page({ params }) {
    const { ticketId } = params;

    const ticketResponse = useQuery({
        queryKey: ["ticket-detail", ticketId],
        queryFn: () => {
            return axios.get(`/api/tickets/${ticketId}`);
        },
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const ticketData = ticketResponse.data?.data.data || {};

    return (
        <>
            <TicketDataContext.Provider
                value={{ ticketData, params, ticketResponse }}
            >
                <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="col-span-8">
                        <div className="flex-row gap-2 mb-2">
                            <TicketDataSection />
                            <div className="">
                                {ticketData.mergedTicket?.map((ticket) => (
                                    <MergedTicketCard
                                        key={ticket.id}
                                        ticketData={ticket}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className=" md:col-span-4">
                        <div className=" font-bold text-2xl px-3 text-white">
                            <h3 className="flex gap-2 items-center ">
                                <VscServer size={23} />
                                Notes
                            </h3>
                        </div>
                        <NotesSection />
                        <SetTimeFrame />
                    </div>
                </div>
            </TicketDataContext.Provider>
        </>
    );
}
// TagsPopover
const TicketDataSection = () => {
    const { ticketData, ticketResponse } = useContext(TicketDataContext);
    const router = useRouter();

    const errorMessageProvider = () => {
        const error = ticketResponse.error?.request.response || "{}";
        const errorMessage = JSON.parse(error);
        return errorMessage.message;
    };

    const isJsonString = isJSONString(ticketData?.ticketDetil);

    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = ticketData?.ticketDetil;
    }

    return (
        <>
            <div className="text-white font-bold">
                <div className="flex justify-between mb-2 gap-2">
                    <div className="mb-2">
                        <button
                            title="Take me back"
                            onClick={() => router.back()}
                            className="text-white cursor-pointer "
                        >
                            <VscChevronLeft
                                size={32}
                                className="bg-slate-600 rounded-full hover:bg-slate-400 transition-all"
                            />
                        </button>
                    </div>

                    <div className="flex w-auto gap-2">
                        <AssignUserAction
                            icon={<VscPersonAdd size={18} />}
                            title={"Assign people"}
                            actionData={ticketData}
                            revalidateKey={ticketData.id}
                            isAlreadyAssigned={
                                ticketData["assingedUser"] === null
                                    ? false
                                    : true
                            }
                            className={
                                "gap-2   hover:bg-slate-700 bg-gray-900 transition-all  px-3 py-1 items-center rounded-full"
                            }
                        />
                        <TicketStatusUpdate
                            title={"Status update"}
                            icon={<VscGroupByRefType />}
                            ticketStatus={Status}
                            actionData={ticketData}
                            revalidateKey={ticketData.id}
                            styleButton="hover:bg-gray-600 rounded-full hover:text-white"
                        />
                        <TicketDeleteButton
                            ticketId={ticketData.id}
                            title={"Delete"}
                            className={"bg-red-200 p-1 px-3"}
                            navigateTo={urlRoutes.TICKETS}
                        />
                    </div>
                </div>
                <div className="rounded-2xl grid grid-cols-3 gap-3 p-3 border soft-bg shadow-md border-gray-800 ">
                    {ticketResponse.isLoading && (
                        <div className="col-span-3">
                            <LoadingButton title={"Loading your ticket..."} />
                        </div>
                    )}
                    {ticketResponse.isError && (
                        <div className="col-span-3">
                            <SimpleErrorMessage
                                message={errorMessageProvider()}
                            />
                        </div>
                    )}
                    {ticketResponse.isSuccess && (
                        <>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Ticket title
                                </h3>
                                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                                    {ticketData.taskTitle}
                                </p>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Department
                                </h3>
                                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                                    {ticketData?.department?.name}
                                </p>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
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
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Created by
                                </h3>
                                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                                    {ticketData?.createdById?.first_name}{" "}
                                    {ticketData?.createdById?.last_name}
                                </p>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Tags
                                </h3>
                                <div className=" flex gap-2 items-center">
                                    {ticketData?.tags?.map((tag) => (
                                        <p
                                            className={`${tag.color} rounded-full flex justify-between gap-2 px-4 py-[2px] font-bold text-white`}
                                            key={tag.id}
                                        >
                                            {tag.title}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Created at
                                </h3>
                                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                                    {handleTimeFormat(ticketData?.createdAt, {
                                        isFormated: true,
                                        datePrifix: "/",
                                        dateTime: true,
                                    })}
                                </p>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Creatd by
                                </h3>
                                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                                    {ticketData?.createdById?.first_name}{" "}
                                    {ticketData?.createdById?.last_name}
                                </p>
                            </div>
                            <div className="">
                                <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                                    Assigned
                                </h3>
                                <div className="flex gap-3 items-center mt-2">
                                    <TicketHoverCard ticketData={ticketData} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {Object.keys(ticketData).length > 0 && (
                    <>
                        <TicketDetailSection ticketData={ticketData} />
                        <UpdateTicketButtonModal
                            title={"Update ticket"}
                            className={"mt-2"}
                            ticketData={ticketData}
                        />
                    </>
                )}
            </div>
        </>
    );
};
