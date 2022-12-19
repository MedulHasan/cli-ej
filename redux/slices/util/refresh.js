export const refresh = async (
    URL,
    dispatch,
    fetchStart,
    fetchGetData,
    getDataSuccess
) => {
    dispatch(fetchStart());
    const data = await fetchGetData(URL);
    dispatch(getDataSuccess(data?.response?.records?.data));
};
