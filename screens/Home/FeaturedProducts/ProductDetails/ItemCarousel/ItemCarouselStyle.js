import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

const imgContHeight = customPixel.h270;

export const itemCarouselStyle = StyleSheet.create({
    imageSize: {
        height: customPixel.h196,
        width: customPixel.h196,
    },
    singleImgCont: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: customPixel.wF,
        height: imgContHeight,
        backgroundColor: "#F3F3F3",
        zIndex: -1,
    },
    leftIcon: {
        position: "absolute",
        left: customPixel.h10,
        paddingLeft: customPixel.h10,
        top: imgContHeight / 2 - customPixel.h30,
        paddingTop: customPixel.h30,
        zIndex: 1,
        height: customPixel.h70,
        width: customPixel.h30,
    },
    rightIcon: {
        position: "absolute",
        right: customPixel.h10,
        paddingLeft: customPixel.h10,
        top: imgContHeight / 2 - customPixel.h30,
        paddingTop: customPixel.h30,
        zIndex: 1,
        height: customPixel.h70,
        width: customPixel.h30,
    },
    indidatorCont: {
        width: customPixel.h60,
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        left: (customPixel.wF - customPixel.h60) / 2,
        top: customPixel.h250,
    },
    indicator: {
        height: customPixel.h8,
        width: customPixel.h8,
        borderRadius: 50,
        backgroundColor: "#89898959",
        marginHorizontal: customPixel.h4,
    },
});
