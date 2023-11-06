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
import { useContext, useState } from "react";
import { VscCheck } from "react-icons/vsc";
import { useMutation } from "react-query";
import { twMerge } from "tailwind-merge";
import { RefreshContext } from "./components";
import toast from "react-hot-toast";
import Modal from "@/components/Modal";
import UpdateTicketForm from "./forms/UpdateTicketForm";

export function DropdownActionMenuButton({
  styleButton,
  icon,
  title,
  actionData,
}) {
  const [updateTicketModal, setTicketUpdateModal] = useState(false)
  
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
            <DropdownMenuItem onClick={() => setTicketUpdateModal(true)}>Edit ticket</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal open={updateTicketModal} setOpen={setTicketUpdateModal} modalTitle={"Update ticket"} >
        <UpdateTicketForm ticketData={actionData}  />
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
}) {
  const contextFunction = useContext(RefreshContext);

  const mutationAction = useMutation({
    mutationFn: async (status) => {
      return axios.post(`/api/tickets/${actionData.id}`, { status: status });
    },
    onSettled: async (response) => {
      if (response) {
        if (response.data.success) {
          contextFunction();
          toast.success(
            response.data?.message || "Successfully status is updated."
          );
        } else {
          toast.error(
            response.data?.message || "Something went wrong while updating."
          );
        }
      }
    },
  });

  const statusCss = (status) => {
    if (ticketStatus.PENDING === status) {
      return "bg-yellow-300";
    } else if (ticketStatus.REJECT === status) {
      return "bg-red-300";
    } else if (ticketStatus.CLOSE === status) {
      return "bg-green-300";
    } else {
      return "bg-blue-300";
    }
  };

  return (
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
          {Object.keys(ticketStatus).map((status) => (
            <>
              {status === actionData.status ? (
                <DropdownMenuItem
                  key={status}
                  className={`flex items-center justify-between ${statusCss(
                    status
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
