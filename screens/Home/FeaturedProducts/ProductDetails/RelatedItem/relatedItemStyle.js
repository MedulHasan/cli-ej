import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const relatedItemStyle = StyleSheet.create({
    container: {
        paddingBottom: customPixel.h10,
    },
    imgCont: {
        height: customPixel.h100,
        width: customPixel.h100,
        backgroundColor: "#F3F3F3",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginRight: customPixel.h20,
    },
    img: {
        height: customPixel.h50,
        width: customPixel.h50,
        borderRadius: 4,
    },
    title: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginBottom: customPixel.h12,
    },
});
