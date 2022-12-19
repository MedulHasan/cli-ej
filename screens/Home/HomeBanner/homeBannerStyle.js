import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

export const bannerStyle = StyleSheet.create({
    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        height: height * 0.03,
    },
    indicator: {
        height: customPixel.h8,
        width: customPixel.h8,
        backgroundColor: "#DFDFDF",
        borderRadius: 50,
        marginHorizontal: 3,
    },
    image: {
        width: width - customPixel.w20 * 2,
        height: height * 0.2,
        borderRadius: 6,
    },
});
