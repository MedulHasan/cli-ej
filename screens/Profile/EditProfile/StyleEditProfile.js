import { Dimensions, StyleSheet } from "react-native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("screen");

export const EditProfileStyle = StyleSheet.create({
    profileDisplay: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: customPixel.h22,
    },
    title: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
    },
    image: {
        height: customPixel.h85,
        width: customPixel.h85,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000",
        marginRight: customPixel.h22,
    },
    changephotoCont: {},
    changePhoto: {
        borderRadius: 4,
        width: height < 534 ? customPixel.h137 : customPixel.h152,
        paddingVertical: height < 534 ? height * 0.01 : height * 0.016,
        paddingHorizontal: height < 534 ? height * 0.022 : height * 0.025,
        backgroundColor: "#2C2C2C",
    },
    changePhotoText: {
        fontFamily: "DMSans_500Medium",
        color: "#FFFFFF",
        fontSize: height < 534 ? height * 0.023 : height * 0.019,
    },
    remove: {
        width: height < 534 ? width * 0.35 : width * 0.39,
        textAlign: "center",
        color: "#898989",
        fontFamily: "DMSans_500Medium",
        fontSize: height * 0.019,
        marginTop: height * 0.016,
    },
    personalInfoCont: {
        marginTop: height * 0.051,
    },
    nameCont: {
        flexDirection: "row",
    },
    nameInput: {
        width: (width - width * 0.051 - 30) / 2,
    },
    label: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
        marginBottom: height * 0.0104,
        marginTop: height * 0.023,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        height: height * 0.06,
        borderRadius: 2,
        fontSize: height * 0.02,
        color: "#898989",
        fontFamily: "Roboto_500Medium",
        paddingHorizontal: 10,
    },
    gendeErrorCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioCont: {
        flexDirection: "row",
        marginLeft: -customPixel.h10,
    },
    radioButton: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: height < 534 ? height * 0.012 : height * 0.016,
        paddingLeft: height * 0.016,
        paddingRight: height * 0.03,
        borderColor: "#DFDFDF",
    },
    radioText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        marginLeft: 10,
        color: "#898989",
    },
    phone: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 2,
    },
    changeInfo: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.6,
        elevation: 24,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: height * 0.016,
        width: width,
    },
    cancel: {
        width: (width - width * 0.051 - 30) / 2,
        height: customPixel.h45,
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "DMSans_700Bold",
        color: "#9B9B9B",
        fontSize: height * 0.0205,
    },
    errorCont: {
        backgroundColor: "#F9E8E8",
        flexDirection: "row",
        paddingHorizontal: height * 0.026,
        paddingVertical: height * 0.018,
    },
    errorText: {
        fontFamily: "DMSans_500Medium",
        color: "#C8191C",
        fontSize: height * 0.018,
        marginLeft: width * 0.02,
    },
    dropdown1BtnStyle: {
        width: (width - customPixel.w20 * 2) / 3.26,
        height: customPixel.h45,
        backgroundColor: "#FFF",
        borderRadius: customPixel.h4,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
});
