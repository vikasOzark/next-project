export const updateDataSource = (result, boardData, setBoardData) => {
    const dataArray = boardData;

    const selectedCard = dataArray
        .find((board) => board.id === result.source.droppableId)
        .Tasks.find((task) => task.id === result.draggableId);
    const updatedCard = {
        ...selectedCard,
        ["boardId"]: result.destination.droppableId,
    };

    const finalData = dataArray.map((board) => {
        if (board.id === result.source.droppableId) {
            return {
                ...board,
                Tasks: board.Tasks.filter(
                    (task) => task.id !== selectedCard.id
                ),
            };
        }
        if (board.id === updatedCard.boardId) {
            return { ...board, Tasks: [...board.Tasks, updatedCard] };
        }

        return board;
    });
    return finalData;
};
