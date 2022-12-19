import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { filtersStyles } from "./filtersStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import CustomCheckbox from "../../Utilities/CustomCheckbox/CustomCheckbox";

const RenderItem = ({ item, index, itemTitle, handleCheckSize }) => {
    return (
        <>
            <TouchableOpacity
                style={[filtersStyles.selececolorCont]}
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

const SelectAtt = ({ brands, handleCheckSize, itemTitle }) => {
    return (
        <View>
            <FlatList
                // style={{ height: customPixel.hFull }}
                data={brands}
                renderItem={({ item, index }) => (
                    <RenderItem
                        itemTitle={itemTitle}
                        item={item}
                        index={index}
                        handleCheckSize={handleCheckSize}
                    />
                )}
                listKey={(_, i) => `list${i}`}
                keyExtractor={(_, i) => "key" + i}
                numColumns={itemTitle == "categories" ? 2 : 3}
                columnWrapperStyle={{
                    marginBottom: customPixel.h20,
                    justifyContent:
                        itemTitle == "categories"
                            ? "space-between"
                            : "flex-start",
                    marginRight: customPixel.h20,
                }}
                scrollEnabled
            />
        </View>
    );
};

export default SelectAtt;
