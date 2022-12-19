import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import CommonStyles from "../CommonStyles/CommonStyles";
import MenuIcon from "../../../assets/svgs/menuIcon.svg";

const { width } = Dimensions.get("window");

const MenuNavigation = (props) => {
    const taggleDrawerMedu = () => {
        props.navigationProps.toggleDrawer();
    };
    return (
        <View style={CommonStyles.container}>
            <View style={CommonStyles.customHeaderContainer}>
                <Text style={CommonStyles.headerName}>
                    {props.routeName.name?.toUpperCase()}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => taggleDrawerMedu()}
                style={CommonStyles.customHeaderIcon}
            >
                <MenuIcon width={width * 0.08} height={22} />
            </TouchableOpacity>
        </View>
    );
};

export default MenuNavigation;
