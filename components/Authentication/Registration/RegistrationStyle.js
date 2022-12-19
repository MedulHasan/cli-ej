import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
const { height } = Dimensions.get("window");

export const registrationStyle = StyleSheet.create({
    signUpTitle: {
        marginTop: height * 0.03,
        marginBottom: customPixel.h20,
    },
    inputTextContainer: {
        marginTop: customPixel.h5,
    },
});
