import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { accountCreatedStyle } from "./AccountCreatedStyle";
import AccountCreatedIcon from "../../../assets/svgs/accountCreated/accountCreated.svg";

const AccountCreated = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("login");
        }, 2000);
    }, []);
    return (
        <View style={accountCreatedStyle.container}>
            <AccountCreatedIcon style={accountCreatedStyle.icon} />
            <Text style={accountCreatedStyle.text}>
                Your account is successfully created!
            </Text>
        </View>
    );
};

export default AccountCreated;
