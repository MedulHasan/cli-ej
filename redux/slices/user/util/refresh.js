export const refresh = async (
    access_token,
    URL,
    dispatch,
    fetchStart,
    fetchGetData,
    getDataSuccess
) => {
    dispatch(fetchStart());
    const data = await fetchGetData(access_token, URL);
    dispatch(getDataSuccess(data));
};
