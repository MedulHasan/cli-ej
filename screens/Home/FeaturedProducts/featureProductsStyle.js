import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
const { height, width } = Dimensions.get("window");

const ProductsStyle = StyleSheet.create({
    container: {},
    item: {
        marginBottom: customPixel.h20,
    },
    imageContainer: {
        width: width < 321 ? customPixel.h160 + 25 : width / 2 - 30,
        height: width < 321 ? customPixel.h160 + 25 : width / 2 - 30,
        backgroundColor: "#FFFFFF",
        marginBottom: customPixel.h10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    img: {
        width: customPixel.h80,
        height: customPixel.h80,
    },
    text: {
        fontFamily: "DMSans_400Regular",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h19,
        color: "#2c2c2c",
        marginVertical: customPixel.h7,
        width: width < 321 ? customPixel.h160 + 25 : width / 2 - 30,
    },
    price: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h17,
        color: "#2c2c2c",
        marginTop: customPixel.h1,
    },
});

export { ProductsStyle };
