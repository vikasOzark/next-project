import React, { useContext } from "react";
import { VscGitCommit, VscIndent } from "react-icons/vsc";
import { TicketDataContext } from "../page";
import { statusCss } from "../../component/TicketTableMenu";
import { Status } from "@prisma/client";
import handleTimeFormat from "@/utils/dateTimeFormat";
import Link from "next/link";
import { urlRoutes } from "@/utils/urlRoutes";

export default function MergedTicketCard({ ticketData }) {
  return (
    <>
      <Link href={`${urlRoutes.TICKETS}/${ticketData.id}`}>
        <div className="flex justify-end gap-2 ">
          <div className="flex items-center">
            <div className="text-white top-10 grid items-center place-content-center">
              {/* <p className="text-lg font-bold text-green-500">Merged Ticket</p> */}
              <VscGitCommit size={50} className="w-full" />
            </div>
          </div>
          <div className="soft-bg md:w-2/3 lg:w-2/3 border border-transparent hover:border-green-500 rounded-lg mt-2 p-2 text-white font-bold">
            <div className="grid grid-cols-3 gap-3">
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
                  Ticket status
                </h3>
                <p
                  className={`${statusCss(ticketData?.status, Status, "text")}`}
                >
                  {ticketData?.status}
                </p>
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
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
