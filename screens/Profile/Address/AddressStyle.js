import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("window");
const AddressStyle = StyleSheet.create({
    container: {
        paddingHorizontal: customPixel.h20,
        paddingTop: customPixel.h20,
        backgroundColor: "#fff",
        minHeight: height,
        paddingBottom:
            height < 534 ? customPixel.h31 * 6 : customPixel.h31 * 5.7,
    },
    btnContainer: {
        backgroundColor: "#fff",
        position: "absolute",
        left: 0,
        bottom: 0,
        width: width,
        zIndex: 1,
        paddingVertical: customPixel.h31,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.6,
        elevation: 24,
    },
    btnText: {
        textAlign: "center",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },

    singleAddressCont: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 6,
        padding: customPixel.w20,
        paddingBottom: customPixel.h10,
        marginBottom: customPixel.h20,
    },
    titleCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: customPixel.wF - customPixel.h20 * 4,
    },
    title: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    name: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
        lineHeight: customPixel.h25,
    },
    address: {
        marginTop: customPixel.h5,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
        lineHeight: customPixel.h26,
    },
    default: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: customPixel.h2,
        height: customPixel.h45,
    },
    defaultText: {
        marginLeft: customPixel.w7,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h12,
    },
    makeDefault: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h13,
        color: "#2C2C2C",
        textDecorationLine: "underline",
        marginRight: "auto",
    },
    noAddress: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
});

export default AddressStyle;
