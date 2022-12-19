import { StyleSheet } from "react-native";
import { customPixel } from "../../screens/Utilities/CustomStyleAttribute/CustomPixel";

export const skeletonStyle = StyleSheet.create({
    // basic styles
    skeleton: {
        backgroundColor: "#ebebeb",
        marginVertical: customPixel.h5,
        borderRadius: customPixel.h4,
    },
    sleletonWrapper: {
        marginHorizontal: customPixel.h10,
        marginVertical: "auto",
        paddingVertical: customPixel.h10,
    },

    // animation effect
    shimmer: {
        // transform: [{ skewX: "-5deg" }],
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "hidden",
        flex: 0,
    },
});
