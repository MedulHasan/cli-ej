import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

export const loginStyles = StyleSheet.create({
    container: {
        paddingHorizontal: customPixel.h20,
        backgroundColor: "#fff",
        minHeight: height,
    },
    loginText: {
        marginTop: customPixel.h45,
        marginBottom: customPixel.h4,
        fontSize: customPixel.h24,
        fontFamily: "DMSans_700Bold",
    },
    inputTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: customPixel.h16,
    },
    textErrorMessage: {
        fontSize: customPixel.h13,
        fontFamily: "Roboto_500Medium",
        color: "#E43147",
    },
    inputText: {
        fontSize: customPixel.h15,
        fontFamily: "Roboto_500Medium",
        color: "#2C2C2C",
    },
    inputFieldContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#898989",
    },
    inputField: {
        fontSize: customPixel.h18,
        fontFamily: "Roboto_500Medium_Italic",
        padding: customPixel.h10,
        width: "93%",
    },
    forgetPassword: {
        fontFamily: "Roboto_500Medium",
        color: "#898989",
        marginTop: customPixel.h5,
    },
    forgetCont: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    loginButton: {
        marginTop: customPixel.h25,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FCCA19",
        height: customPixel.h60,
        borderRadius: customPixel.h6,
        width: customPixel.wF - customPixel.h40,
    },
    loginButtonText: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#333025",
    },
    hrLine: {
        borderColor: "#DFDFDF",
        borderBottomWidth: 1,
        width: customPixel.h70,
    },
    or: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: customPixel.h18,
    },
    orText: {
        fontSize: customPixel.h18,
        fontFamily: "Roboto_500Medium",
        marginHorizontal: customPixel.h10,
        color: "#898989",
    },
    ssoLogin: {
        marginBottom: customPixel.h15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4285F4",
        height: customPixel.h60,
        borderRadius: customPixel.h6,
        position: "relative",
    },
    ssoLogo: {
        marginRight: customPixel.h20,
        backgroundColor: "#FFFFFF",
        height: customPixel.h40,
        width: customPixel.h40,
        marginLeft: customPixel.h8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: customPixel.h4,
    },
    ssoText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h18,
        color: "#FFFFFF",
    },
    newAccount: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: customPixel.h25,
        fontSize: customPixel.h16,
    },
    doNotAccount: {
        fontFamily: "Roboto_400Regular",
        color: "#898989",
        fontSize: customPixel.h16,
        lineHeight: customPixel.h26,
    },
    register: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        lineHeight: customPixel.h26,
        textDecorationLine: "underline",
    },
    noteText: {
        fontFamily: "Roboto_500Medium_Italic",
        fontSize: customPixel.h13,
        marginTop: customPixel.h5,
        color: "#E43147",
        lineHeight: customPixel.h15,
    },
});
