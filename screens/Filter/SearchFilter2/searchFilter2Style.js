import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const searchFilter2Style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: customPixel.h24,
    },
    imageCont: {
        width: customPixel.h120,
        height: customPixel.h120,
        marginRight: customPixel.h16,
        marginBottom: 0,
    },
    img: {
        height: customPixel.h65,
        width: customPixel.h65,
    },
    text: {
        marginVertical: customPixel.h10,
        lineHeight: customPixel.h20,
        width: customPixel.wF - customPixel.h180,
    },
});
