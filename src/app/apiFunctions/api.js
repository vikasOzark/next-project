
export async function postRequest({ url, formData }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/${url}`, {
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

export async function patchRequest({ url, formData }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/${url}`, {
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

export async function putRequest({ url, formData }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/${url}`, {
            method: "PUT",
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

export async function deleteRequest({ url, formData }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/${url}`, {
            method: "DELETE",
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
export async function getRequest({ url }) {
    return new Promise((resolve, reject) => {
        return fetch(`/api/${url}`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => data.json())
            .then(resolve)
            .catch((error) => reject(error.data));
    });
}