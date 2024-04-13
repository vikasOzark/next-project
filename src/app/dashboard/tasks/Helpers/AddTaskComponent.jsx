import { createTask } from "@/app/apiFunctions/kanboardTask.api";
import { useOnClickOutside } from "@/hooks/modalClose.hook";
import { QUERY_KEYS } from "@/queryKeys";
import { useRef, useState } from "react";
import { Plus, X } from "react-feather";
import toast from "react-hot-toast";
import { VscLoading } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

export default function CreateTaskCard({ boardId }) {
    const [show, setShow] = useState(false);
    const queryClient = useQueryClient();
    const inputRef = useRef(null);

    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => createTask(formData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
            data.success
                ? toast.success(data.message)
                : toast.error(data.message);
        },
    });

    /**
     * @param {HTMLFormElement} event
     */
    const handleOnSubmit = (event) => {
        event.preventDefault();
        const taskTitle = event.currentTarget.taskTitle.value;

        const taskPayload = {
            taskTitle,
            boardId,
        };
        mutate(taskPayload);
        setShow(false);
    };

    useOnClickOutside({ ref: inputRef, handler: () => setShow(false) });

    return (
        <div className={``} ref={inputRef}>
            {show && !isLoading && (
                <form onSubmit={handleOnSubmit}>
                    <div
                        className={`soft-bg rounded-md m-1 p-1 text-center flex items-center justify-center cursor-pointer `}
                    >
                        <input
                            placeholder={"something..."}
                            autoFocus
                            id={"edit-input"}
                            type={"text"}
                            name="taskTitle"
                            className="bg-transparent w-full rounded-lg outline-none p-1 border-slate-700"
                        />
                        <div className="flex gap-2 items-center justify-end">
                            <X
                                size={18}
                                className="text-red-400 text-sm hover:soft-bg cursor-pointer rounded"
                                onClick={() => {
                                    setShow(false);
                                }}
                            />
                            <button
                                className="flex gap-2 text-sm hover:soft-bg px-2 py-1 rounded"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {!isLoading && !show && (
                <div className="w-full">
                    <div
                        className="flex gap-2 items-center soft-bg rounded-md m-1 p-1 text-center justify-center cursor-pointer hover:bg-gray-600`"
                        onClick={() => {
                            setShow(true);
                        }}
                    >
                        <Plus /> Add
                    </div>
                </div>
            )}
            {isLoading && (
                <div className="w-full">
                    <div className="flex gap-2 items-center soft-bg rounded-md m-1 p-1 text-center justify-center cursor-pointer hover:bg-gray-600`">
                        <VscLoading className=" animate-spin" /> Adding...
                    </div>
                </div>
            )}
        </div>
    );
}
