import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
const { height } = Dimensions.get("window");

export const accountCreatedStyle = StyleSheet.create({
    container: {
        minHeight: height,
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.h20,
        alignItems: "center",
    },
    icon: {
        marginTop: customPixel.h120,
    },
    text: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h24,
        lineHeight: customPixel.h33,
        textAlign: "center",
        color: "#2C2C2C",
        marginTop: customPixel.h45,
        marginHorizontal: customPixel.h40,
    },
});
