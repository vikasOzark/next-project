import { LoadingState } from "@/components/Buttons";
import axios from "axios";
import { redirect } from "next/navigation";
import toast, { LoaderIcon } from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

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
import { VscCheck } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

export const TicketDeleteButton = ({
  ticketId,
  title,
  revalidateKey,
  className,
  navigateTo = null,
}) => {
  const queryClient = useQueryClient();

  const mutationAction = useMutation({
    mutationFn: async () => {
      toast.loading("Deleting ticket...");
      return axios.delete(`/api/tickets/${ticketId}`);
    },
    onSettled: async (response) => {
      if (response) {
        toast.remove();
        if (response.data.success) {
          toast.success(
            response.data?.message || "Ticket is deleted Successfully."
          );
        } else {
          console.log("called else in settled");
          toast.error(
            response.data?.message || "Something went wrong while deleting."
          );
        }
      }
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: [revalidateKey] });
      toast.remove();
    },
    onSuccess: () => {
      if (navigateTo) {
        redirect(navigateTo);
      }
      queryClient.invalidateQueries({ queryKey: [revalidateKey] });
    },
  });

  return (
    <>
      {mutationAction.isLoading ? (
        <LoadingState />
      ) : (
        <button
          onClick={() => mutationAction.mutate()}
          className={twMerge(
            `text-gray-500 flex gap-2 border px-3 py-1 items-center border-gray-800 rounded-full transition-colors duration-200 text-lg dark:hover:text-red-500 hover:border-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none`,
            className
          )}
        >
          <VscTrash size={18} />
          {title}
        </button>
      )}
    </>
  );
};

export function AssignUserAction({
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
      toast.loading(`Assigning is in processing...`);
      return axios.post(
        `/api/tickets/${actionData.id}/?operationTo=user_assignment`,
        { status: status }
      );
    },
    onSettled: async (response) => {
      if (response) {
        if (response.data.success) {
          router.refresh();
          toast.dismiss();
          toast.success(
            response.data?.message || "Successfully status is updated."
          );
        } else {
          toast.dismiss();
          toast.error(
            response.data?.message || "Something went wrong while updating."
          );
        }
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [revalidateKey] }),
    onError: (error) => {
      toast.dismiss();
      toast.error(
        error?.request?.response.message ||
          "Something went wrong, Please try again."
      );
    },
  });

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
