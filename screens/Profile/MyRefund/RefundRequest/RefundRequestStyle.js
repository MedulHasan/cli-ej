import { StyleSheet } from "react-native";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";

export const refundStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        minHeight: customPixel.HWH,
        paddingHorizontal: customPixel.h20,
        paddingBottom: customPixel.h80,
    },
    dropdown1BtnStyle: {
        width: customPixel.wF - customPixel.w20 * 2,
        height: customPixel.hFull < 534 ? customPixel.h50 : customPixel.h40,
        backgroundColor: "#FFF",
        borderRadius: customPixel.h4,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    inputCont: {
        marginTop: customPixel.h30,
    },
    label: {
        marginBottom: customPixel.h12,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
    },
    imgUp: {
        marginTop: customPixel.h10,
        alignItems: "center",
    },
    imgText: {
        textAlign: "center",
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#898989",
        marginTop: customPixel.h10,
        // marginBottom: customPixel.h120,
    },
    imgContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imgStyle: {
        height: customPixel.h100,
        width: customPixel.h100,
        marginRight: customPixel.h12,
        marginBottom: customPixel.h12,
    },
});
