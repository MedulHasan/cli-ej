import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
const { height } = Dimensions.get("window");

export const homeStyle = StyleSheet.create({
    body: {
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.w20,
    },
    text: {
        fontSize: customPixel.h16,
        textAlign: "left",
        paddingLeft: 5,
        margin: customPixel.h10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    searchContainer: {
        borderBottomWidth: 1,
        position: "absolute",
        top: height < 682 ? customPixel.h22 : customPixel.h14,
        right: customPixel.h24,
        width: customPixel.w290 + 15,
        height: customPixel.h30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        borderColor: "#898989",
        paddingBottom: customPixel.h4,
    },
    searchTextField: {
        width: customPixel.h240,
        fontFamily: "Roboto_500Medium",
        fontSize: height < 684 ? customPixel.h20 : customPixel.h16,
        color: "#C4C4C4",
    },
});
