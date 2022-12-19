import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";

const CustomSpinner = ({ filePath, size }) => {
    return (
        <View style={styles.spinnerContainer}>
            <LottieView source={filePath} autoPlay style={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: customPixel.h6,
    },
});

export default CustomSpinner;
