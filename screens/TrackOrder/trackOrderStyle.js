import { StyleSheet } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
export const trackOrderStyle = StyleSheet.create({
    idNum: {
        textAlign: "left",
    },
    statusCout: {
        justifyContent: "flex-start",
    },
    headerCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    moreDetailsContainer: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    moreDetailsText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h13,
        color: "#898989",
        marginTop: customPixel.h10,
    },
    login: {
        textDecorationLine: "underline",
        textDecorationColor: "#2C2C2C",
        marginTop: customPixel.h10,
        color: "#2C2C2C",
    },
    orderedProduct: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#2C2C2C",
        marginTop: customPixel.h30,
    },
    orderRocketSvg: {
        display: "flex",
        alignItems: "center",
    },
    orderHeader: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#2C2C2C",
        textAlign: "center",
    },
    orderDesc: {
        fontFamily: "Roboto_500Medium",
        marginTop: customPixel.h12,
        fontSize: customPixel.h14,
        color: "#898989",
        textAlign: "center",
    },
    textInput: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        height: customPixel.h50,
        paddingHorizontal: customPixel.h15,
        marginTop: customPixel.h22,
        marginBottom: customPixel.h15,
        borderWidth: customPixel.h1,
        borderColor: "#BCBCBC",
        borderRadius: customPixel.h6,
    },
    trackOrderButton: {
        backgroundColor: "#FCCA19",

        borderRadius: customPixel.h6,
    },
    trackOrderButtonText: {
        color: "#2C2C2C",
        fontFamily: "DMSans_700Bold",
        paddingVertical: customPixel.h17,
        fontSize: customPixel.h18,
        textAlign: "center",
    },
});
