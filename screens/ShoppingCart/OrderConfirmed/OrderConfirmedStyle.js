import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const orderConfirmedStyle = StyleSheet.create({
    topPosition: {
        marginVertical: customPixel.h30,
    },
    topIcon: {
        textAlign: "center",
    },
    topText1: {
        textAlign: "center",
        marginTop: customPixel.h15,
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#2C2C2C",
    },
    topText2: {
        textAlign: "center",
        marginTop: customPixel.h6,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    deliveryText2: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h24,
        color: "#2C2C2C",
        marginTop: customPixel.h6,
    },
});
