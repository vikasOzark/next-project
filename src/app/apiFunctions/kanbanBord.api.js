export async function createBoard(formData) {
    return new Promise((resolve, reject) => {
        return fetch("/api/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((data) => data.json())
            .then(resolve)
            .catch((error) => reject(error.data));
    });
}

export async function getBoards() {
    return new Promise((resolve, reject) => {
        return fetch("/api/boards")
            .then((data) => data.json())
            .then(resolve)
            .catch((error) => reject(error.data));
    });
}

export async function deleteBoard(boardId) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/boards/${boardId}`, {
            method: "DELETE",
        })
            .then((data) => data.json())
            .then(resolve)
            .catch((error) => reject(error.data));
    });
}

export async function updateBoard(formData) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/boards/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((data) => data.json())
            .then(resolve)
            .catch((error) => reject(error.data));
    });
}
