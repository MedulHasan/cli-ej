import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";
import CorrectWhite from "../../../assets/svgs/product details/correctWhite.svg";

const CustomCheckbox = ({
    handleCheckSize,
    index,
    checked,
    item,
    itemTitle,
}) => {
    return (
        <TouchableHighlight
            onPress={() => handleCheckSize(itemTitle, item, index)}
        >
            {checked ? (
                <View style={styles.checked}>
                    <CorrectWhite />
                </View>
            ) : (
                <View style={styles.container}></View>
            )}
        </TouchableHighlight>
    );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        height: customPixel.h20,
        width: customPixel.h20,
        borderRadius: 2,
    },
    checked: {
        backgroundColor: "#2C2C2C",
        borderRadius: 2,
        height: customPixel.h20,
        width: customPixel.h20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
