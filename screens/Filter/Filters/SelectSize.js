import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomCheckbox from "../../Utilities/CustomCheckbox/CustomCheckbox";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { filtersStyles } from "./filtersStyle";

const size = [
    "Extra Small",
    "Small",
    "Regular",
    "Large",
    "Extra Large",
    "Big Daddy",
];

const RenderItem = ({ item, index, handleCheckSize }) => {
    const checked = false;
    return (
        <TouchableOpacity
            style={filtersStyles.selececolorCont}
            onPress={() => handleCheckSize(index)}
        >
            <CustomCheckbox
                checked={checked}
                handleCheckSize={handleCheckSize}
                index={index}
            />
            <Text
                style={[
                    filtersStyles.colorText,
                    {
                        color: checked ? "#2C2C2C" : "#898989",
                    },
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
};

const SelectSize = ({ checked, handleCheckSize }) => {
    return (
        <View>
            <FlatList
                data={size}
                renderItem={({ item, index }) => {
                    return (
                        <RenderItem
                            item={item}
                            index={index}
                            checked={checked}
                            handleCheckSize={handleCheckSize}
                        />
                    );
                }}
                listKey={(_, i) => `list${i}`}
                keyExtractor={(_, i) => "key" + i}
                numColumns={3}
                columnWrapperStyle={{
                    marginBottom: customPixel.h20,
                }}
                scrollEnabled={false}
            />
        </View>
    );
};

export default SelectSize;
