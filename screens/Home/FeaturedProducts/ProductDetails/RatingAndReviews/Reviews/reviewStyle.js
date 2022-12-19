import { StyleSheet } from "react-native";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";
export const reviewStyle = StyleSheet.create({
    titleCont: {
        flexDirection: "column",
        alignItems: "center",
    },
    reviewCount: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h56,
        color: "#2C2C2C",
        marginTop: customPixel.h30,
        marginBottom: customPixel.h5,
    },
    reviewAverage: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#8C8C8C",
        marginTop: customPixel.h10,
    },
    reviewBarCont: {
        marginTop: customPixel.h30,
    },
    reviewProgressCont: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: customPixel.h10,
    },
    ratingText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
        width: customPixel.h20,
        marginRight: customPixel.h15,
    },
    ratingBar: {
        width: customPixel.wF - (customPixel.h20 * 2 + 35),
        height: 6.5,
    },
    CGCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: customPixel.h25,
    },
    CGText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    writeReviewCont: {
        backgroundColor: "#ffffff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.6,
        elevation: 24,
        paddingVertical: customPixel.h24,
    },
    writeReview: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    writeText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginLeft: customPixel.h10,
    },
});
