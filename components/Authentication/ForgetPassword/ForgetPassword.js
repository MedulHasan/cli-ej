import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackNavigation from "../../../screens/Utilities/CustomHeader/BackNavigation";
import { forgetPasswordStyle } from "./ForgetPasswordStyle";
import { loginStyles } from "../Login/LoginStyle";
import EmailIcon from "../../../assets/svgs/login/email.svg";
import { useNavigation } from "@react-navigation/native";
import config from "../../../config";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const ForgetPassword = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const err = validation(email);
        if (err) {
            setError(err);
        } else {
            setLoading(true);
            setError("");
            const data = await fetchResetPassOtp(email);
            if (data?.response?.status?.message === "OK") {
                navigation.navigate("Confirm Email", {
                    email: email,
                    title: "Check Your Mail",
                    nextScreen: "Reset Password",
                    url: `${config.BASE_API_URL}/user/otp-validity`,
                });
                setEmail("");
            } else {
                setError(data?.response?.records?.email);
            }
            setLoading(false);
        }
    };
    return (
        <View style={forgetPasswordStyle.header}>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={forgetPasswordStyle.container}>
                <Text style={forgetPasswordStyle.text}>
                    Don't worry. Please enter the email address associated with
                    your account.
                </Text>
                <View>
                    <View style={loginStyles.inputTextContainer}>
                        <Text style={loginStyles.inputText}>Email Address</Text>
                    </View>
                    <View style={loginStyles.inputFieldContainer}>
                        <TextInput
                            style={loginStyles.inputField}
                            placeholder='e.g, johnson@gmail.com'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <EmailIcon />
                    </View>
                    <Text style={loginStyles.noteText}>{error}</Text>
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={loginStyles.loginButton}>
                        {loading ? (
                            <CustomSpinner
                                filePath={require("../../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h50,
                                }}
                            />
                        ) : (
                            <Text style={loginStyles.loginButtonText}>
                                Submit
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgetPassword;

const validation = (value) => {
    let regEmail =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let error = "";

    if (!value) {
        error = "Email is required";
    } else if (regEmail.test(value) === false) {
        error = "Enter a valid email address";
    }

    return error;
};

export const fetchResetPassOtp = async (email) => {
    return fetch(`${config.BASE_API_URL}/user/password/reset-link`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ email }),
    })
        .then((res) => res.json())
        .then((data) => data);
};
