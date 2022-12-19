import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const searchFilterStyles = StyleSheet.create({
    filterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: customPixel.h25,
    },
    filterBtnCont: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2C2C2C",
        paddingVertical: customPixel.h10,
        borderRadius: 4,
        paddingHorizontal: customPixel.h20,
        marginRight: customPixel.h8,
        width: customPixel.h90,
    },
    filrerText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#FFFFFF",
        marginLeft: customPixel.h8,
    },
    gridIcon: {},
});
