import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
import CreateTaskCard from "../Helpers/AddTaskComponent";
import { useMutation, useQueryClient } from "react-query";
import { deleteBoard } from "@/app/apiFunctions/kanbanBord.api";
import { QUERY_KEYS } from "@/queryKeys";
import toast from "react-hot-toast";
import { VscTarget } from "react-icons/vsc";

export default function Board({ board }) {
    const { Tasks = [], id, boardTitle, boardColor } = board;
    const queryClient = useQueryClient();
    const [show, setShow] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.code === "Enter") setShow(false);
        });
        return () => {
            document.removeEventListener("keypress", (e) => {
                if (e.code === "Enter") setShow(false);
            });
        };
    });

    const { mutate } = useMutation({
        mutationFn: (boardId) => deleteBoard(boardId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.KANBAN_BOARDS],
            });
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <div className="board softer-bg min-w-[20rem] w-[25] max-w-[27rem] rounded-lg">
            <div className="board__top gap-2">
                <div className="gap-1 text-lg  mt-2 mb-4 flex items-center">
                    <VscTarget style={{ color: boardColor }} size={20} />
                    <div className="">
                        <input
                            className=" capitalize focus:outline-none px-2 bg-transparent text-white"
                            autoCapitalize="on"
                            type={"text"}
                            defaultValue={boardTitle}
                            onChange={(e) => {
                                props.setName(e.target.value, id);
                            }}
                        />
                        <span className="soft-bg rounded-full text-sm p-1">
                            {Tasks.length}
                        </span>
                    </div>
                </div>

                <div
                    onClick={() => {
                        setDropdown(true);
                    }}
                >
                    <MoreHorizontal />
                    {dropdown && (
                        <Dropdown
                            className=""
                            onClose={() => {
                                setDropdown(false);
                            }}
                        >
                            <button
                                className="hover:bg-red-400 soft-bg hover:text-white w-full text-red-400 px-2 py-1 rounded-md"
                                onClick={() => mutate(id)}
                            >
                                Delete Board
                            </button>
                        </Dropdown>
                    )}
                </div>
            </div>
            <Droppable droppableId={id.toString()}>
                {(provided) => (
                    <div
                        className="board__cards"
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
