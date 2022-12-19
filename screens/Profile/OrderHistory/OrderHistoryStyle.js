import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const { height } = Dimensions.get("window");

export const orderHistoryStyle = StyleSheet.create({
    itemsContainer: {
        minHeight: height,
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.w20,
        // paddingBottom: customPixel.h160,
    },
    filterCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: customPixel.h30,
    },
    filterText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    item: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        marginTop: customPixel.h20,
        borderRadius: customPixel.h6,
        padding: customPixel.h15,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: customPixel.h10,
    },
    headerText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
        width: "75%",
    },
    info: {
        flexDirection: "row",
    },
    infoTextCont: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: customPixel.w12,
    },
    infoText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#898989",
        marginLeft: customPixel.w7,
    },
});
