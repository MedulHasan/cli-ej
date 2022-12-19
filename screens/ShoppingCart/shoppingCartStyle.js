import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

const cartStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        minHeight: customPixel.HWH,
        paddingHorizontal: customPixel.h20,
        paddingBottom: height < 534 ? customPixel.h300 : customPixel.h290,
    },
    selectAllCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        marginVertical: customPixel.h15,
        borderColor: "#DFDFDF",
        borderRadius: 6,
        paddingHorizontal: customPixel.h10,
        paddingVertical: customPixel.h14,
    },
    deleteAllCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    deleteText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h12,
        color: "#898989",
        marginHorizontal: customPixel.h8,
    },
    chechBox: {
        height: customPixel.h16,
        width: customPixel.h16,
    },
    items: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 6,
        marginBottom: customPixel.h16,
    },
    itemsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F3F3",
        paddingHorizontal: customPixel.h10,
        paddingVertical: customPixel.h14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    sellerName: {
        fontSize: customPixel.h13,
        color: "#2C2C2C",
    },
    singleItemCont: {
        paddingHorizontal: customPixel.h10,
        marginTop: customPixel.h15,
    },
    singleItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemLeftCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    imgCont: {
        height: customPixel.h70,
        width: customPixel.h70,
        marginLeft: customPixel.h8,
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
    },
    img: {
        height: customPixel.h45,
        width: customPixel.h45,
        borderRadius: 6,
    },
    itemRightCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: customPixel.wF - customPixel.h156,
    },
    itemInfo: {
        marginLeft: customPixel.h12,
        width: "80%",
    },
    itemName: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h12,
        color: "#2C2C2C",
        lineHeight: customPixel.h16,
    },
    itemSize: {
        fontFamily: "Roboto_500Medium",
        alignItems: "flex-start",
        fontSize: customPixel.h10,
        color: "#898989",
        marginTop: customPixel.h4,
    },
    qtyCont: {
        marginTop: customPixel.h7,
        flexDirection: "row",
    },
    incDecCont: {
        flexDirection: "row",
    },
    incDec: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#DFDFDF",
        width: customPixel.h70,
        height: customPixel.h30,
        marginLeft: customPixel.h8,
        borderRadius: 4,
    },
    inc: {
        height: customPixel.h30,
        width: customPixel.h33,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    hr: {
        height: customPixel.h16,
        borderLeftWidth: 1,
        borderColor: "#DFDFDF",
    },
    qty: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h10,
        color: "#2C2C2C",
        marginLeft: customPixel.h12,
    },
    itemFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: customPixel.h10,
        marginVertical: customPixel.h15,
    },
    footerText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h12,
        color: "#2C2C2C",
    },
    checkoutCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: height < 534 ? customPixel.h75 : customPixel.h63,
        width: customPixel.wF,
        backgroundColor: "#2C2C2C",
        paddingHorizontal: customPixel.h20,
        paddingVertical: customPixel.h15,
    },
    totalPriceText: {
        fontFamily: "DMSans_700Bold",
        color: "#FFFFFF",
        fontSize: customPixel.h14,
    },
    proceedBtn: {
        backgroundColor: "#FCCA19",
        borderRadius: 6,
        paddingHorizontal: customPixel.h19,
        paddingVertical: customPixel.h13,
    },
    proceedText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    checkBoxSize: {
        height: height > 668 ? customPixel.h15 : customPixel.h18,
        width: height > 668 ? customPixel.h15 : customPixel.h18,
    },
});

export { cartStyle };
