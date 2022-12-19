import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

export const OrderDetailsStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        minHeight: height,
        paddingBottom: customPixel.h100,
    },
    idNum: {
        textAlign: "center",
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#898989",
        marginTop: customPixel.h30,
        marginBottom: customPixel.h9,
    },
    invoiceId: {
        marginTop: customPixel.h5,
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h24,
        color: "#2C2C2C",
    },
    statusCont: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: customPixel.h14,
        marginBottom: customPixel.h30,
    },
    status: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FEF8E7",
        borderRadius: 4,
        paddingHorizontal: customPixel.h16,
        paddingVertical: customPixel.h6,
    },
    statusText: {
        marginLeft: customPixel.h6,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        color: "#DEA512",
    },
    infoCont: {
        paddingHorizontal: customPixel.h20,
        marginTop: customPixel.h30,
    },
    deliveryCont: {
        backgroundColor: "#F4F4F4",
        flexDirection: "row",
        paddingVertical: customPixel.h20,
        borderRadius: 6,
    },
    deliverySubCont: {
        paddingLeft: customPixel.h15,
        width: (width - customPixel.h20 * 2) / 2,
    },
    deliveryText1: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
    },
    deliveryText2: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h13,
        color: "#929292",
        marginTop: customPixel.h5,
    },
    shoppingAddressCont: {},
    shoppingTitle: {
        marginTop: customPixel.h20,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    shoppingTextCont: {
        flexDirection: "row",
        marginTop: customPixel.h13,
    },
    shoppingTextWidth: {
        width: (width - customPixel.h20 * 2) / 2,
    },
    shoppingText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h22,
        color: "#898989",
        marginBottom: customPixel.h5,
    },
    orderProductsCont: {
        marginTop: customPixel.h20,
        marginBottom: customPixel.h10,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 6,
    },
    orderProductTitle: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
        marginLeft: customPixel.h15,
        marginVertical: customPixel.h15,
    },
    singleProductCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: customPixel.h15,
        paddingTop: customPixel.h12,
        paddingBottom: customPixel.h12,
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
    },
    name: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h13,
        lineHeight: customPixel.h17,
        color: "#2C2C2C",
        marginBottom: customPixel.h7,
    },
    quantity: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h11,
        color: "#868686",
        textAlign: "right",
    },
    items: {
        flexDirection: "row",
    },
    hrLine: {
        width: width - customPixel.h20 * 2 - 2,
    },
    vrLine: {
        borderLeftWidth: 1,
        marginHorizontal: customPixel.h12,
        borderColor: "#B1B1B1",
    },
    subTotalCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: customPixel.h15,
        borderBottomWidth: 1,
        borderColor: "#DFDFDF",
        paddingBottom: customPixel.h15,
    },
    subText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    grandTotal: {
        backgroundColor: "#2C2C2C",
        borderRadius: 6,
        paddingHorizontal: customPixel.h12,
        paddingVertical: customPixel.h15,
    },
});
