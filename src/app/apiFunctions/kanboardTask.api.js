export async function createTask(formData) {
    return new Promise((resolve, reject) => {
        return fetch("/api/boards/tasks", {
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