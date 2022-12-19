import { StyleSheet } from "react-native";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const itemDetailsStyles = StyleSheet.create({
    ratingCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: customPixel.h20,
    },
    nameText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h13,
        color: "#898989",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 0,
    },
    ratingText: {
        marginLeft: customPixel.h5,
    },
    title: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#2C2C2C",
        marginTop: customPixel.h10,
    },
    priceCont: {
        flexDirection: "row",
        paddingVertical: customPixel.h15,
    },
    price: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#FF6B00",
    },
    discount: {
        marginLeft: customPixel.h8,
        textDecorationLine: "line-through",
        color: "#CBCBCB",
        marginTop: "auto",
    },
    sizeCont: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: customPixel.h15,
        borderBottomWidth: 1,
        borderColor: "#DFDFDF",
    },
    sizeText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        width: customPixel.h80,
    },
    totalSizeCont: {
        flexDirection: "row",
    },
    sizeItemCont: {
        marginLeft: customPixel.h10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    sizeItem: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
    },
    activeBorderColor: {
        height: customPixel.h33,
        width: customPixel.h33,
        borderColor: "#FCCA19",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    colorItem: {
        width: customPixel.h24,
        height: customPixel.h24,
        borderRadius: 50,
        borderColor: "#DFDFDF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    availabilityCont: {
        marginTop: customPixel.h20,
        flexDirection: "row",
        alignItems: "center",
    },
    availabilityText: {
        fontSize: customPixel.h16,
        fontFamily: "DMSans_500Medium",
        color: "#2C2C2C",
    },
    stockText: {
        marginLeft: customPixel.h20,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        paddingHorizontal: customPixel.h20,
        paddingVertical: customPixel.h7,
        borderRadius: 2,
    },
});
