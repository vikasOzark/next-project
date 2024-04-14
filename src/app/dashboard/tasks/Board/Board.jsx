import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
import CreateTaskCard from "../Helpers/AddTaskComponent";
import { useMutation, useQueryClient } from "react-query";
import {
    deleteBoard,
    updateBoardWithId,
} from "@/app/apiFunctions/kanbanBord.api";
import { QUERY_KEYS } from "@/queryKeys";
import toast from "react-hot-toast";
import {
    VscCode,
    VscKebabVertical,
    VscTarget,
    VscTrash,
} from "react-icons/vsc";
import ColorPickerDropDown from "@/components/Dropdown/ColorPickerDropdown";
import { useOnClickOutside } from "@/hooks/modalClose.hook";
import OptionsDropdown from "@/components/Dropdown/OptionsDriopdown";

export default function Board({ board }) {
    const { Tasks = [], id, boardTitle, boardColor } = board;
    const queryClient = useQueryClient();
    const [dropdown, setDropdown] = useState(false);
    const [showColorPicker, setColorPicker] = useState(false);
    const [color, setColor] = useState("");
    const pickerRef = useRef(null);

    const { mutate } = useMutation({
        mutationFn: (boardId) => deleteBoard(boardId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
            data.success
                ? toast.success(data.message)
                : toast.error(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { mutate: updateTitleMutation } = useMutation({
        mutationFn: (actionPayload) => updateBoardWithId(actionPayload),
        onSuccess: (data) => {
            setColor("");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
            data.success
                ? toast.success(data.message)
                : toast.error(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    /**
     * @param {Event} event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const boardTitle = event.currentTarget.boardTitle.value;
        const payload = {
            boardId: id,
            formData: { boardTitle, boardColor: color },
        };
        updateTitleMutation(payload);
    };

    useOnClickOutside({ ref: pickerRef, handler: () => setColorPicker(false) });

    return (
        <div className="board softer-bg min-w-[20rem] w-[25] max-w-[27rem] rounded-lg">
            <div className="board__top gap-2">
                <form onSubmit={handleSubmit}>
                    <div className="gap-1 text-lg  mt-2 mb-4 flex items-center">
                        <VscTarget style={{ color: boardColor }} size={20} />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <input
                                    onClick={() => setColorPicker(true)}
                                    className=" capitalize focus:outline-none px-2 bg-transparent text-white"
                                    autoCapitalize="on"
                                    type={"text"}
                                    name="boardTitle"
                                    defaultValue={boardTitle}
                                />
                                <div ref={pickerRef}>
                                    <ColorPickerDropDown
                                        color={color}
                                        setColor={setColor}
                                        className={`h-8 w-8 ${
                                            showColorPicker
                                                ? "visible"
                                                : " invisible"
                                        }`}
                                    />
                                </div>
                            </div>
                            <span className="soft-bg rounded-full text-sm p-1">
                                {Tasks.length}
                            </span>
                        </div>
                    </div>
                </form>

                <div
                    onClick={() => {
                        setDropdown(true);
                    }}
                >
                    <OptionsDropdown icon={<VscKebabVertical />}>
                        <button
                            className="hover:bg-red-400 flex items-center gap-1 justify-center hover:text-white w-full text-red-400 px-2 py-1 rounded-md"
                            onClick={() => mutate(id)}
                        >
                            <VscTrash />
                            Delete board
                        </button>
                    </OptionsDropdown>
                </div>
            </div>
            <Droppable droppableId={id.toString()}>
                {(provided) => (
                    <div
                        className=""
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {Tasks?.map((items, index) => (
                            <Card
                                bid={id}
                                id={items.id}
                                index={index}
                                key={items.id}
                                title={items.taskTitle}
                                tags={items.tags}
                                card={items}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="board__footer">
                <CreateTaskCard boardId={id} />
            </div>
        </div>
    );
}
