import { Dimensions, StyleSheet } from "react-native";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";

const { width } = Dimensions.get("screen");

const CommonStyles = StyleSheet.create({
    globalContainer: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: customPixel.h20,
        minHeight: customPixel.HWH,
    },
    container: {
        backgroundColor: "#fff",
        paddingTop: customPixel.h15,
        paddingBottom: customPixel.h5,
        height: customPixel.h64,
    },
    hrLine: {
        borderColor: "#cccccc",
        borderBottomWidth: 1,
        width: width - 30,
        marginTop: customPixel.h20,
    },
    customHeaderContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: 3,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: customPixel.h40,
    },
    headerName: {
        fontSize: customPixel.h20,
        fontFamily: "DMSans_700Bold",
        color: "#2C2C2C",
    },
    customHeaderIcon: {
        position: "absolute",
        left: customPixel.h10,
        paddingLeft: customPixel.h10,
        top: customPixel.h12,
        paddingTop: customPixel.h10,
        height: customPixel.h40,
        width: customPixel.h60,
    },
});

export default CommonStyles;
