import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const orderSummaryStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.h20,
        minHeight: customPixel.HWH,
    },
    indicatorCont: {
        flexDirection: "row",
        justifyContent: "center",
    },
    orderIndicator: {
        width: customPixel.h50,
        borderBottomWidth: customPixel.h4,
        borderRadius: customPixel.h26,
        marginHorizontal: 2,
    },
    allProducts: {
        marginTop: customPixel.h30,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginBottom: customPixel.h15,
    },
    productsContainer: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#DFDFDF",
        paddingBottom: customPixel.h20,
        marginTop: customPixel.h20,
    },
    productCont: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    productName: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
    },
    priceingCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: customPixel.h15,
    },
    grandTotal: {
        backgroundColor: "#F3F3F3",
        padding: customPixel.h11,
        borderRadius: 6,
    },
    price: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    cuponText: {
        marginTop: customPixel.h25,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
    },
    cuponInput: {
        flexDirection: "row",
        marginTop: customPixel.h15,
    },
    input: {
        width: (customPixel.wF - customPixel.h20 * 2) * 0.75,
        height: customPixel.h50,
        padding: customPixel.h10,
        fontSize: customPixel.h14,
        fontFamily: "Roboto_400Regular",
        color: "#898989",
        borderColor: "#DFDFDF",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    inputText: {
        backgroundColor: "#2C2C2C",
        color: "#fff",
        width: (customPixel.wF - customPixel.h20 * 2) * 0.25,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        textAlignVertical: "center",
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
    },
    checkoutCont: {
        backgroundColor: "#FCCA19",
        borderRadius: 6,
        paddingVertical: customPixel.h17,
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        bottom: customPixel.h10,
        left: customPixel.h20,
        width: customPixel.wF - customPixel.h20 * 2,
    },
    checkoutText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h18,
        color: "#2C2C2C",
    },
});
