import config from "../../../config";

export const fetchResetPassword = async (data) => {
    return fetch(`${config.BASE_API_URL}/user/password/reset`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => data);
};
