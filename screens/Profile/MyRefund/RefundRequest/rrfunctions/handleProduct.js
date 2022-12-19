export const handleProduct = async (id, setProducts, myOrders) => {
    const is_Exits = await myOrders.find((order) => order.number === id);
    if (is_Exits) {
        const allProducts = [];
        is_Exits?.line_items.map((product) => {
            let totalQuantity = 0;
            if (product?.refunds.length > 0) {
                for (let refundProduct in product?.refunds) {
                    const refundQuantity = product?.refunds[refundProduct];
                    totalQuantity += parseInt(refundQuantity.quantity);
                }
                if (
                    parseInt(product?.is_delivered) &&
                    parseInt(product?.quantity) !== totalQuantity
                ) {
                    allProducts.push(product);
                }
            } else {
                if (parseInt(product?.is_delivered)) {
                    allProducts.push(product);
                }
            }
        });
        return setProducts(allProducts);
    }
};
