import { View, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { itemDetailsStyles } from "./ItemDetailsStyle";
import CorrectBlack from "../../../../../assets/svgs/product details/correctBlack.svg";
import CorrectWhite from "../../../../../assets/svgs/product details/correctWhite.svg";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { useSelector } from "react-redux";

let h = customPixel.h10;
let w = customPixel.w15;

const VariationTypeRadio = ({ item, index, keyName, setDropdownValue }) => {
    const variationData = useSelector((state) => state.itemVariationReducer);
    const handleVariation = (item) => {
        setDropdownValue(item);
    };
    return (
        <View
            style={[
                itemDetailsStyles.activeBorderColor,
                {
                    borderWidth: item === variationData[keyName] ? 1.5 : 0,
                    marginLeft: index === 0 ? 0 : customPixel.h20,
                },
            ]}
        >
            <TouchableWithoutFeedback onPress={() => handleVariation(item)}>
                <View
                    style={[
                        itemDetailsStyles.colorItem,
                        {
                            backgroundColor: keyName === "color" ? item : "",
                            borderWidth: item === "white" ? 1 : 0,
                        },
                    ]}
                >
                    {item === variationData[keyName] && (
                        <View>
                            {item === "white" || item === "yellow" ? (
                                <CorrectBlack height={h} width={w} />
                            ) : (
                                <CorrectWhite height={h} width={w} />
                            )}
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default VariationTypeRadio;
