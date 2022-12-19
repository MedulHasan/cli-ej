import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";

const { width } = Dimensions.get("window");

export const productDetailsStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.h20,
    },
    header: {
        flexDirection: "row",
        position: "absolute",
        right: width * 0.051,
        top: 23,
    },
    quantityCont: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: (customPixel.wF - customPixel.w20 - 30) / 2,
    },
    quantity: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h24,
        color: "#2C2C2C",
        marginHorizontal: customPixel.h15,
        width: customPixel.h35,
        textAlign: "center",
    },
    quantityIcon: {
        height: customPixel.h35,
        width: customPixel.h35,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    addToCartContainer: {
        height: customPixel.h45,
        width: customPixel.h185,
        borderRadius: customPixel.h6,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addToCart: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cartBtnText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginLeft: customPixel.h7,
    },
    wishlistContainer: {
        height: customPixel.h35,
        width: customPixel.h35,
        marginRight: customPixel.h12,
        backgroundColor: "#F9E8E8",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
