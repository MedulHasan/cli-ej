export const fetchGetItem = async (URL) => {
    const res = await fetch(URL, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    });
    const data = await res.json();
    return data;
};
