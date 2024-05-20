export default function createWorkPackage(subject, description) {
    try {
        const payload = payloadWrapper(subject, description);
        const authToken = btoa(
            `apikey:cd900114b7e3efe6c9f77af2d2942bb56ea16284ad423b2fa779800367c4967c`
        );

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", authToken);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: payload,
        };

        fetch(
            "https://vikask99588.openproject.com/api/v3/projects/1/work_packages",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    } catch (error) {
        console.log(error.message);
    }
}

const payloadWrapper = (subject, description) => {
    return JSON.stringify({
        subject: subject,
        description: {
            format: "textile",
            raw: description,
        },
        _links: {
            type: {
                href: "/api/v3/types/1",
            },
            status: {
                href: "/api/v3/statuses/2",
            },
        },
    });
};
