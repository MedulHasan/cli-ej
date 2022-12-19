import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const ratingAndReviewsStyle = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingBottom: customPixel.h20,
    },
    subCont: {
        backgroundColor: "white",
        // borderTopWidth: 1,
        // borderColor: "#DFDFDF",
        marginHorizontal: customPixel.h20,
    },
    titleCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#DFDFDF",
        paddingVertical: customPixel.h20,
    },
    title: {
        color: "#2C2C2C",
        fontSize: customPixel.h16,
        fontFamily: "DMSans_500Medium",
    },
    userCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: customPixel.h20,
    },
    userSubCont: {
        flexDirection: "row",
    },
    userImg: {
        height: customPixel.h60,
        width: customPixel.h60,
        borderRadius: customPixel.h50,
        marginRight: customPixel.h12,
    },
    userName: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
    },
    time: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#868686",
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h24,
        color: "#868686",
        marginTop: customPixel.h12,
    },
    reviewImgCont: {
        flexDirection: "row",
        marginTop: customPixel.h12,
    },
    revireImg: {
        height: customPixel.h60,
        width: customPixel.h60,
        marginRight: customPixel.h12,
    },
    seeAllBorder: {
        // borderBottomWidth: 1,
        // borderColor: "#DFDFDF",
    },
    seeAllCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: customPixel.h20,
        paddingBottom: customPixel.h20,
    },
    seeAlltext: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
        marginRight: customPixel.h7,
    },
});
