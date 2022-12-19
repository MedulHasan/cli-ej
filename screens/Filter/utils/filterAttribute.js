import { uniqueCheck } from "./checkDuplicate";

export const manageFilter = (filterableAttributes) => {
    let attr = {},
        Attr = [],
        rating,
        price_range;

    for (let key in filterableAttributes) {
        if (key == "price_range") {
            price_range = filterableAttributes[key];
        } else {
            if (filterableAttributes[key] != null) {
                if (
                    Array.isArray(filterableAttributes[key]) &&
                    Object.keys(filterableAttributes[key]).length > 0
                ) {
                    attr[key] = {
                        attribute: false,
                        status: false,
                        value: filterableAttributes[key].map(uniqueCheck),
                    };
                }
                if (
                    typeof filterableAttributes[key] != "number" &&
                    !Array.isArray(filterableAttributes[key])
                ) {
                    // let test = filterableAttributes[key];
                    // for (let key in test) {
                    //     attr[key] = {
                    //         attribute: true,
                    //         status: false,
                    //         value: test[key].map(uniqueCheck),
                    //     };
                    // }
                }
                if (typeof filterableAttributes[key] == "number") {
                    rating = filterableAttributes[key];
                }
            }
        }
    }
    Attr.push(attr);
    let prop = Attr.reduce((acc, obj) => {
        Object.keys(obj).forEach((key) => {
            acc.push({ [key]: obj[key] });
        });
        return acc;
    }, []);

    return { prop, price_range, rating };
};
