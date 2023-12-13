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
  VscChevronLeft,
  VscGroupByRefType,
  VscPerson,
  VscPersonAdd,
  VscPulse,
  VscServer,
} from "react-icons/vsc";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { urlRoutes } from "@/utils/urlRoutes";
import { TicketStatusUpdate, statusCss } from "../component/TicketTableMenu";
import { Status } from "prisma/prisma-client";
import { AddTicketNote, AssignedUser } from "./HelperComponents";
import { Button } from "@/components/ui/button";
import { NotesSection } from "./components/NotesSection";
import React from "react";
export const TicketDataContext = React.createContext();

export default function Page({ params }) {
  const { ticketId } = params;
  const router = useRouter();

  const ticketResponse = useQuery(
    {
      queryKey: ticketId,
      queryFn: () => {
        return axios.get(`/api/tickets/${ticketId}`);
      },
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
  const ticketData = ticketResponse.data?.data.data || {};

  return (
    <>
      <TicketDataContext.Provider value={{ ticketData, params }}>
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
        <div className="grid lg:grid-cols-12 md:grid-cols-2 md-grid-cols-1 gap-3">
          <div className="col-span-8">
            {ticketResponse.isLoading ? (
              <div className="flex justify-center">
                <LoadingButton title={"Loading your ticket..."} />
              </div>
            ) : (
              <>
                {" "}
                <TicketDataSection ticketResponse={ticketResponse} />
              </>
            )}
          </div>
          <div className=" col-span-4">
            <div className=" font-bold text-2xl px-3 text-white">
              <h3 className="flex gap-2 items-center ">
                <VscServer size={23} />
                Notes
              </h3>
            </div>
            <NotesSection />
          </div>
        </div>
      </TicketDataContext.Provider>
    </>
  );
}

const TicketDataSection = ({ ticketResponse }) => {
  const ticketData = ticketResponse.data?.data.data || {};

  return (
    <>
      <div className="text-white font-bold">
        <div className="flex justify-end mb-2 gap-2">
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
            className={"bg-red-200"}
            navigateTo={urlRoutes.TICKETS}
          />
        </div>
        <div className="rounded-2xl grid grid-cols-3 gap-3 p-3 border border-gray-800 ">
          <div className="">
            <h3 className="text-gray-400 text-lg">Ticket title</h3>
            <p className=" capitalize">{ticketData.taskTitle}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Department name</h3>
            <p className=" capitalize">{ticketData?.department?.name}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Ticket status</h3>
            <p className={`${statusCss(ticketData?.status, Status, "text")}`}>
              {ticketData?.status}
            </p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Ticket details</h3>
            <p className=" capitalize">{ticketData?.ticketDetil}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Creatd by</h3>
            <p className=" capitalize">
              {ticketData?.createdById?.first_name}{" "}
              {ticketData?.createdById?.last_name}
            </p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Assigned tags</h3>
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
            <h3 className="text-gray-400 text-lg">Created at</h3>
            <p className=" capitalize">
              {handleTimeFormat(ticketData?.createdAt, {
                isFormated: true,
                datePrifix: "/",
                dateTime: true,
              })}
            </p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Creatd by</h3>
            <p className=" capitalize">
              {ticketData?.createdById?.first_name}{" "}
              {ticketData?.createdById?.last_name}
            </p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Assigned person</h3>
            <div className="flex gap-3 items-center mt-2">
              <AssignedUser ticketData={ticketData} />

              <AssignUserAction
                icon={<VscPersonAdd size={18} />}
                title={"Assign people"}
                actionData={ticketData}
                revalidateKey={ticketData.id}
                isAlreadyAssigned={
                  ticketData["assingedUser"] === null ? false : true
                }
                className={
                  "flex gap-2 hover:bg-slate-700 bg-gray-900 transition-all  px-3 py-1 items-center rounded-full"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
