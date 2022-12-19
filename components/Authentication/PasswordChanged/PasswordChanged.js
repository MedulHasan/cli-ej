import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { passwordChangedStytel } from "./PasswordChangedStyle";
import LikeIcon from "../../../assets/svgs/successfullyChangedPassword.svg";
import { loginStyles } from "../Login/LoginStyle";

const PasswordChanged = ({ navigation }) => {
    return (
        <View style={passwordChangedStytel.container}>
            <LikeIcon style={passwordChangedStytel.like} />
            <Text style={passwordChangedStytel.title}>
                Password Successfully Changed
            </Text>
            <Text style={passwordChangedStytel.text}>
                Use your new password to login now.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <View style={loginStyles.loginButton}>
                    <Text style={loginStyles.loginButtonText}>Login</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordChanged;
