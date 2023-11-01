import { VscGear, VscGroupByRefType } from "react-icons/vsc";
import { useMutation, useQuery } from "react-query";
import { twMerge } from "tailwind-merge";
import {
  DropdownActionMenuButton,
  TicketStatusUpdate,
} from "./TicketTableMenu";
import { LoadingButton } from "@/components/Buttons";
import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ButtonDropdownComponent } from "@/components/Modal";

export const TicketStatusCard = ({
  title,
  data,
  analyticString,
  icon,
  style,
}) => {
  return (
    <>
      <div
        className={twMerge(
          `rounded-xl bg-white ms-2 text-card-foreground shadow`,
          style
        )}
        // style={{ width: "max-content" }}
      >
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{title}</h3>
          {icon}
        </div>
        <div className="p-6 pt-0">
          <div className="text-2xl font-bold">{data}</div>
          <p className="text-xs text-muted-foreground">{analyticString}</p>
        </div>
      </div>
    </>
  );
};

export const RefreshContext = React.createContext()
export const TicketTableComponent = ({responseData}) => {

  return (
    <>
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden dark:border-gray-700 md:rounded-lg h-[100vh]">
            {responseData.isLoading ? 
            <div className="flex justify-center border-0">
              <LoadingButton title={"Loading tickets..."} />
            </div> : 
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <input
                        type="checkbox"
                        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                      />
                      <span>Name</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Ticket status
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Department
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Created on
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Tags
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <RefreshContext.Provider value={responseData.refetch} >
                <TableBodyRow responseData={responseData} />
              </RefreshContext.Provider>
            </table>
            }
          </div>
        </div>
      </div>
    </>
  );
};

const TableBodyRow = ({responseData}) => {
  return (
    <>
     <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
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
  const dateObject = new Date(data.createdAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const dateAndTime = `${hours}:${minutes} | ${day}-${month}-${year}`;

  const contextFunction = useContext(RefreshContext);

  const mutationAction = useMutation({
    mutationFn: async () => {
      return axios.delete(`/api/tickets/${data.id}`);
    },
    onSettled: async (response) => {
      if (response) {
        if (response.data.success) {
          contextFunction();
          toast.success(
            response.data?.message || "Ticket is deleted Successfully."
          );
        } else {
          toast.error(
            response.data?.message || "Something went wrong while deleting."
          );
        }
      }
    },
  });

  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <input
              type="checkbox"
              className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
            />

            <div className="flex items-center gap-x-2">
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  {data.taskTitle}
                </h2>
              </div>
            </div>
          </div>
        </td>

        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <TaskStatus status={data.status} TaskStatus={ticketStatus} />
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {data.department.name}
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {dateAndTime}
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <ButtonDropdownComponent />
        </td>

        

        <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center gap-x-6 justify-center">
              <button onClick={() => mutationAction.mutate()} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
              
              <TicketStatusUpdate
                title={"Update"}
                icon={<VscGroupByRefType />}
                ticketStatus={ticketStatus}
                actionData={data}
                styleButton="hover:bg-gray-200 bg-gray-50 text-gray-800"
              />
              <DropdownActionMenuButton
                actionData={data}
                icon={
                  <VscGear size={18} className="font-bold" fontWeight={800} />
                }
                styleButton="hover:bg-gray-200 bg-gray-50 text-black rounded"
              />

            </div>
        </td>
      </tr>
    </>
  );
};

const TaskTag = () => {
  return (
    <>
      <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">
        Marketing
      </p>
    </>
  );
};

const TaskStatus = ({ TaskStatus, status }) => {
  if (TaskStatus.PENDING === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-yellow-200 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
          <h2 className="text-sm text-yellow-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.CLOSE === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-green-200 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
          <h2 className="text-sm text-green-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.HOLD === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-blue-200 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          <h2 className="text-sm text-blue-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }

  if (TaskStatus.REJECT === status) {
    return (
      <>
        <div className="inline-flex items-center px-3 py-1 rounded-full gap-4 bg-red-200 dark:bg-gray-800">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
          <h2 className="text-sm text-red-700  font-bold">{status}</h2>
        </div>
      </>
    );
  }
};
