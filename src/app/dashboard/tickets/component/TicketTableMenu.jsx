import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useState } from "react";
import { VscAdd, VscCheck, VscEdit, VscPlug } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import UpdateTicketForm from "./forms/UpdateTicketForm";
import { AppendChildToMergeForm } from "./forms/AppendMergeChild";

export function DropdownActionMenuButton({
  styleButton,
  icon,
  title,
  actionData,
}) {
  const [updateTicketModal, setTicketUpdateModal] = useState(false);
  const [appendTicketModal, setTicketAppendModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={twMerge(
              "px-4 flex gap-2 items-center font-bold hover-bg-gray-500",
              styleButton
            )}
          >
            {icon}
            {title}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{title} Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={"flex gap-2 items-center cursor-pointer "}
              onClick={() => setTicketUpdateModal(true)}
            >
              <VscEdit /> Edit ticket
            </DropdownMenuItem>
            {actionData.isMerged && (
              <DropdownMenuItem
                className={"flex gap-2 items-center cursor-pointer "}
                onClick={() => setTicketAppendModal(true)}
              >
                <VscAdd /> Append ticket
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        cssClass={"min-w-fit"}
        className=" "
        open={updateTicketModal}
        setOpen={setTicketUpdateModal}
        modalTitle={"Update ticket"}
      >
        <UpdateTicketForm ticketData={actionData} />
      </Modal>
      <Modal
        cssClass={"min-w-fit"}
        className=" "
        open={appendTicketModal}
        setOpen={setTicketAppendModal}
        modalTitle={"Update ticket"}
      >
        <AppendChildToMergeForm ticketData={actionData} />
      </Modal>
    </>
  );
}

export function TicketStatusUpdate({
  styleButton,
  icon,
  title,
  actionData,
  ticketStatus,
  revalidateKey,
}) {
  const queryClient = useQueryClient();
  const mutationAction = useMutation({
    mutationFn: async (status) => {
      toast.loading(`Ticket status is updating...`);
      return axios.post(`/api/tickets/${actionData.id}`, { status: status });
    },
    onSuccess: (response) => {
      toast.dismiss();
      queryClient.invalidateQueries(revalidateKey);
      toast.success("Successfully status is updated.");
    },
    onError: async (error) => {
      const err = await error.response.data;
      toast.dismiss();
      toast.error(err?.message || "Something went wrong, Please try again.");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          // disabled={}
          title={
            actionData.isMerged &&
            "Ticket will automatically closed when sub child tickets will closed."
          }
          className={twMerge(
            "px-4 flex gap-2 items-center font-bold hover-bg-gray-500",
            styleButton
          )}
        >
          {icon}
          <span className="hidden md:block lg:block">{title}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title} Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {Object.keys(ticketStatus).map((status) => (
            <>
              {status === actionData.status ? (
                <DropdownMenuItem
                  key={status}
                  className={`flex items-center justify-between ${statusCss(
                    status,
                    ticketStatus
                  )}`}
                >
                  {status} {<VscCheck />}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => mutationAction.mutate(status)}
                  key={status}
                  className={` flex items-center justify-between$`}
                >
                  {status}
                </DropdownMenuItem>
              )}
            </>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const statusCss = (status, ticketStatus, classType = "bg") => {
  if (classType.toUpperCase() === "BG") {
    if (ticketStatus.PENDING === status) {
      return "bg-yellow-300";
    } else if (ticketStatus.REJECT === status) {
      return "bg-red-300";
    } else if (ticketStatus.CLOSE === status) {
      return "bg-green-300";
    } else {
      return "bg-blue-300";
    }
  }

  if (classType.toUpperCase() === "TEXT") {
    if (ticketStatus.PENDING === status) {
      return "text-yellow-300";
    } else if (ticketStatus.REJECT === status) {
      return "text-red-300";
    } else if (ticketStatus.CLOSE === status) {
      return "text-green-300";
    } else {
      return "text-blue-300";
    }
  }
  return "";
};
