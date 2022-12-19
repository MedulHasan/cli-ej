import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("screen");

const categoriesStyle = StyleSheet.create({
    container: {},
    title: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h18,
        color: "#000000",
        lineHeight: 20,
        marginTop: customPixel.h30,
        marginBottom: customPixel.h15,
    },
    item: {
        borderWidth: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderColor: "#DFDFDF",
        paddingHorizontal: customPixel.h8,
    },
    img: {
        margin: customPixel.h10,
        borderRadius: 5,
        backgroundColor: "#DFDFDF",
    },
    text: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h11,
        color: "#898989",
        textAlign: "center",
        marginTop: customPixel.h6,
        lineHeight: customPixel.h16,
    },
    emptyTextStyle: {
        textAlign: "center",
        width: width,
        marginVertical: 10,
        color: "#A3A3A5",
    },
});

export { categoriesStyle };
