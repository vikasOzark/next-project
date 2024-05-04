import AlertDialogComponent from "@/components/AlertDialogComponent";
import { ButtonComponent } from "@/components/Buttons";
import { QUERY_KEYS } from "@/queryKeys";
import axios from "axios";
import toast from "react-hot-toast";
import { VscTrash } from "react-icons/vsc";

import { useMutation, useQueryClient } from "react-query";

export const BulkTicketDeleteButton = ({ ticketIds }) => {
    const queryClient = useQueryClient();

    const mutationAction = useMutation({
        mutationFn: async () => {
            toast.loading("Deleting ticket...");
            return axios.delete(`/api/tickets/`, { data: { ticketIds } });
        },
        onError: () => {
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_LIST],
            });
            toast.dismiss();
            toast.success("Tickets has been deleted.");
        },
    });

    return (
        <AlertDialogComponent onClick={() => mutationAction.mutate()}>
            <ButtonComponent
                className={
                    "hover:bg-red-400 text-red-400 hover:text-white w-auto"
                }
                isLoading={mutationAction.isLoading}
                icon={<VscTrash size={18} />}
            />
        </AlertDialogComponent>
    );
};
