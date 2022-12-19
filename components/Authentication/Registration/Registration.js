import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import useAuth from "../../../hooks/useAuth";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { loginStyles } from "../Login/LoginStyle";
import EmailIcon from "../../../assets/svgs/login/email.svg";
import UserIcon from "../../../assets/svgs/drawer/user.svg";
import PasswordIcon from "../../../assets/svgs/login/password.svg";
import PasswordIcon2 from "../../../assets/svgs/login/password2.svg";
import GoogleIcon from "../../../assets/svgs/login/google1.svg";
import FacebookIcon from "../../../assets/svgs/login/facebook1.svg";
import { registrationStyle } from "./RegistrationStyle";
import { formValidation } from "./formValidation";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import config from "../../../config";
import { useSelector } from "react-redux";

let initialValue = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};

const Registration = ({ navigation }) => {
    const { allPreferences } =
        useSelector((state) => state.getPreferences) || {};
    const { signUpUsingEmailAndPassword, state, dispatch } = useAuth();
    const [seePassword, setSeePassword] = useState(false);
    const [formValue, setFormValue] = useState(initialValue);
    const [formError, setFormError] = useState({});

    const handleChange = (name, text) => {
        setFormValue({
            ...formValue,
            [name]: text,
        });
    };

    const handleSignUp = async () => {
        const error = formValidation({
            value: formValue,
            passwordPreferences: allPreferences?.password,
        });
        if (Object.keys(error).length === 0) {
            const inputData = {
                ...formValue,
                password_confirmation: formValue.password,
            };
            const data = await signUpUsingEmailAndPassword(inputData);
            dispatch({
                type: "SIGN_UP",
                isLoading: false,
            });
            let records = data?.response?.records;
            if (records.length === 0) {
                setFormValue(initialValue);
                setFormError({});
                navigation.navigate("Confirm Email", {
                    email: inputData.email,
                    title: "Confirm Account",
                    nextScreen: "Account Created",
                    url: `${config.BASE_API_URL}/user/verification`,
                });
            } else {
                setFormError({
                    [Object.keys(records)[0]]:
                        records[Object.keys(records)[0]][0],
                });
            }
        } else {
            setFormError(error);
        }
    };

    const handleSeePassword = () => {
        setSeePassword(!seePassword);
    };
    const handleMoveLogin = () => {
        setFormError({});
        navigation.navigate("login");
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={loginStyles.container}>
                <Text
                    style={[
                        loginStyles.loginText,
                        registrationStyle.signUpTitle,
                    ]}
                >
                    Let's Sign Up
                </Text>
                <View>
                    <View
                        style={[
                            loginStyles.inputTextContainer,
                            registrationStyle.inputTextContainer,
                        ]}
                    >
                        <Text style={loginStyles.inputText}>Your Name</Text>
                    </View>
                    <View
                        style={[
                            loginStyles.inputFieldContainer,
                            {
                                borderBottomColor: formError?.name
                                    ? "red"
                                    : "#898989",
                            },
                        ]}
                    >
                        <TextInput
                            value={formValue.name}
                            style={loginStyles.inputField}
                            placeholder='e.g, Johnson Dammusa'
                            onChangeText={(text) => handleChange("name", text)}
                        />
                        <UserIcon />
                    </View>
                    <Text
                        style={[
                            loginStyles.noteText,
                            {
                                marginBottom: formError?.name
                                    ? customPixel.h5
                                    : 0,
                            },
                        ]}
                    >
                        {formError.name}
                    </Text>
                </View>
                <View>
                    <View
                        style={[
                            loginStyles.inputTextContainer,
                            registrationStyle.inputTextContainer,
                        ]}
                    >
                        <Text style={loginStyles.inputText}>Email Address</Text>
                    </View>
                    <View
                        style={[
                            loginStyles.inputFieldContainer,
                            {
                                borderBottomColor: formError?.email
                                    ? "red"
                                    : "#898989",
                            },
                        ]}
                    >
                        <TextInput
                            value={formValue.email}
                            style={loginStyles.inputField}
                            placeholder='e.g, johnson@gmail.com'
                            onChangeText={(text) => handleChange("email", text)}
                        />
                        <EmailIcon />
                    </View>
                    <Text
                        style={[
                            loginStyles.noteText,
                            {
                                marginBottom: formError?.email
                                    ? customPixel.h5
                                    : 0,
                            },
                        ]}
                    >
                        {formError.email}
                    </Text>
                </View>
                <View>
                    <View
                        style={[
                            loginStyles.inputTextContainer,
                            registrationStyle.inputTextContainer,
                        ]}
                    >
                        <Text style={loginStyles.inputText}>Password</Text>
                    </View>

                    <View
                        style={[
                            loginStyles.inputFieldContainer,
                            {
                                borderBottomColor: formError?.password
                                    ? "red"
                                    : "#898989",
                            },
                        ]}
                    >
                        <TextInput
                            value={formValue.password}
                            style={loginStyles.inputField}
                            placeholder='**************'
                            secureTextEntry={!seePassword ? true : false}
                            onChangeText={(text) =>
                                handleChange("password", text)
                            }
                        />
                        {seePassword ? (
                            <PasswordIcon2 onPress={handleSeePassword} />
                        ) : (
                            <PasswordIcon onPress={handleSeePassword} />
                        )}
                    </View>
                    <Text style={loginStyles.noteText}>
                        {formError.password || (
                            <Text
                                style={[
                                    loginStyles.noteText,
                                    { color: "#898989" },
                                ]}
                            >
                                Note: Password must contain minimum 6
                                characters, one uppercase, one lowercase, a
                                numeric letter and a symbol
                            </Text>
                        )}
                    </Text>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => (state?.isLoading ? {} : handleSignUp())}
                >
                    <View style={loginStyles.loginButton}>
                        {state?.isLoading ? (
                            <CustomSpinner
                                filePath={require("../../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h50,
                                }}
                            />
                        ) : (
                            <Text style={loginStyles.loginButtonText}>
                                Create Account
                            </Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                <View style={loginStyles.or}>
                    <View style={loginStyles.hrLine} />
                    <Text style={loginStyles.orText}>
                        or use other accounts
                    </Text>
                    <View style={loginStyles.hrLine} />
                </View>
                <TouchableOpacity>
                    <View style={loginStyles.ssoLogin}>
                        <View style={loginStyles.ssoLogo}>
                            <GoogleIcon />
                        </View>
                        <Text style={loginStyles.ssoText}>
                            Sign in with Google
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={{ marginBottom: 0 }}>
                    <TouchableOpacity>
                        <View
                            style={[
                                loginStyles.ssoLogin,
                                { backgroundColor: "#3C5A9A" },
                            ]}
                        >
                            <View style={loginStyles.ssoLogo}>
                                <FacebookIcon />
                            </View>
                            <Text style={loginStyles.ssoText}>
                                Sign in with Facebook
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={loginStyles.newAccount}>
                    <Text style={loginStyles.doNotAccount}>
                        Already have an account?{" "}
                    </Text>
                    <Text
                        style={loginStyles.register}
                        onPress={handleMoveLogin}
                    >
                        Login Now
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export const internalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});

export default Registration;
