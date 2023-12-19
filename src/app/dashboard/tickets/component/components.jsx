"use client";

import { VscChromeClose, VscGear, VscGroupByRefType } from "react-icons/vsc";
import { useMutation, useQuery } from "react-query";
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
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { TicketDeleteButton } from "../ticketActionUtils";
import { isLatestTicket } from "@/utils/dateTimeFormat";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Paginator } from "@/components/Pagination";
export const selectContext = createContext();

export const TicketTableComponent = () => {
  const [selected, setSelected] = useState([]);
  const param = useSearchParams();
  const router = useRouter();
  console.log(param.get("page"));

  const responseData = useQuery(
    "tickets-list",
    async () => {
      const response = await fetch("/api/tickets");
      const json_response = await response.json();
      return json_response;
    },
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <>
      <selectContext.Provider value={{ selected, setSelected }}>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="inline-block min-w-full p-2  align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow-xl dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-400 dark:divide-gray-700 ">
                <thead className="soft-bg text-white font-bold text-lg  ">
                  <TableHeaderRow />
                </thead>
                <TableBodyRow responseData={responseData} />
              </table>
              <div className="flex justify-center gap-2 mt-2">
                <Paginator />
              </div>
              {responseData.isLoading && (
                <div className="flex justify-center mt-2">
                  {" "}
                  <LoadingButton title={"Loading tickets..."} />
                </div>
              )}
              {responseData.data?.data &&
                responseData.data?.data.length === 0 && (
                  <>
                    <div className="mt-2">
                      <SimpleInfoMessage message={"No tickets found."} />
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </selectContext.Provider>
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

const TableRowComponent = ({ data, ticketStatus }) => {
  const { selected, setSelected } = useContext(selectContext);

  const dateObject = new Date(data.createdAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const dateAndTime = `${hours}:${minutes} | ${day}-${month}-${year}`;

  const mutationTagRemove = useMutation({
    mutationFn: async (tagId) => {
      toast.loading("Removing tag...");
      return axios.patch(
        `/api/tickets/${data.id}/?operationTo=tag&tagId=${tagId}`
      );
    },
    onSettled: async (response) => {
      if (response) {
        toast.remove();
        if (response.data.success) {
          contextFunction();
          toast.success(response.data?.message || "Tag removed Successfully.");
        } else {
          toast.error(
            response.data?.message || "Something went wrong while removing tag."
          );
        }
      }
    },
  });

  return (
    <>
      <tr className="text-white group">
        <td className="px-4 py-4  font-medium  whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <div className=" flex gap-3">
                <input
                  type="checkbox"
                  onClick={() => setSelected([...selected, data.id])}
                />
                <Link
                  href={`${urlRoutes.TICKETS}/${data.id}`}
                  className="font-medium text-gray-300 dark:text-white hover:underline"
                >
                  {data.taskTitle}{" "}
                </Link>
                {isLatestTicket(data.createdAt) && (
                  <span>
                    <small className=" bg-purple-500 text-white px-3 py-1 rounded-full">
                      New
                    </small>
                  </span>
                )}
              </div>
            </div>
          </div>
        </td>

        <td className="px-12 py-4  font-medium  whitespace-nowrap">
          <TaskStatus status={data.status} TaskStatus={ticketStatus} />
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
              <p
                className={`${tag.color} rounded-full flex justify-between gap-2 px-4 py-[2px] font-bold text-white`}
                key={tag.id}
              >
                {tag.title}
                <VscChromeClose
                  onClick={() => mutationTagRemove.mutate(tag.id)}
                  className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[3px] cursor-pointer w-5"
                />{" "}
              </p>
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
                "bg-red-500 py-1 hover:bg-red-600 text-white hover:text-white"
              }
            />

            <TicketStatusUpdate
              key={data.id}
              title={"Status update"}
              icon={<VscGroupByRefType />}
              ticketStatus={ticketStatus}
              actionData={data}
              revalidateKey={"tickets-list"}
              styleButton="hover:bg-gray-200 bg-gray-50 rounded-full text-gray-800"
            />
            <DropdownActionMenuButton
              key={data.taskTitle}
              actionData={data}
              title={"More action"}
              icon={
                <VscGear size={18} className="font-bold" fontWeight={800} />
              }
              styleButton="hover:bg-gray-200 bg-gray-50 rounded-full text-gray-800 "
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
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-yellow-200  ">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
          <h2 className=" text-yellow-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.CLOSE === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-green-200  ">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          <h2 className=" text-green-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.HOLD === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-blue-200  ">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          <h2 className=" text-blue-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.REJECT === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-red-200  ">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
          <h2 className=" text-red-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }
};
