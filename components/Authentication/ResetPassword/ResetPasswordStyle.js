import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

export const resetPasswordStyle = StyleSheet.create({
    header: {
        paddingTop: height * 0.03,
        backgroundColor: "#fff",
        minHeight: height,
    },
    container: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.05,
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: 18,
        lineHeight: 27,
        color: "#898989",
    },
    errMeaagae: {
        fontFamily: "Roboto_500Medium",
        fontSize: 13,
        lineHeight: 26,
        color: "red",
        marginTop: 2,
    },
    cancel: {
        textAlign: "center",
        fontFamily: "Roboto_500Medium",
        fontSize: 18,
        lineHeight: 26,
        color: "#898989",
        marginTop: customPixel.h30,
    },
});
