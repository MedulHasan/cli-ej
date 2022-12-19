import { StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

export const filtersStyles = StyleSheet.create({
    selectParent: {
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
    },
    selectCont: {
        marginTop: customPixel.h20,
        paddingBottom: customPixel.h15,
    },
    subSelectCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    selectText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    categoryCont: {
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
        paddingBottom: customPixel.h15,
        marginBottom: customPixel.h15,
    },
    categoryText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#898989",
    },
    visitCategory: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: customPixel.h20,
    },
    visiTtext: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#898989",
        marginRight: customPixel.h8,
    },
    inputCont: {
        flexDirection: "row",
        paddingBottom: customPixel.h20,
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
    },
    inputGroup: {
        width: (customPixel.wF - customPixel.h65) / 2,
        marginTop: customPixel.h20,
    },
    inputText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h13,
        color: "#898989",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#898989",
    },
    ratingCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: customPixel.h18,
    },
    applyCont: {
        position: "absolute",
        bottom: 0,
    },
    selececolorCont: {
        flexDirection: "row",
        alignItems: "center",
        width: (customPixel.wF - customPixel.h40) / 3,
    },
    selececolorCont1: {
        flexDirection: "row",
        alignItems: "center",
        width: (customPixel.wF - customPixel.h40) / 3.2,
    },
    colorText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
        marginLeft: customPixel.h12,
    },
    keyView: {
        flex: 1,
    },
});
