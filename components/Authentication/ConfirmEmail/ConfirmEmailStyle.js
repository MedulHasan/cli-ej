import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

export const confirmEmailStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width * 0.06,
    },
    brokenEmail: {
        marginTop: height * 0.05,
    },
    checkEmail: {
        fontFamily: "DMSans_700Bold",
        fontSize: 24,
        marginVertical: height * 0.03,
        color: "#2C2C2C",
    },
    text: {
        fontSize: 18,
        fontFamily: "Roboto_500Medium",
        lineHeight: 28,
        color: "#898989",
        textAlign: "center",
    },
    otpContainer: {
        marginTop: height * 0.03,
        marginBottom: customPixel.h15,
        flexDirection: "row",
    },
    otpgap: {
        marginRight: 10,
    },
    textInputField: {
        fontSize: 25,
        borderBottomWidth: 2,
        borderBottomColor: "#898989",
        width: width * 0.15,
        height: 50,
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: 32,
        lineHeight: 42,
    },
    resendCode: {
        fontFamily: "Roboto_500Medium",
        fontSize: 18,
        lineHeight: 26,
        color: "#2C2C2C",
    },
    anotherEmailContainer: {
        marginTop: 50,
        paddingHorizontal: width * 0.02,
    },
    checkSpam: {
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        lineHeight: 26,
        color: "#898989",
        textAlign: "center",
    },
    tryAnother: {
        color: "#2C2C2C",
        textDecorationLine: "underline",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
        lineHeight: 26,
        textAlign: "center",
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    errorText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h25,
        color: "#E43147",
        marginBottom: customPixel.h5,
    },
});
