import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { itemDetailsStyles } from "./ItemDetailsStyle";
import VariationTypeRadio from "./VariationTypeRadio";
import CustomSelectDropdown from "../../../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import { useDispatch } from "react-redux";
import { variation } from "../../../../../redux/slices/featureProducts/items/itemVariations";

const Variations = ({ variationObj, keyName }) => {
    const dispatch = useDispatch();
    const { type, value } = variationObj;
    const [dropdownValue, setDropdownValue] = useState("");
    useEffect(() => {
        dispatch(variation({ key: keyName, value: dropdownValue }));
    }, [dropdownValue]);
    return (
        <View>
            <View style={itemDetailsStyles.sizeItemCont}>
                <Text style={[itemDetailsStyles.sizeItem]}>
                    {type === "radio" ? (
                        <View style={itemDetailsStyles.totalSizeCont}>
                            {value.map((item, index) => (
                                <VariationTypeRadio
                                    item={item.toLowerCase()}
                                    index={index}
                                    key={`key-${index}`}
                                    keyName={keyName}
                                    setDropdownValue={setDropdownValue}
                                />
                            ))}
                        </View>
                    ) : (
                        <CustomSelectDropdown
                            filterArray={value}
                            setValue={setDropdownValue}
                        />
                    )}
                </Text>
            </View>
        </View>
    );
};

export default Variations;
