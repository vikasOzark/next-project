import { LoadingState } from "@/components/Buttons";
import axios from "axios";
import { redirect } from "next/navigation";
import toast, { LoaderIcon } from "react-hot-toast";
import { VscDebugStepBack, VscTrash } from "react-icons/vsc";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import { getUsersData } from "../user-management/components/Forms/userUtils";

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
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong, Please try again.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(revalidateKey);
      toast.dismiss();
      toast.success("Successfully ticket is deleted.");

      if (navigateTo) {
        redirect(navigateTo);
      }
    },
  });

  return (
    <>
      {mutationAction.isLoading ? (
        <LoadingState title={"Deleting..."} />
      ) : (
        <div className="">
          <button
            onClick={() => mutationAction.mutate()}
            className={twMerge(
              `hover:bg-red-400 text-red-400 flex gap-2 px-3 items-center  rounded-full transition-colors duration-200  hover:text-white focus:outline-none`,
              className
            )}
          >
            <VscTrash size={18} />
            <span className="hidden md:block lg:block">{title}</span>
          </button>
        </div>
      )}
    </>
  );
};

export function AssignUserAction({
  className,
  icon,
  title,
  actionData,
  revalidateKey,
  isAlreadyAssigned = false,
}) {
  const queryClient = useQueryClient();
  const usersResponse = useQuery("users-list", getUsersData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const usersData = usersResponse.data?.data || [];

  const mutationAction = useMutation({
    mutationFn: async (userId) => {
      toast.loading("Assigning person in process...");
      return axios.patch(
        `/api/tickets/${actionData.id}/?operationTo=user_assignment&assignedUserId=${userId}`,
        {}
      );
    },
    onError: async (error) => {
      const err = await error.response.data;
      toast.dismiss();
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.dismiss();
      queryClient.invalidateQueries(revalidateKey);
      toast.success("Successfully person assigned.");
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isAlreadyAssigned ? (
          <Button
            className={twMerge(
              "px-4 flex gap-2 items-center font-bold",
              className
            )}
          >
            <VscDebugStepBack size={18} />
            <span className="hidden md:block lg:block">Change person</span>
          </Button>
        ) : (
          <Button
            className={twMerge(
              "px-4 flex gap-2 items-center font-bold",
              className
            )}
          >
            {icon}
            <span className="hidden md:block lg:block">{title}</span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title} Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {usersData.map((user) => (
            <DropdownMenuItem
              key={user.id}
              onClick={() => mutationAction.mutate(user.id)}
            >
              {user.first_name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
