import { View, Text, TextInput } from "react-native";
import React from "react";
import { filtersStyles } from "./filtersStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { useState } from "react";

const FilterInput = ({ minPrice, maxPrice, updatedPrice }) => {
    return (
        <View>
            <Text
                style={[
                    filtersStyles.selectText,
                    {
                        fontSize: customPixel.h18,
                        marginTop: customPixel.h20,
                    },
                ]}
            >
                Price Range
            </Text>
            <View style={filtersStyles.inputCont}>
                <View
                    style={[
                        filtersStyles.inputGroup,
                        { marginRight: customPixel.h25 },
                    ]}
                >
                    <Text style={filtersStyles.inputText}>Min.</Text>
                    <TextInput
                        style={[filtersStyles.input, filtersStyles.selectText]}
                        placeholder={`$0`}
                        placeholderTextColor={"#2C2C2C"}
                        keyboardType='numeric'
                        maxLength={10}
                        value={minPrice}
                        onChangeText={(text) => {
                            updatedPrice(text, "min");
                        }}
                    />
                </View>
                <View
                    style={[
                        filtersStyles.inputGroup,
                        { marginRight: customPixel.h25 },
                    ]}
                >
                    <Text style={filtersStyles.inputText}>Max.</Text>
                    <TextInput
                        style={[filtersStyles.input, filtersStyles.selectText]}
                        placeholder={`$0`}
                        placeholderTextColor={"#2C2C2C"}
                        keyboardType='numeric'
                        value={maxPrice}
                        onChangeText={(text) => {
                            updatedPrice(text, "max");
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default FilterInput;
