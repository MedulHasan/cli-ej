import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const illustrationMArginTop = height * 0.019;
const titleContainerTop = height * 0.48;
const textTop = height * 0.68;
const titleFontSize = height * 0.035;
const textFontSize = height * 0.023;

export const Onboard1Style = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        minWidth: width,
    },
    illustration1: {
        position: "absolute",
        right: 0,
        marginTop: -0.07,
    },
    illustration2: {
        position: "absolute",
        left: 0,
        marginTop: -0.07,
    },
    illustration3: {
        alignSelf: "center",
        marginTop: -35,
    },
    titleContainer: {
        position: "absolute",
        left: 20,
        top: titleContainerTop,
    },
    titleContainer2: {
        position: "absolute",
        right: 20,
        top: titleContainerTop,
    },
    titleContainer3: {
        position: "absolute",
        top: titleContainerTop + 20,
    },
    title: {
        fontSize: titleFontSize,
        fontFamily: "DMSans_700Bold",
    },
    title2: {
        fontSize: titleFontSize,
        fontFamily: "DMSans_700Bold",
        textAlign: "right",
    },
    title3: {
        fontSize: titleFontSize,
        fontFamily: "DMSans_700Bold",
        textAlign: "center",
        width: width,
    },
    textContainet: {
        position: "absolute",
        left: 20,
        top: textTop,
    },
    textContainet2: {
        position: "absolute",
        right: 20,
        top: textTop,
    },
    textContainet3: {
        position: "absolute",
        top: textTop - height * 0.01,
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: textFontSize,
        color: "#898989",
    },
    text2: {
        fontFamily: "Roboto_500Medium",
        fontSize: textFontSize,
        color: "#898989",
        textAlign: "right",
    },
    text3: {
        fontFamily: "Roboto_500Medium",
        fontSize: textFontSize,
        color: "#898989",
        textAlign: "center",
        width: width,
    },
    move: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingBottom:
            height > 533 && height < 781 ? height * 0.01 : height * 0.02,
    },
    skip: {
        fontFamily: "DMSans_500Medium",
        fontSize: width * 0.055,
        color: "#898989",
    },
});
