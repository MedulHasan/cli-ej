import { StyleSheet } from "react-native";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

export const refundDetailsStyle = StyleSheet.create({
    detailHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: customPixel.h0,
    },
    imgCont: {
        height: customPixel.h75,
        width: customPixel.h75,
        backgroundColor: "#F3F3F3",
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: customPixel.h50,
        width: customPixel.h50,
    },
    reason: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F3F3F3",
        borderRadius: 6,
        paddingHorizontal: customPixel.h15,
        paddingVertical: customPixel.h14,
        marginTop: customPixel.h15,
    },
    reasonText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h13,
        color: "#2C2C2C",
    },
    uploadCont: {
        marginTop: customPixel.h12,
        flexDirection: "row",
    },
    uploadPic: {
        width: customPixel.h90,
        height: customPixel.h90,
        borderRadius: customPixel.h4,
        marginRight: customPixel.h10,
    },
    trackRequest: {
        marginBottom: customPixel.h30,
    },
    trackTitle: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#2C2C2C",
        marginTop: customPixel.h30,
    },
    writeMessageText: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        color: "#2C2C2C",
        marginTop: customPixel.h20,
        marginBottom: customPixel.h14,
    },
    textArea: {
        borderColor: "#DFDFDF",
        borderWidth: customPixel.h1,
        borderRadius: customPixel.h4,
        paddingHorizontal: customPixel.h16,
        paddingVertical: customPixel.h12,
        textAlignVertical: "top",
        backgroundColor: "#F3F3F3",
        fontFamily: "Roboto_500Medium",
    },
    sendMessage: {
        backgroundColor: "#FCCA19",
        borderRadius: customPixel.h6,
        marginTop: customPixel.h16,
    },
    sendMessageText: {
        color: "#2C2C2C",
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h16,
        textAlign: "center",
        paddingVertical: customPixel.h15,
    },
    showMessage: {
        paddingHorizontal: customPixel.h10,
        paddingVertical: customPixel.h12,
        borderColor: "#DFDFDF",
        borderWidth: customPixel.h1,
        borderRadius: customPixel.h6,
        maxHeight: customPixel.h300,
    },
    message: {
        display: "flex",
        flexDirection: "row",
        marginBottom: customPixel.h20,
    },
    userImage: {
        borderRadius: 50,
        width: customPixel.h40,
        height: customPixel.h40,
    },

    messageTextBg: {
        backgroundColor: "#F3F3F3",
        maxWidth: customPixel.h280,
        borderRadius: customPixel.h14,
    },
    messageText: {
        fontSize: customPixel.h12,
        color: "#868686",
        paddingHorizontal: customPixel.h16,
        paddingVertical: customPixel.h18,
    },
    messageTime: {
        fontSize: customPixel.h9,
        fontFamily: "Roboto_500Medium",
        color: "#868686",
        paddingTop: customPixel.h8,
    },
});

export const dynamicStatusText = (status) => {
    return status === "In progress"
        ? "#DEA512"
        : status === "Pending"
        ? "#898989"
        : status === "Accepted"
        ? "#009651"
        : status === "Delivered"
        ? "#009651"
        : status === "Declined"
        ? "#C8191C"
        : status === "Processing"
        ? "#DEA512"
        : "#898989";
};
export const dynamicStatusBG = (status) => {
    return status === "In progress"
        ? "#FEF8E7"
        : status === "Pending"
        ? "#F4F4F4"
        : status === "Accepted"
        ? "#EBF9F1"
        : status === "Delivered"
        ? "#EBF9F1"
        : status === "Declined"
        ? "#F9E8E8"
        : status === "Processing"
        ? "#FEF8E7"
        : "#F4F4F4";
};
export const dynamicStatusDot = (status) => {
    return status === "In progress"
        ? "#DEA512"
        : status === "Pending"
        ? "#898989"
        : status === "Accepted"
        ? "#009651"
        : status === "Delivered"
        ? "#009651"
        : status === "Declined"
        ? "#C8191C"
        : status === "Processing"
        ? "#DEA512"
        : status === "Opened"
        ? "#898989"
        : "#898989";
};
export const dynamicStatusForStepIndicatorText = (status) => {
    return status === "In progress"
        ? "#DEA512"
        : status === "Pending"
        ? "#898989"
        : status === "Accepted"
        ? "#009651"
        : status === "Delivered"
        ? "#009651"
        : status === "Declined"
        ? "#C8191C"
        : status === "Processing"
        ? "#DEA512"
        : status === "Opened"
        ? "#898989"
        : "#DEA512";
};
export const dynamicStatusForStepIndicatorBG = (status) => {
    return status === "In progress"
        ? "#FEF8E7"
        : status === "Pending"
        ? "#F4F4F4"
        : status === "Accepted"
        ? "#EBF9F1"
        : status === "Delivered"
        ? "#EBF9F1"
        : status === "Declined"
        ? "#F9E8E8"
        : status === "Processing"
        ? "#FEF8E7"
        : "#FEF8E7";
};
export const dynamicStatusForStepIndicatorDot = (status) => {
    return status === "In progress"
        ? "#DEA512"
        : status === "Pending"
        ? "#898989"
        : status === "Accepted"
        ? "#009651"
        : status === "Delivered"
        ? "#009651"
        : status === "Declined"
        ? "#C8191C"
        : status === "Processing"
        ? "#DEA512"
        : status === "Opened"
        ? "#898989"
        : "#DEA512";
};
