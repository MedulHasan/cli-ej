import { StyleSheet } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";

export const notificationStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        minHeight: customPixel.HWH,
    },
    title: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h13,
        color: "#000000",
        marginVertical: customPixel.h15,
        marginHorizontal: customPixel.h20,
    },
    notiCont: {
        flexDirection: "row",
        paddingVertical: customPixel.h15,
        marginHorizontal: customPixel.h20,
        borderColor: "#DFDFDF",
    },
    icon: {
        height: customPixel.h30,
        width: customPixel.h30,
        backgroundColor: "#E6E6E6",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textCont: {
        marginLeft: customPixel.h12,
        width: customPixel.wF - (customPixel.h20 * 2 + customPixel.h30),
    },
    heading: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#2C2C2C",
        lineHeight: customPixel.h18,
        marginBottom: customPixel.h5,
    },
    time: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h10,
        color: "#898989",
        lineHeight: customPixel.h16,
    },
});
