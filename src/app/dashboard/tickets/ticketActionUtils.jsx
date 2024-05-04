import { ButtonComponent, LoadingState } from "@/components/Buttons";
import axios from "axios";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import {
    VscChevronRight,
    VscDebugStepBack,
    VscPersonAdd,
    VscTrash,
} from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsersData } from "../user-management/components/Forms/userUtils";
import { QUERY_KEYS } from "@/queryKeys";

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
        <ButtonComponent
            onClick={() => mutationAction.mutate()}
            title={title}
            className={"hover:bg-red-400 text-red-400 hover:text-white w-auto"}
            isLoading={mutationAction.isLoading}
            icon={<VscTrash size={18} />}
        />
    );
};

export function AssignUserAction({ className, actionData }) {
    const queryClient = useQueryClient();
    const usersResponse = useQuery(QUERY_KEYS.USERS, getUsersData, {
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
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_DETAIL, actionData.id],
            });
            toast.success("Successfully person assigned.");
        },
    });
    const hasUsersData = Object.keys(actionData).length > 0;

    return (
        <>
            {hasUsersData && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {actionData?.assingedUserId !== null ? (
                            <Button
                                className={twMerge(
                                    "px-4 flex gap-2 items-center font-bold",
                                    className
                                )}
                            >
                                <span className="flex gap-2 items-center">
                                    <VscDebugStepBack size={18} />
                                    <span className="hidden md:block lg:block">
                                        {actionData?.assingedUser?.first_name}{" "}
                                        {actionData?.assingedUser?.last_name}
                                    </span>
                                </span>
                                <VscChevronRight size={18} />
                            </Button>
                        ) : (
                            <Button
                                className={twMerge(
                                    "px-4 flex gap-2 items-center font-bold",
                                    className
                                )}
                            >
                                <VscPersonAdd size={18} />
                                <span className="hidden md:block lg:block">
                                    Assign people
                                </span>
                            </Button>
                        )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-[#1f1e24] border-0 p-2 w-[10rem]">
                        <DropdownMenuGroup>
                            {usersData.map((user) => (
                                <DropdownMenuItem
                                    key={user.id}
                                    onClick={() =>
                                        mutationAction.mutate(user.id)
                                    }
                                >
                                    {user.first_name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
