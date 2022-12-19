import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const EmptyContent = ({ Icon, text }) => {
    return (
        <View style={styles.container}>
            <Icon width={customPixel.h63} height={customPixel.h63} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default EmptyContent;

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: customPixel.h4,
        height: customPixel.h200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#DFDFDF",
    },
    text: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h18,
        color: "#898989",
        marginTop: customPixel.h14,
    },
});
