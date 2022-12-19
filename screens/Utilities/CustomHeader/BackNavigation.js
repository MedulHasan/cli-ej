import React from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import CommonStyles from "../../../screens/Utilities/CommonStyles/CommonStyles";
import BackIcon from "../../../assets/svgs/backButton.svg";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const BackNavigation = (props) => {
    const { navigationProps, routeName, capitalize } = props;

    const splitRouteName = routeName.split(" ");
    const nameArray = splitRouteName.map(
        (cap) => cap.charAt(0).toUpperCase() + cap.slice(1)
    );
    const capitalizeString = nameArray.join(" ");

    const backScreen = () => {
        navigationProps.goBack();
    };
    return (
        <View style={CommonStyles.container}>
            <View style={CommonStyles.customHeaderContainer}>
                <Text style={CommonStyles.headerName}>
                    {capitalize ? capitalizeString : routeName.toUpperCase()}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => backScreen()}
                style={CommonStyles.customHeaderIcon}
            >
                <BackIcon height={customPixel.h28} width={customPixel.h28} />
            </TouchableOpacity>
        </View>
    );
};

export default BackNavigation;
