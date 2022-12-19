import { StyleSheet } from "react-native";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const writeReviewStyle = StyleSheet.create({
    imgRatingCon: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: customPixel.h20,
        borderBottomWidth: 1,
        borderColor: "#DFDFDF",
    },
    imgCon: {
        height: customPixel.h75,
        width: customPixel.h75,
        backgroundColor: "#F3F3F3",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    productImg: {
        height: customPixel.h45,
        width: customPixel.h45,
    },
    productName: {
        color: "#2c2c2c",
        marginLeft: customPixel.h14,
        marginRight: customPixel.h14,
        fontSize: customPixel.h15,
        fontFamily: "DMSans_500Medium",
        lineHeight: customPixel.h22,
        width: customPixel.wF - customPixel.h20 * 2 - customPixel.h75,
    },
    ratingCon: {
        flexDirection: "row",
        marginTop: customPixel.h4,
    },
    ratingCount: {
        marginLeft: customPixel.h10,
        fontSize: customPixel.h13,
        color: "#898989",
    },
    addRatingsCon: {
        marginTop: customPixel.h20,
    },
    addRatingText: {
        color: "#2c2c2c",
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        marginBottom: customPixel.h20,
    },
    addRatingCon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    uploadPhotos: {
        height: customPixel.h130 + 3,
        backgroundColor: "#F3F3F3",
        borderStyle: "dashed",
        borderColor: "#898989",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    uploadText: {
        marginTop: customPixel.h16,
        fontSize: customPixel.h14,
        color: "#898989",
        fontFamily: "Roboto_500Medium",
        lineHeight: 16,
    },
    textInputStyle: {
        backgroundColor: "#F3F3F3",
        color: "#2c2c2c",
        color: "#898989",
        borderRadius: 4,
        textAlignVertical: "top",
        padding: 10,
    },
    ratingText: {
        fontSize: customPixel.h18,
        color: "#898989",
        fontFamily: "Roboto_500Medium",
    },
    remainingChar: {
        color: "#898989",
        fontSize: customPixel.h11,
        marginTop: customPixel.h4,
        textAlign: "right",
    },
    submitReview: {
        backgroundColor: "#ffffff",
    },
    submitReviewCon: {
        backgroundColor: "#FCCA19",
        marginHorizontal: customPixel.h20,
        marginVertical: customPixel.h20,
        borderRadius: customPixel.h6,
    },
    submitReviewText: {
        textAlign: "center",
        color: "#2c2c2c",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h18,
        paddingVertical: customPixel.h17,
    },
});
