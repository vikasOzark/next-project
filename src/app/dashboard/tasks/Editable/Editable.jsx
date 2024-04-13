import React, { useRef, useState } from "react";
import { Plus, X } from "react-feather";
import "./Editable.css";
import { useMutation, useQueryClient } from "react-query";
import { createBoard } from "@/app/apiFunctions/kanbanBord.api";
import toast from "react-hot-toast";
import { QUERY_KEYS } from "@/queryKeys";
import { useOnClickOutside } from "@/hooks/modalClose.hook";
import { VscAdd, VscLoading } from "react-icons/vsc";
import ColorPickerDropDown from "@/components/Dropdown/ColorPickerDropdown";

const Editable = () => {
    const [show, setShow] = useState(false);
    const [color, setColor] = useState("");
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (formData) => createBoard(formData),
        onSuccess: (data) => {
            toast.success(data?.message || "Board created.");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
        },
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const boardTitle = e.target.boardName.value;

        if (boardTitle) {
            mutation.mutate({ boardTitle, color });
        }
        setShow(false);
    };

    return (
        <div className={``}>
            {show && (
                <form onSubmit={handleOnSubmit}>
                    <div
                        className={`min-w-[20rem] w-[25] softer-bg p-1 rounded-md max-w-[27rem]`}
                    >
                        <div className="flex">
                            <input
                                placeholder={"Board title"}
                                autoFocus
                                id={"edit-input"}
                                name="boardName"
                                className="w-full bg-transparent outline-none  px-3"
                                type={"text"}
                            />
                            <ColorPickerDropDown
                                color={color}
                                setColor={setColor}
                            />
                        </div>
                        <div className="flex gap-2 mt-1 items-center justify-end">
                            <X
                                size={18}
                                className="text-red-400 text-sm hover:soft-bg cursor-pointer rounded"
                                onClick={() => setShow(false)}
                            />
                            <button
                                className="flex gap-2 text-sm hover:soft-bg px-2 py-1 rounded"
                                type="submit"
                            >
                                Add board
                            </button>
                        </div>
                    </div>
                </form>
            )}
            {!mutation.isLoading && !show && (
                <div
                    className=" cursor-pointer h-10 justify-center p-1 min-w-[20rem] w-[25] max-w-[27rem] flex gap-2 items-center softer-bg rounded-md px-2"
                    onClick={() => setShow(true)}
                >
                    <VscAdd size={20} />
                    Add board
                </div>
            )}
            {mutation.isLoading && !show && (
                <div className=" cursor-pointer  justify-center p-1 min-w-[20rem] w-[25] max-w-[27rem] flex gap-2 items-center softer-bg rounded-md px-2">
                    <span className=" font-bold flex items-center gap-2">
                        <VscLoading className=" animate-spin" /> Creating...
                    </span>
                </div>
            )}
        </div>
    );
};

export default Editable;
