import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const forgetPasswordStyle = StyleSheet.create({
    header: {
        paddingTop: height * 0.03,
        backgroundColor: "#fff",
        minHeight: height,
    },
    container: {
        paddingHorizontal: width * 0.06,
    },
    text: {
        marginVertical: height * 0.03,
        fontSize: 18,
        fontFamily: "Roboto_500Medium",
        color: "#898989",
        lineHeight: 28,
    },
    submit: {
        marginTop: height * 0.04,
        flexDirection: "row",
        justifyContent: "center",
    },
});
