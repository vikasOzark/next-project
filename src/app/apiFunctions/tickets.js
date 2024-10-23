export async function setTimeFrame({ ticketId, formData }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/tickets/${ticketId}/set-time-frame`, {
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