import { patchRequest } from "@/app/apiFunctions/api";
import { cn } from "@/lib/utils";
import { QUERY_KEYS } from "@/queryKeys";
import { VscChromeClose, VscLoading } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

export default function Tag({ tag, className, ticketData }) {
    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: () => {
            return patchRequest({
                url: `tickets/${ticketData.id}/tag`,
                formData: {
                    tagId: tag.id,
                },
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_DETAIL, ticketData.id],
            });
        },
    });

    return (
        <div
            className={cn(
                "px-2 mb-1 w-fit flex items-center justify-between gap-3 cursor-pointer group hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-full ",
                tag.color,
                className
            )}
        >
            {tag.title}{" "}
            <span className="hover:bg-gray-500 hover:bg-text-700 rounded-full p-1 ">
                {isLoading ? (
                    <VscLoading className=" animate-spin" size={15} />
                ) : (
                    <VscChromeClose onClick={mutate} size={15} />
                )}
            </span>
        </div>
    );
}

export const TagLabel = ({ title, color }) => {
    return (
        <div
            style={{ backgroundColor: color }}
            className={
                "px-2 mb-1 w-fit flex items-center justify-between gap-3 cursor-pointer group hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-full "
            }
        >
            {title}
        </div>
    );
};

export const TagComponent = ({ title, color }) => {
    return (
        <div
            className={cn(
                "px-2 mb-1 w-fit flex items-center justify-between gap-3 cursor-pointer group hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-full ",
                color
            )}
        >
            {title}
        </div>
    );
};

export const TagComponentWithRemove = ({ tag, handler, className }) => {
    return (
        <div
            className={cn(
                "px-2 mb-1 w-fit flex items-center justify-between gap-3 cursor-pointer group hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-full ",
                tag.color,
                className
            )}
        >
            {tag.title}{" "}
            <span
                onClick={() => handler(tag)}
                className="hover:bg-gray-500 hover:bg-text-700 rounded-full p-1 "
            >
                {handler && <VscChromeClose size={15} />}
            </span>
        </div>
    );
};
