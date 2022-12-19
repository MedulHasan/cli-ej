import { Center } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("window");

export const myWishlistStyles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: customPixel.w20,
        minHeight: height - 77,
        paddingBottom: customPixel.h130,
    },
    singleWishlistContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: customPixel.h20,
        backgroundColor: "#fff",
    },
    wishlistDetails: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    imageCont: {
        backgroundColor: "#F1F1F1",
        height: width < 321 ? customPixel.h90 : customPixel.h80,
        width: width < 321 ? customPixel.h90 : customPixel.h80,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: customPixel.w15,
        borderRadius: customPixel.h4,
    },
    image: {
        height: width < 321 ? customPixel.h45 : customPixel.h42,
        width: width < 321 ? customPixel.h45 : customPixel.h42,
        borderRadius: customPixel.h6,
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: width < 321 ? customPixel.h19 : customPixel.h16,
        color: "#898989",
        marginBottom: customPixel.h8,
    },
    price: {
        fontFamily: "Roboto_500Medium",
        fontSize: width < 321 ? customPixel.h19 : customPixel.h16,
        color: "#2C2C2C",
    },
    undoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    undoBtn: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        backgroundColor: "#2C2C2C",
        color: "#FFFFFF",
        paddingHorizontal: customPixel.h25,
        paddingVertical: customPixel.h14,
        width: customPixel.h90,
        textAlign: "center",
    },
    undoText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        backgroundColor: "#F1F1F1",
        color: "#2C2C2C",
        paddingHorizontal: customPixel.h25,
        paddingVertical: customPixel.h14,
        width: customPixel.wF - customPixel.h90,
    },
});
