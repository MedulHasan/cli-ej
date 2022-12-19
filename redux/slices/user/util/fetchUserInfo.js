export const getUserInfo = async (access_token, URL) => {
    return fetch(URL, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            const { status: { code, message } = {}, records } = data?.response;
            if (code === 200) {
                return records.data;
            } else {
                return records;
            }
        })
        .catch((err) => {
            return "Server Error";
        });
};
export const getProductDetails = async (access_token, URL) => {
    const res = await fetch(URL, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
        },
    });

    const data = await res.json();
    return data;
};
export const postUserInfoWithFormData = async (
    access_token,
    URL,
    method,
    inputData
) => {
    return fetch(URL, {
        method: method,
        headers: {
            "content-type": "multipart/form-data",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: inputData,
    })
        .then((res) => res.json())
        .then((data) => {
            return data?.response;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const postUserInfo = async (access_token, URL, method, inputData) => {
    return fetch(URL, {
        method: method,
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(inputData),
    })
        .then((res) => res.json())
        .then((data) => {
            return data?.response;
        })
        .catch((err) => {
            console.log(err);
        });
};
