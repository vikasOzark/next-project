import { deleteTask } from "@/app/apiFunctions/kanboardTask.api";
import OptionsDropdown from "@/components/Dropdown/OptionsDriopdown";
import { QUERY_KEYS } from "@/queryKeys";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MoreHorizontal } from "react-feather";
import toast from "react-hot-toast";
import {
    VscCode,
    VscKebabVertical,
    VscSymbolField,
    VscTrash,
} from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

const Card = ({ id, index, title }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (taskId) => deleteTask(taskId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
            data.success
                ? toast.success(data.message)
                : toast.error(data.message);
        },
    });

    return (
        <Draggable
            key={id.toString()}
            draggableId={id.toString()}
            index={index}
        >
            {(provided) => (
                <>
                    <div
                        className="custom__card bg-gray-600 rounded-lg p-1"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <div className="card__text">
                            <p className=" flex gap-2 text-lg items-center">
                                <VscSymbolField />
                                {title}
                            </p>
                            <div>
                                <OptionsDropdown
                                    bodyClass={"w-[8rem]"}
                                    icon={<VscKebabVertical />}
                                >
                                    <button
                                        className="hover:bg-red-400 flex items-center gap-1 justify-center  hover:text-white w-full text-red-400 px-2 py-1 rounded-md"
                                        onClick={() => mutate(id)}
                                    >
                                        <VscTrash />
                                        Delete
                                    </button>
                                </OptionsDropdown>
                            </div>
                        </div>
                        {provided.placeholder}
                    </div>
                </>
            )}
        </Draggable>
    );
};

export default Card;
