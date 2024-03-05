import { useQueryClient, useMutation } from "react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

export const useUpdateTicket = (
    setSelectedTag,
    selectedTag,
    formElement,
    ticketId
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ event, detail }) => {
            event.preventDefault();
            const ticketData = {
                ticketId: ticketId,
                taskTitle: event.target.taskTitle.value,
                ticketDetil: detail,
                department: event.target.department.value,
                tags: selectedTag,
            };

            return axios.patch(`/api/tickets`, ticketData);
        },
        onError: (error) => {
            const err = JSON.parse(error.request.response);
            toast.error(err.message);
        },

        onSuccess: (data, data2, data3) => {
            toast.success("Ticket is created.");
            queryClient.invalidateQueries({
                queryKey: ["ticket-detail", ticketId],
            });

            setSelectedTag([]);
            formElement.current.reset();
        },
    });
};
