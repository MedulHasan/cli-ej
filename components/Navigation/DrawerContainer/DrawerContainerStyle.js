import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("window");

export const drawerStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C2C2C",
        paddingHorizontal: width * 0.054,
        paddingTop: height * 0.015,
        paddingRight: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    closeIconCont: {
        width: customPixel.h50,
        flexDirection: "row",
        justifyContent: "center",
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: height * 0.065,
        marginBottom: height * 0.035,
        marginLeft: 10,
    },
    userImage: {
        width: height * 0.065,
        height: height * 0.065,
    },
    userIcoin: {
        backgroundColor: "#3C3C3C",
        width: height * 0.065,
        height: height * 0.065,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.031,
    },
    noAccount: {
        color: "#FFFFFF",
        fontFamily: "DMSans_700Bold",
        fontSize: height * 0.018,
    },
    createAccount: {
        fontFamily: "Roboto_500Medium",
        color: "#DFDFDF",
        fontSize: height * 0.014,
    },
    hrLine: {
        borderTopWidth: 1,
        borderTopColor: "#505050",
        marginTop: height * 0.047,
        marginBottom: height * 0.03,
    },
    drawerItem: {
        marginLeft: 0,
        marginVertical: height < 550 ? -4 : 0,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    itemText: {
        color: "#DFDFDF",
        fontFamily: "DMSans_500Medium",
        fontSize: height * 0.018,
        marginLeft: width * 0.031,
    },
});
