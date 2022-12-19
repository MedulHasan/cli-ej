import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const { height } = Dimensions.get("window");

export const OnboardStyle = StyleSheet.create({
    indicatorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
        backgroundColor: "#fff",
        height: height * 0.05,
    },
    indicator: {
        height: 5,
        width: 27,
        backgroundColor: "#DFDFDF",
        borderRadius: 42,
        marginHorizontal: 3,
    },
    nextBtn: {
        height: customPixel.h65,
        width: customPixel.w65,
        borderRadius: customPixel.h16,
        backgroundColor: "#FCCA19",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    getStart: {
        width: customPixel.wF - customPixel.h20 * 2,
        height: customPixel.h60,
        backgroundColor: "#FCCA19",
        borderRadius: customPixel.h6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    getStartText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        lineHeight: customPixel.h25,
        color: "#2C2C2C",
    },
});
