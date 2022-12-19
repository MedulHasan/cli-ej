import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";
import ParseHTML from "../../../../../Utilities/ParseHTML/ParseHTML";

const Description = ({ description }) => {
    return (
        <View style={itemDescriptionStyle.container}>
            <ParseHTML description={description} />
            {/* <Text>{description}</Text> */}
        </View>
    );
};

export default Description;

const itemDescriptionStyle = StyleSheet.create({
    container: {
        padding: customPixel.h20,
        backgroundColor: "#fff",
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h24,
        color: "#868686",
    },
});
