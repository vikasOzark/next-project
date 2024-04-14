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
import { Status } from "@prisma/client";
import { VscSymbolKeyword } from "react-icons/vsc";

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
                        <DropdownMenuItem></DropdownMenuItem>
                        {actionData.isMerged && (
                            <DropdownMenuItem
                                className={
                                    "flex gap-2 items-center cursor-pointer "
                                }
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
                modalTitle={"Append ticket"}
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
    revalidateKey,
}) {
    const queryClient = useQueryClient();
    const mutationAction = useMutation({
        mutationFn: async (status) => {
            toast.loading(`Ticket status is updating...`);
            return axios.post(`/api/tickets/${actionData.id}`, {
                status: status,
            });
        },
        onSuccess: (response) => {
            toast.dismiss();
            queryClient.invalidateQueries(revalidateKey);
            toast.success("Successfully status is updated.");
        },
        onError: async (error) => {
            const err = await error.response.data;
            toast.dismiss();
            toast.error(
                err?.message || "Something went wrong, Please try again."
            );
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
                    className={
                        "hover:bg-gray-200 bg-transparent px-3 py-[3px] flex items-center gap-2 font-medium rounded-full text-gray-300 hover:text-gray-700"
                    }
                >
                    {icon}
                    <span className="hidden md:block lg:block">{title}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#666974] border-gray-400">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {Object.keys(Status).map((status) => (
                        <>
                            {status === actionData.status ? (
                                <DropdownMenuItem
                                    key={status}
                                    className={`flex items-center  hover:bg-[#909091] text-white justify-between ${statusCss(
                                        status
                                    )}`}
                                >
                                    <span className="flex justify-center gap-2">
                                        <VscSymbolKeyword size={18} /> {status}
                                    </span>{" "}
                                    {<VscCheck />}
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    onClick={() =>
                                        mutationAction.mutate(status)
                                    }
                                    key={status}
                                    className={`flex items-center  hover:bg-[#909091] text-white justify-between`}
                                >
                                    <span className="flex justify-center gap-2">
                                        <VscSymbolKeyword size={18} /> {status}
                                    </span>
                                </DropdownMenuItem>
                            )}
                        </>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export const statusCss = (status, classType = "bg") => {
    // if (classType.toUpperCase() === "BG") {
    //     if (Status.PENDING === status) {
    //         return "bg-yellow-300";
    //     } else if (Status.REJECT === status) {
    //         return "bg-red-300";
    //     } else if (Status.CLOSE === status) {
    //         return "bg-green-300";
    //     } else if (Status.PROCESS === status) {
    //         return "bg-violet-300";
    //     } else {
    //         return "bg-blue-300";
    //     }
    // }

    // if (classType.toUpperCase() === "TEXT") {
    //     if (Status.PENDING === status) {
    //         return "text-yellow-300";
    //     } else if (Status.REJECT === status) {
    //         return "text-red-300";
    //     } else if (Status.CLOSE === status) {
    //         return "text-green-300";
    //     } else if (Status.PROCESS === status) {
    //         return "text-violet-300";
    //     } else {
    //         return "text-blue-300";
    //     }
    // }
    return "";
};
