import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const { height } = Dimensions.get("window");

export const myReviresStyle = StyleSheet.create({
    container: {
        paddingHorizontal: customPixel.h20,
        backgroundColor: "#fff",
        minHeight: height,
    },
    detailsCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailsTitle: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
        marginTop: customPixel.h20,
    },
    detailsText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#868686",
        marginTop: customPixel.h5,
        lineHeight: customPixel.h18,
    },
    detailsImgCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailsImg: {
        marginTop: customPixel.h11,
        flexDirection: "row",
    },
    detailsSingleImg: {
        width: customPixel.h40,
        height: customPixel.h40,
        marginRight: customPixel.h8,
        borderRadius: customPixel.h2,
        position: "relative",
        backgroundColor: "white",
    },
    layerImg: {
        width: customPixel.h40,
        height: customPixel.h42,
        marginRight: customPixel.h8,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: customPixel.h2,
        position: "absolute",
        right: 0,
        borderRadius: customPixel.h2,
    },
    layerImgText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h10,
        color: "#898989",
    },
    editReviewCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    editText: {
        marginLeft: customPixel.h6,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#898989",
    },
    dropDown: {
        height: customPixel.h20,
        width: customPixel.h50,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
});
