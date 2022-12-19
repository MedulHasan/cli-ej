import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("screen");

export const ProfileStyles = StyleSheet.create({
    profileContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: width * 0.051,
        paddingVertical: height * 0.038,
        marginBottom: customPixel.h60,
    },
    hrLine: {
        borderBottomWidth: 1,
        borderColor: "#DFDFDF",
    },
    profileImageCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        height: height < 534 ? height * 0.109 : height * 0.103,
        width: height < 534 ? height * 0.109 : height * 0.103,
        borderRadius: 50,
        marginRight: width * 0.038,
        backgroundColor: "#F0F0E4",
    },
    name: {
        fontFamily: "DMSans_700Bold",
        fontSize: height < 534 ? height * 0.03 : height * 0.024,
        color: "#2C2C2C",
    },
    email: {
        fontFamily: "Roboto_500Medium",
        fontSize: height < 534 ? height * 0.02 : height * 0.016,
        color: "#898989",
    },
    editProfile: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.015,
    },
    editText: {
        fontFamily: "Roboto_500Medium",
        fontSize: height < 534 ? height * 0.023 : height * 0.018,
        color: "#2C2C2C",
        marginLeft: width * 0.011,
    },
    walletContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2C2C2C",
        borderRadius: 6,
        padding: height * 0.024,
        marginVertical: height * 0.038,
    },
    walletText: {
        fontFamily: "DMSans_500Medium",
        color: "#DFDFDF",
        fontSize: height * 0.018,
        marginBottom: height * 0.01,
    },
    wallet: {
        fontFamily: "DMSans_700Bold",
        color: "#DFDFDF",
        fontSize: height * 0.0256,
    },
    amount: {
        fontFamily: "DMSans_700Bold",
        color: "#FCCA19",
        fontSize: height * 0.0256,
        textAlign: "right",
    },
    quantityContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: width * 0.03,
    },
    quantityText: {
        fontFamily: "Roboto_500Medium",
        fontSize: height * 0.022,
        color: "#898989",
    },
    quantity: {
        fontFamily: "DMSans_700Bold",
        fontSize: height * 0.025,
        color: "#2C2C2C",
    },
    wishlistCont: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#DFDFDF",
        paddingHorizontal: 23,
    },
    info: {
        fontFamily: "DMSans_500Medium",
        fontSize: height * 0.022,
        color: "#898989",
        paddingVertical: height * 0.023,
    },
    infoBorder: {
        borderBottomWidth: 1,
        borderColor: "#DFDFDF",
    },
});
