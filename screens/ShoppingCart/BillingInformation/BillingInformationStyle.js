import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const billingInfoStyle = StyleSheet.create({
    text: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginTop: customPixel.h16,
    },
    otherAddressCont: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 6,
        padding: customPixel.h15,
        flexDirection: "row",
        justifyContent: "center",
    },
    grandTotal: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        paddingVertical: customPixel.h20,
        position: "absolute",
        bottom: customPixel.h100,
        width: customPixel.wF - customPixel.h20 * 2,
        marginHorizontal: customPixel.h20,
    },
    grandText: {
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h18,
        color: "#8B8B8B",
    },
    priceText: {
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h33,
        color: "#2C2C2C",
    },
});
