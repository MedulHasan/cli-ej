import _ from "underscore";
let previousVariationData = {};
let previousObj = {};

export const dataProcessing = (productDetails, variationData) => {
    const { attributes, variations, attribute_values } = productDetails?.data;
    let attributeKeys = Object.keys(attributes);
    let userSelectVariation = convertValueToId(variationData, attribute_values);
    let attributeValue = {};
    let attributeId = {};
    let attributeType = {};
    for (let item in attributes) {
        attributeValue[item] = attributes[item]?.value;
        attributeId[item] = attributes[item]?.attribute_id;
        attributeType[item] = attributes[item]?.type;
    }

    let obj = {};
    let emptyKeys = [];
    for (let i = 0; i < attributeKeys.length; i++) {
        obj[attributeKeys[i]] = {
            value: [],
            type: "",
        };
    }

    let diffObj = differenceTwoObject(previousVariationData);
    previousVariationData = userSelectVariation;
    let isValue = {};
    let unselectValueOfVariation = [];
    const isEmptyAll = Object.keys(userSelectVariation).every(
        (x) => userSelectVariation[x] == ""
    );

    if (isEmptyAll) {
        for (let item of variations) {
            Object.keys(item.attributes).forEach((key, i) => {
                let postfixKey = key.split("_").pop();
                collectValueInOptions(postfixKey, item, key, i);
            });
        }
    } else {
        // unselected value placed
        for (let userVariation in userSelectVariation) {
            let addPrefixUserVariation = `attribute_${userVariation}`;
            if (userSelectVariation[userVariation]) {
                isValue[addPrefixUserVariation] =
                    userSelectVariation[userVariation];
            }
        }
        for (let variation of variations) {
            let isMatch = Object.keys(isValue).every(
                (k) =>
                    variation.attributes[k] == isValue[k] ||
                    "" == variation.attributes[k]
            );

            if (isMatch) {
                unselectValueOfVariation.push(variation);
            }
        }
        let isEmptyValue = objectEmptyProperty(userSelectVariation);
        variationCombination(unselectValueOfVariation, isEmptyValue);

        // selected value place
        for (let v in isValue) {
            let withoutSelectLastValue = {};
            let withoutSelectLastValueOfVariation = [];
            let isSelectedValue = {};

            for (let variation of variations) {
                for (let vv in isValue) {
                    if (v != vv) {
                        withoutSelectLastValue[vv] = isValue[vv];
                    }
                }
                // match if the properties exist in variation
                let isMatch = Object.keys(withoutSelectLastValue).every(
                    (k) =>
                        variation.attributes[k] == withoutSelectLastValue[k] ||
                        "" == variation.attributes[k]
                );
                if (isMatch) {
                    withoutSelectLastValueOfVariation.push(variation);
                }
                //
            }

            let changeableAttribute = differenceTwoObject(isValue);
            for (let v in changeableAttribute) {
                let value = v.split("_").pop();
                isSelectedValue[value] = changeableAttribute[v];
            }
            variationCombination(
                withoutSelectLastValueOfVariation,
                isSelectedValue
            );
        }
    }

    function variationCombination(variations, changeableObj) {
        for (let item of variations) {
            Object.keys(item.attributes).forEach((key, i) => {
                let postfixKey = key.split("_").pop();
                for (let value in changeableObj) {
                    if (value == postfixKey) {
                        collectValueInOptions(postfixKey, item, key, i);
                    }
                }
            });
        }
    }

    function collectValueInOptions(postfixKey, item, key, i) {
        if (
            item.attributes[key] == "" &&
            emptyKeys.indexOf(attributeKeys[i]) == -1
        ) {
            emptyKeys.push(attributeKeys[i]);
            if (attributeId[postfixKey]) {
                convertIdToValue(postfixKey, item, key, i);
            } else {
                obj[attributeKeys[i]].value = attributeValue[attributeKeys[i]];
                obj[attributeKeys[i]].value.sort();
                obj[attributeKeys[i]].type = attributeType[postfixKey];
            }
        } else if (
            item.attributes[key] &&
            obj[attributeKeys[i]].value.indexOf(item.attributes[key]) == -1
        ) {
            if (attributeId[postfixKey]) {
                convertIdToValue(postfixKey, item, key, i);
            } else {
                obj[attributeKeys[i]].value.push(item.attributes[key]);
                obj[attributeKeys[i]].value.sort();
                obj[attributeKeys[i]].type = attributeType[postfixKey];
            }
        }
    }

    function differenceTwoObject(previous) {
        let diffObj = _.omit(previous, (v, k) => userSelectVariation[k] == v);
        return diffObj;
    }

    function convertIdToValue(postfixKey, item, key, i) {
        for (let a in attribute_values[postfixKey]) {
            if (
                emptyKeys.indexOf(postfixKey) != -1 &&
                obj[attributeKeys[i]].value.indexOf(
                    attribute_values[postfixKey][a]?.value
                ) == -1
            ) {
                obj[attributeKeys[i]].value.push(
                    attribute_values[postfixKey][a]?.value
                );
                obj[attributeKeys[i]].type = attributeType[postfixKey];
            } else if (
                attribute_values[postfixKey][a]?.attribute_id ==
                    attributeId[postfixKey] &&
                attribute_values[postfixKey][a]?.id == item.attributes[key] &&
                obj[attributeKeys[i]].value.indexOf(
                    attribute_values[postfixKey][a]?.value
                ) == -1
            ) {
                obj[attributeKeys[i]].value.push(
                    attribute_values[postfixKey][a]?.value
                );
                obj[attributeKeys[i]].type = attributeType[postfixKey];
            }
        }
    }

    let diffObjArr = Object.keys(diffObj);
    if (diffObjArr.length == 1) {
        obj[diffObjArr[0]].value = previousObj[diffObjArr[0]]?.value;
        obj[diffObjArr[0]].value.sort();
    }
    previousObj = obj;
    return obj;
};

const convertValueToId = (variationData, attribute_values) => {
    let userSelectVariation = { ...variationData };
    for (let key in userSelectVariation) {
        if (attribute_values[key]) {
            for (let item in attribute_values[key]) {
                if (
                    key == "color" &&
                    userSelectVariation[key] ==
                        attribute_values[key][item].value.toLowerCase()
                ) {
                    userSelectVariation[key] = attribute_values[key][item].id;
                } else if (
                    userSelectVariation[key] ==
                    attribute_values[key][item].value
                ) {
                    userSelectVariation[key] = attribute_values[key][item].id;
                }
            }
        }
    }
    return userSelectVariation;
};

const objectEmptyProperty = (userSelectVariation) => {
    let isEmptyValue = {};
    for (let item in userSelectVariation) {
        if (userSelectVariation[item] == "") {
            isEmptyValue[item] = "";
        }
    }
    return isEmptyValue;
};

export const matchVariation = (productDetails, variationData) => {
    const variation = {
        success: false,
        value: {},
    };
    if (Object.keys(variationData).length == 0) {
        return variation;
    } else {
        const newUserGiverVariation = { ...variationData };

        const { variations, attribute_values } = productDetails?.data;
        for (const key in variationData) {
            if (attribute_values[key]) {
                for (let k in attribute_values[key]) {
                    if (
                        attribute_values[key][k]?.value?.toLowerCase() ==
                        variationData[key]?.toLowerCase()
                    ) {
                        newUserGiverVariation[key] =
                            attribute_values[key][k]?.id;
                    }
                }
            }
        }

        const changedVariationAttributeKey = {};
        for (let key in newUserGiverVariation) {
            changedVariationAttributeKey[`attribute_${key}`] =
                newUserGiverVariation[key];
        }

        for (let key in variations) {
            let isMatch = Object.keys(changedVariationAttributeKey).every(
                (k) => {
                    return (
                        variations[key]?.attributes[k] ==
                            changedVariationAttributeKey[k] ||
                        "" == variations[key]?.attributes[k]
                    );
                }
            );
            if (isMatch) {
                variation.success = true;
                variation.value = variations[key];
            }
        }
        return variation;
    }
};
