import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const filterHomeStyle = StyleSheet.create({
    headerCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#000000",
    },
    historyCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    historyText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
        marginLeft: customPixel.h10,
        marginVertical: customPixel.h8,
    },
    sellerItem: {
        height: customPixel.h90,
        width: (customPixel.wF - customPixel.h20 * 2 - customPixel.h12 * 2) / 3,
        marginRight: customPixel.h12,
        marginBottom: customPixel.h12,
    },
});
