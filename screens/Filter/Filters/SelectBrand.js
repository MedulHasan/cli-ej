import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { filtersStyles } from "./filtersStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import CustomCheckbox from "../../Utilities/CustomCheckbox/CustomCheckbox";

const RenderItem = ({ item, index, itemTitle, handleCheckSize }) => {
    return (
        <>
            <TouchableOpacity
                style={filtersStyles.selececolorCont}
                onPress={() => handleCheckSize(itemTitle, item, index)}
            >
                <CustomCheckbox
                    handleCheckSize={handleCheckSize}
                    index={index}
                    item={item}
                    itemTitle={itemTitle}
                    checked={item.isChecked}
                />
                <Text
                    style={[
                        filtersStyles.colorText,
                        {
                            color: item.isChecked ? "#2C2C2C" : "#898989",
                        },
                    ]}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        </>
    );
};

const SelectBrand = ({ brands, handleCheckSize, itemTitle }) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent:
                    itemTitle == "categories" ? "space-between" : "flex-start",

                marginRight: customPixel.h20,
            }}
        >
            {brands.map((item, index) => (
                <View key={`key${index}`}>
                    <TouchableOpacity
                        style={[
                            itemTitle == "categories"
                                ? filtersStyles.selececolorCont
                                : filtersStyles.selececolorCont1,
                            {
                                marginBottom: customPixel.h20,
                            },
                        ]}
                        onPress={() => handleCheckSize(itemTitle, item, index)}
                    >
                        <CustomCheckbox
                            handleCheckSize={handleCheckSize}
                            index={index}
                            item={item}
                            itemTitle={itemTitle}
                            checked={item.isChecked}
                        />
                        <Text
                            style={[
                                filtersStyles.colorText,
                                {
                                    color: item.isChecked
                                        ? "#2C2C2C"
                                        : "#898989",
                                },
                            ]}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

export default SelectBrand;
