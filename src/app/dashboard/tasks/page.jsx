"use client";
import Editable from "./Editable/Editable";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./Board/Board";
import "./Board/Board.css";
import "./Card/Card.css";
import "./Label/Label.css";
import "./Editable/Editable.css";
import "./Dropdown/Dropdown.css";
import "./Modal/Modal.css";
import { useMutation, useQuery } from "react-query";
import { getBoards, updateBoard } from "@/app/apiFunctions/kanbanBord.api";
import { QUERY_KEYS } from "@/queryKeys";
import TaskLoading from "./loading";
import { updateDataSource } from "./helpers";

export default function TasksPage() {
    const [boardData, setBoardData] = useState([]);
    const { data, isLoading, refetch } = useQuery({
        queryKey: [QUERY_KEYS.KANBAN_BOARDS],
        queryFn: () => getBoards(),
        select: (data) => {
            if (data.success && data?.data.length === 0) {
                return data.data;
            }
            if (data.success && boardData.length === 0) {
                setBoardData(data.data);
            }
        },
        staleTime: 0,
        cacheTime: 0,
    });

    const handleBoardUpdate = useMutation({
        mutationFn: (formData) => updateBoard(formData),
        onSuccess: () => {
            refetch();
        },
    });

    const onDragEnd = (result) => {
        const { source, destination, draggableId: pickedCardId } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId) return;
        setBoardData(updateDataSource(result, boardData, setBoardData));
        handleBoardUpdate.mutate(result);
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="App">
                    <div className="app_outer">
                        <div className="app_boards flex gap-4 text-white">
                            {!isLoading &&
                                boardData?.map((board) => (
                                    <Board key={board.id} board={board} />
                                ))}
                            {!isLoading && <Editable />}
                        </div>
                    </div>
                </div>
            </DragDropContext>
            {isLoading && <TaskLoading />}
        </>
    );
}
