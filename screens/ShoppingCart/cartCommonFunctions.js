export const restructureData = (cartData, vendors) => {
    const data = cartData?.map((item) => {
        if (item.vendor_id) {
            return {
                ["vendor_id"]: item.vendor_id,
                ["vendor_name"]: vendors[item.vendor_id],
                ["items"]: cartData.filter(
                    (cart) => cart.vendor_id === item.vendor_id
                ),
            };
        } else {
            return {
                ["vendor_id"]: 0,
                ["vendor_name"]: "Unknown",
                ["items"]: cartData.filter(
                    (cart) => cart.vendor_id === item.vendor_id
                ),
            };
        }
    });
    const uniqueCartData = Array.from(
        new Set(data.map((a) => a.vendor_id))
    ).map((id) => {
        return data.find((a) => a.vendor_id === id);
    });
    return uniqueCartData;
};
