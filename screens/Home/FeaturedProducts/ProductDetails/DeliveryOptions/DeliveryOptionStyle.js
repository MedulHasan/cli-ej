import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

const DeliveryOptionStyle = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: customPixel.h20,
        paddingVertical: customPixel.h15,
    },
    subCont: {
        backgroundColor: "#F3F3F3",
        padding: customPixel.h18,
        borderRadius: customPixel.h6,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: customPixel.h14,
    },
    textTitle: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h18,
        color: "#2C2C2C",
    },
    address: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h13,
        lineHeight: customPixel.h20,
        color: "#898989",
    },
    delivery: {
        marginTop: customPixel.h18,
        flexDirection: "row",
    },
    deliveryText: {
        width: customPixel.h140,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
    },
    deliveryInfo: {
        width: customPixel.h140,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#2C2C2C",
    },
});

export default DeliveryOptionStyle;
