import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";
const { width } = Dimensions.get("screen");

export const notify = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        bottom: customPixel.h50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#2C2C2C",
        marginLeft: width < 376 ? -customPixel.h22 : -customPixel.h20,
        paddingHorizontal: customPixel.h10,
        width: customPixel.wF,
        height: customPixel.h60,
    },
    imgCont: {
        height: customPixel.h45,
        width: customPixel.h45,
        padding: customPixel.h8,
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: customPixel.h4,
    },
    img: {
        height: customPixel.h40,
        width: customPixel.h40,
    },
    subCont: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontFamily: customPixel.h13,
        lineHeight: customPixel.h18,
        fontFamily: "DMSans_500Medium",
        color: "#FFFFFF",
        marginLeft: customPixel.h12,
        width: customPixel.h220,
        alignSelf: "center",
    },
    iconCont: {
        width: customPixel.h70,
        height: customPixel.h70,
        backgroundColor: "#FCCA19",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
    },
    goToCart: {
        height: customPixel.h60,
        flexDirection: "row",
        alignItems: "center",
    },
});
