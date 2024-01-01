import React, { useContext } from "react";
import { VscDiscard, VscGitCommit, VscTrash } from "react-icons/vsc";
import { TicketDataContext } from "../page";
import { statusCss } from "../../component/TicketTableMenu";
import { Status } from "@prisma/client";
import handleTimeFormat from "@/utils/dateTimeFormat";
import Link from "next/link";
import { urlRoutes } from "@/utils/urlRoutes";
import { useMutation, useQueryClient } from "react-query";
import { LoadingState } from "@/components/Buttons";
import toast from "react-hot-toast";
import { HiArrowUpRight } from "react-icons/hi2";
import { RxScissors } from "react-icons/rx";

export default function MergedTicketCard({ ticketData }) {
  return (
    <>
      <div className="flex group justify-end items-center transition-all gap-2 relative ">
        <div className="flex items-center">
          <div className="text-white top-10 grid items-center place-content-center">
            {/* <p className="text-lg font-bold text-green-500">Merged Ticket</p> */}
            <VscGitCommit size={40} className="w-full" />
          </div>
        </div>

        <div className="soft-bg md:w-2/3 lg:w-2/3 flex justify-between items-center border-transparent hover:border-green-500 rounded-lg mt-2 p-2 text-white font-bold">
          <div className="grid grid-cols-3 gap-3">
            <div className="">
              <h3
                className="text-gray-400 text-sm 
                "
              >
                Ticket title
              </h3>
              <p className=" capitalize text-sm  ">{ticketData.taskTitle}</p>
            </div>
            <div className="">
              <h3
                className="text-gray-400 text-sm 
                "
              >
                Ticket status
              </h3>
              <p className={`${statusCss(ticketData?.status, Status, "text")}`}>
                {ticketData?.status}
              </p>
            </div>
            <div className="">
              <h3
                className="text-gray-400 text-sm 
                "
              >
                Created at
              </h3>
              <p className=" capitalize text-sm  ">
                {handleTimeFormat(ticketData?.createdAt, {
                  isFormated: true,
                  datePrifix: "/",
                  dateTime: true,
                })}
              </p>
            </div>
          </div>

          <div className="flex-row items-center  place-content-center ">
            <RemoveMergeTicket ticketData={ticketData} />
            <div className="mt-2 flex justify-center">
              <Link
                className="text-center hover:underline flex items-center gap-2 hover:text-blue-500 "
                href={`${urlRoutes.TICKETS}/${ticketData.id}`}
              >
                <HiArrowUpRight /> See details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const RemoveMergeTicket = ({ ticketData }) => {
  const { params } = useContext(TicketDataContext);
  const queryClient = useQueryClient();

  const removeChildTicket = useMutation({
    mutationKey: "remove-ticket",
    mutationFn: async (event) => {
      const response = await fetch(
        `/api/tickets/merge/${params.ticketId}/remove`,
        {
          method: "PATCH",
          body: JSON.stringify({ ticketId: ticketData.id }),
        }
      );
      return await response.json();
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      queryClient.invalidateQueries(params.ticketId);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      {removeChildTicket.isLoading ? (
        <div
          title="Removing tickets from merge."
          className="flex items-center top-5 right-3"
        >
          <LoadingState cssClass={"p-0"} />
        </div>
      ) : (
        <div
          onClick={removeChildTicket.mutate}
          className=" hover:border-red-600 hover:border border border-transparent px-4 cursor-pointer transition-all top-5 flex gap-1 items-center rounded-full right-3 p-1 hover:text-red-500"
        >
          <RxScissors size={18} /> Remove
        </div>
      )}
    </>
  );
};
