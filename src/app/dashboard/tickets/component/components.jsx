"use client";

import {
    VscChromeClose,
    VscGear,
    VscGroupByRefType,
    VscKebabVertical,
} from "react-icons/vsc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    DropdownActionMenuButton,
    TicketStatusUpdate,
} from "./TicketTableMenu";
import { LoadingButton } from "@/components/Buttons";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { urlRoutes } from "@/utils/urlRoutes";
import {
    SimpleErrorMessage,
    SimpleInfoMessage,
} from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { TicketDeleteButton } from "../ticketActionUtils";
import { isLatestTicket } from "@/utils/dateTimeFormat";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { SelectContext } from "../page";
import { Status } from "@prisma/client";
import UpdateTicketButtonModal from "./UpdateTicketButtonModal";
import Tag from "@/components/Tag";

export const RouterContext = createContext();

export const TicketTableComponent = () => {
    const query = useSearchParams();

    const router = useRouter();
    const responseData = useQuery(
        ["tickets-list", query.toString()],

        async ({ queryKey }) => {
            const [_, query] = queryKey;

            const response = await fetch(`/api/tickets?${query}`);
            if (response.status === 500) {
                throw new Error("Couldn't load the tickets at the moment.");
            }
            const json_response = await response.json();
            return json_response;
        },

        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            cacheTime: 0,
            staleTime: 0,
        }
    );

    return (
        <>
            <RouterContext.Provider value={{ router, responseData }}>
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="inline-block min-w-full p-2  align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-400 dark:divide-gray-700 ">
                                <thead className="soft-bg text-white font-bold text-lg  ">
                                    <TableHeaderRow />
                                </thead>
                                <TableBodyRow responseData={responseData} />
                            </table>
                            <div className="flex justify-center gap-2 mt-2">
                                {/* <Paginator /> */}
                            </div>
                            {responseData.isLoading && (
                                <div className="flex justify-center mt-2">
                                    {" "}
                                    <LoadingButton
                                        title={"Loading tickets..."}
                                    />
                                </div>
                            )}
                            {responseData.isError && (
                                <SimpleErrorMessage
                                    message={responseData.error?.message}
                                />
                            )}
                            {responseData.data?.data &&
                                responseData.data?.data.length === 0 && (
                                    <>
                                        <div className="mt-4">
                                            <SimpleInfoMessage
                                                message={
                                                    "Oops..! No tickets found."
                                                }
                                            />
                                        </div>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </RouterContext.Provider>
        </>
    );
};

const TableBodyRow = ({ responseData }) => {
    return (
        <>
            <tbody className=" divide-y divide-gray-400 softer-bg dark:divide-gray-700  ">
                {responseData.isSuccess &&
                    responseData.data.data?.map((ticket) => (
                        <TableRowComponent
                            key={ticket.id}
                            data={ticket}
                            ticketStatus={responseData.data.ticketStatus}
                        />
                    ))}
            </tbody>
        </>
    );
};

const TableRowComponent = ({ data }) => {
    const { selectedTickets, setSelectedTickets } = useContext(SelectContext);

    const dateObject = new Date(data.createdAt);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const dateAndTime = `${hours}:${minutes} | ${day}-${month}-${year}`;

    const handleSelect = (event) => {
        if (event.target.checked) {
            setSelectedTickets([...selectedTickets, data]);
        } else {
            setSelectedTickets(
                selectedTickets.filter((ticket) => ticket.id !== data.id)
            );
        }
    };

    return (
        <>
            <tr className="text-white group">
                <td className="px-4 py-4  font-medium  whitespace-nowrap">
                    <div className="inline-flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                            <div className=" flex gap-3">
                                <input
                                    id={data.id}
                                    type="checkbox"
                                    onClick={(event) => handleSelect(event)}
                                />
                                <Link
                                    href={`${urlRoutes.TICKETS}/${data.id}`}
                                    className="font-medium  text-gray-300 dark:text-white hover:underline"
                                >
                                    <p className="text-wrap">
                                        {data.taskTitle}{" "}
                                    </p>
                                </Link>
                                <TableFlag ticketData={data} />
                            </div>
                        </div>
                    </div>
                </td>

                <td className="px-12 py-4  font-medium  whitespace-nowrap">
                    <TaskStatus status={data.status} TaskStatus={Status} />
                </td>

                <td className="px-4 py-4   dark:text-gray-300 whitespace-nowrap">
                    {data.department.name}
                </td>

                <td className="px-4 py-4   dark:text-gray-300 whitespace-nowrap">
                    {dateAndTime}
                </td>

                <td className="px-4 py-4   dark:text-gray-300 whitespace-nowrap">
                    <div className=" flex gap-2 items-center">
                        {data?.tags?.map((tag) => (
                            <Tag
                                key={tag.id}
                                ticketId={data.id}
                                queryKey={"tickets-list"}
                                tag={tag}
                            />
                        ))}
                    </div>
                </td>

                <td className="px-4 py-4  whitespace-nowrap">
                    <div className="flex items-center gap-x-6 justify-center">
                        <TicketDeleteButton
                            key={`${data.id}-key`}
                            ticketId={data.id}
                            revalidateKey={"tickets-list"}
                            title={"Delete"}
                            className={
                                "bg-red-500 hover:bg-red-600 px-3 py-[3px] text-white hover:text-white"
                            }
                        />

                        <TicketStatusUpdate
                            key={data.id}
                            title={"Status"}
                            icon={<VscGroupByRefType />}
                            ticketStatus={Status}
                            actionData={data}
                            revalidateKey={"tickets-list"}
                            styleButton="hover:bg-gray-200 hover:bg-text-700 bg-transparent shadow-0 px-3 py-[3px] rounded-full text-gray-300"
                        />
                        <UpdateTicketButtonModal
                            className={
                                "hover:bg-gray-200 bg-transparent px-3 py-[3px] font-medium rounded-full text-gray-300"
                            }
                            title={"Update"}
                            ticketData={data}
                        />
                    </div>
                </td>
            </tr>
        </>
    );
};

const TableHeaderRow = () => {
    return (
        <>
            {" "}
            <tr>
                <th
                    scope="col"
                    className="py-3.5 px-4  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    <div className="flex items-center gap-x-3">
                        <span>Name</span>
                    </div>
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    Ticket status
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    Department
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    Created on
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    Tags
                </th>

                <th
                    scope="col"
                    className="px-4 py-3.5  font-normal text-left rtl:text-right  dark:text-gray-400"
                >
                    Action
                </th>
            </tr>
        </>
    );
};

const TaskStatus = ({ TaskStatus, status }) => {
    if (TaskStatus.PENDING === status) {
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

    if (TaskStatus.CLOSE === status) {
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

    if (TaskStatus.HOLD === status) {
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

    if (TaskStatus.REJECT === status) {
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

    if (TaskStatus.PROCESS === status) {
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
                        <small className=" bg-green-500 text-white px-3 py-1 flex gap-2 rounded-full">
                            <span>Merged</span>
                            {mergedCount.toString()}
                        </small>
                    </span>
                )}
            </div>
        </>
    );
};
