import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const passwordChangedStytel = StyleSheet.create({
    container: {
        minHeight: height,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingHorizontal: width * 0.06,
    },
    like: {
        marginTop: height * 0.15,
    },
    title: {
        fontFamily: "DMSans_700Bold",
        fontSize: 24,
        lineHeight: 34,
        color: "#2C2C2C",
        textAlign: "center",
        marginVertical: height * 0.03,
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: 18,
        lineHeight: 26,
        textAlign: "center",
        color: "#898989",
        marginBottom: height * 0.03,
    },
});
