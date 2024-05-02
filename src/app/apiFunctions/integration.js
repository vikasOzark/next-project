export async function createIntegrate(formData) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/integration`, {
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
