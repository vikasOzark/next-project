// import CustomEditor from "@/components/Editor";
import { useContext, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { TicketDataContext } from "./page";
import { saveMessage } from "@/app/apiFunctions/addMessageNote";
import { Button } from "@/components/ui/button";
import {
    VscCircleSmallFilled,
    VscKebabVertical,
    VscSend,
    VscTrash,
    VscVerified,
} from "react-icons/vsc";
import { QUERY_KEYS } from "@/queryKeys";
import axios from "axios";
import handleTimeFormat from "@/utils/dateTimeFormat";
import OptionsDropdown from "@/components/Dropdown/OptionsDriopdown";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import("@/components/Editor"), {
    ssr: false,
});

export default function MessageThread() {
    const { ticketData } = useContext(TicketDataContext);

    const ticketId = ticketData?.id;
    const { data, isLoading } = useQuery({
        queryFn: () => axios.get(`/api/tickets/${ticketId}/notes`),
        queryKey: [QUERY_KEYS.NOTES],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        enabled: !!ticketId,
    });
    const notes = data?.data.data || [];
    return (
        <div className="">
            <div className="">
                {!isLoading &&
                    notes.map((note) => <Message key={note.id} note={note} />)}
                {isLoading && <ThreadLoading />}
            </div>
            <SendMessage />
        </div>
    );
}

const SendMessage = () => {
    const { ticketData } = useContext(TicketDataContext);
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const editorRef = useRef(null);
    const { mutate, isLoading } = useMutation({
        mutationFn: saveMessage,
        onSuccess: () => {
            editorRef.current;
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.NOTES],
            });
        },
    });

    const handleSend = () => {
        if (message !== "") {
            mutate({
                ticketId: ticketData.id,
                formData: {
                    note: message,
                    id: ticketData.id,
                },
            });
        }
    };

    // /**
    //  * @param {WindowEventHandlers} event
    //  */
    // const handleMessage = (event) => {
    //     const { key, ctrlKey } = event;
    //     if (key === "Enter" && ctrlKey && message !== "") {
    //         handleSend();
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener("keyup", handleMessage);
    //     return () => window.removeEventListener("keyup", handleMessage);
    // });

    const content = {};
    if (message !== "") {
        content.initialContent = message;
    }

    return (
        <div className="space-y-2 ">
            <div className="flex justify-between items-center border rounded-lg border-gray-700 bg-gray-700/25">
                <CustomEditor
                    ref={editorRef}
                    className={"min-h-[5em] h-[5em] w-full "}
                    onChange={setMessage}
                    editorProps={content}
                />
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={handleSend}
                    disabled={isLoading}
                    className={
                        "gap-2 border m-1 rounded-md hover:border-2 border-blue-600 font-bold text-blue-600"
                    }
                >
                    {isLoading ? "Sending..." : "Send"}
                    <VscSend />
                </Button>
            </div>
        </div>
    );
};

const Message = ({ note }) => {
    const { ticketData } = useContext(TicketDataContext);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: () => {
            return axios.delete(
                `/api/tickets/${ticketData.id}/notes/${note.id}`
            );
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.NOTES],
            }),
    });

    return (
        <div className="rounded-lg space-y-2 mb-2 border group p-2 border-gray-700 bg-gray-700/25 text-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm flex items-center gap-2 font-bold">
                        <VscVerified size={18} />
                        {note?.createdBy?.first_name}{" "}
                        {note?.createdBy?.last_name}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                        <span className="flex items-center gap-2 text-sm text-gray-400">
                            <VscCircleSmallFilled size={16} />
                            {handleTimeFormat(note?.createdAt || "", {
                                isFormated: true,
                                dateTime: true,
                            })}
                        </span>
                    </span>
                </div>
                <div className="group:block text-gray-400 ">
                    <OptionsDropdown
                        bodyClass={"w-[8rem]"}
                        icon={<VscKebabVertical />}
                    >
                        <button
                            className="hover:bg-red-400 flex items-center gap-1 justify-center  hover:text-white w-full text-red-400 px-2 py-1 rounded-md"
                            onClick={mutate}
                        >
                            <VscTrash />
                            Delete
                        </button>
                    </OptionsDropdown>
                </div>
            </div>
            <div className=" text-gray-300 text-sm">
                <CustomEditor
                    className={" w-full h-[5em] p-0 "}
                    editable={false}
                    editorProps={{
                        initialContent: JSON.parse(note?.note || ""),
                    }}
                />
            </div>
        </div>
    );
};

const ThreadLoading = () => {
    return (
        <>
            <div className="rounded-lg mb-2  bg-gray-700/25 p-2 ">
                <div className="h-[2em] w-[9em] bg-gray-500 animate-pulse rounded-md mb-1"></div>
                <div className=" text-gray-300 text-sm h-[3em] bg-gray-500 rounded-md animate-pulse"></div>
            </div>
            <div className="rounded-lg mb-2  bg-gray-700/25 p-2 ">
                <div className="h-[2em] w-[7em] bg-gray-500 animate-pulse rounded-md mb-1"></div>
                <div className=" text-gray-300 text-sm h-[3em] bg-gray-500 rounded-md animate-pulse"></div>
            </div>
            <div className="rounded-lg mb-2 bg-gray-700/25 p-2 ">
                <div className="h-[2em] w-[9em] bg-gray-500 animate-pulse rounded-md mb-1"></div>
                <div className=" text-gray-300 text-sm h-[3em] bg-gray-500 rounded-md animate-pulse"></div>
            </div>
        </>
    );
};
