import { VscChromeClose } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

export default function Tag({ tag, ticketId, queryKey }) {
    const queryClient = useQueryClient();
    const mutationTagRemove = useMutation({
        mutationFn: async (tagId) => {
            toast.loading("Removing tag...");
            const response = await fetch(
                `/api/tickets/${ticketId}/?operationTo=tag&tagId=${tagId}`,
                { method: "PATCH" }
            );
            const json_response = await response.json();
            return json_response;
        },
        onError: (errorResponse) => {
            toast.dismiss();
            toast.error(errorResponse.message);
        },
        onSuccess: (response) => {
            toast.dismiss();
            if (!response.success) {
                toast.error(error.message);
            }
            queryClient.invalidateQueries(queryKey);
            toast.success(response.message);
        },
    });
    return (
        <p
            className={`${tag.color} rounded-full flex justify-betweeN items-center gap-2 px-2 font-bold text-white`}
            key={tag.id}
        >
            {tag.title}
            <VscChromeClose
                onClick={() => mutationTagRemove.mutate(tag.id)}
                className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[3px] cursor-pointer w-5"
            />{" "}
        </p>
    );
}
