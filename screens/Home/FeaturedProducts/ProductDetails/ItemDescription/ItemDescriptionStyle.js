import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const itemDescriptionStyle = StyleSheet.create({
    container: {
        // marginHorizontal: customPixel.h20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: customPixel.h30,
        borderBottomWidth: 1,
        borderBottomColor: "#DFDFDF",
        paddingBottom: customPixel.h9,
    },
    headerText: {
        textAlign: "center",
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
    },
});
