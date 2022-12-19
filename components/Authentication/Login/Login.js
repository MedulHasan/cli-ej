import React, { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { loginStyles } from "./LoginStyle";
import EmailIcon from "../../../assets/svgs/login/email.svg";
import PasswordIcon from "../../../assets/svgs/login/password.svg";
import PasswordIcon2 from "../../../assets/svgs/login/password2.svg";
import GoogleIcon from "../../../assets/svgs/login/google1.svg";
import FacebookIcon from "../../../assets/svgs/login/facebook1.svg";
import { loginFormValidation } from "./loginFormValidation";
import { useToast } from "native-base";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import {
    signInUsingFacebook,
    signInUsingGoogle,
    storeUserInfoInSecureStore,
} from "./ssoFunctions";

import { confirmEmailStyles } from "../ConfirmEmail/ConfirmEmailStyle";
import GoogleLogin from "../utils/GoogleLogin";
import FecebookLogin from "../utils/FecebookLogin";
import { useEffect } from "react";
import config from "../../../config";
import { fetchGetItem } from "../../../redux/slices/util/fetchGetItem";

const initialValue = {
    email: "",
    password: "",
};

const Login = (props) => {
    const thisRouteName = props.route.name;
    const name = thisRouteName === "login" ? "Home" : thisRouteName;
    let routeName = props.route.params?.name ? props.route.params?.name : name;

    let slug = props.route.params?.slug || "";
    const navigation = useNavigation();
    const toast = useToast();
    const { signInUsingEmailAndPassword, state, dispatch } = useAuth();
    const [seePassword, setSeePassword] = useState(false);
    const [formValue, setFormValue] = useState(initialValue);
    const [formError, setFormError] = useState({});
    const [showLoaderGL, setShowLoaderGL] = useState(false);
    const [showLoaderFB, setShowLoaderFB] = useState(false);

    const [request, response, promptAsync] = GoogleLogin();
    const [requestFB, responseFB, promptAsyncFB] = FecebookLogin();

    const getGoogleUserInfo = async () => {
        setShowLoaderGL(true);
        const res = await signInUsingGoogle(promptAsync);
        if (res?.response?.records?.access_token) {
            loginHandler(res);
        } else {
            setShowLoaderGL(false);
        }
    };

    const getFacebookUserInfo = async () => {
        setShowLoaderFB(true);
        const res = await signInUsingFacebook(promptAsyncFB);
        if (res?.response?.records?.access_token) {
            loginHandler(res);
        } else {
            setShowLoaderFB(false);
        }
    };

    const handleLogin = async () => {
        const error = loginFormValidation(formValue);
        if (Object.keys(error).length === 0) {
            setFormError({});
            const data = await signInUsingEmailAndPassword(formValue);
            loginHandler(data);
        } else {
            setFormError(error);
        }
    };

    const loginHandler = async (data) => {
        const { message, code } = data?.response?.status;
        const records = data?.response?.records;
        if (message === "OK") {
            setFormError({});
            await storeUserInfoInSecureStore(
                records,
                dispatch,
                toast,
                routeName,
                navigation,
                slug,
                thisRouteName
            );
            setFormValue(initialValue);
        } else if (code === 501) {
            setFormError({
                ["authError"]: message,
            });
        } else {
            setFormError({
                ["authError"]: "Email/password is incorrect",
            });
            dispatch({
                type: "SIGN_IN",
                token: null,
                isLoading: false,
            });
        }
        setShowLoaderGL(false);
        setShowLoaderFB(false);
    };

    const handleChange = (name, text) => {
        setFormValue({
            ...formValue,
            [name]: text,
        });
    };

    const handleSeePassword = () => {
        setSeePassword(!seePassword);
    };

    const moveSignUpPage = () => {
        setFormError({});
        navigation.navigate("registration");
    };

    return (
        <View style={loginStyles.container}>
            <Text style={loginStyles.loginText}>Sign In</Text>

            <View>
                <View style={loginStyles.inputTextContainer}>
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
                        style={loginStyles.inputField}
                        placeholder='e.g, johnson@gmail.com'
                        onChangeText={(text) => handleChange("email", text)}
                        value={formValue.email}
                    />
                    <EmailIcon />
                </View>
                <Text style={loginStyles.noteText}>{formError.email}</Text>
            </View>
            <View>
                <View style={loginStyles.inputTextContainer}>
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
                        style={loginStyles.inputField}
                        placeholder='**************'
                        secureTextEntry={!seePassword ? true : false}
                        onChangeText={(text) => handleChange("password", text)}
                        value={formValue.password}
                    />
                    {seePassword ? (
                        <PasswordIcon2 onPress={handleSeePassword} />
                    ) : (
                        <PasswordIcon onPress={handleSeePassword} />
                    )}
                </View>
            </View>
            <View style={loginStyles.forgetCont}>
                <Text style={[loginStyles.noteText]}>
                    {formError.password ||
                        formError?.authError ||
                        formError?.message}
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Forget Password")}
                >
                    <Text style={loginStyles.forgetPassword}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback
                onPress={() => (state?.isLoading ? {} : handleLogin())}
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
                        <Text style={loginStyles.loginButtonText}>Login</Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
            <View style={loginStyles.or}>
                <View style={loginStyles.hrLine} />
                <Text style={loginStyles.orText}>or use other accounts</Text>
                <View style={loginStyles.hrLine} />
            </View>
            <TouchableOpacity
                onPress={() => (showLoaderGL ? {} : getGoogleUserInfo())}
            >
                <View style={loginStyles.ssoLogin}>
                    {showLoaderGL && (
                        <View style={confirmEmailStyles.loading}>
                            <CustomSpinner
                                filePath={require("../../../assets/lottie/loader.json")}
                                size={{
                                    width: customPixel.h80,
                                    height: customPixel.h70,
                                }}
                            />
                        </View>
                    )}
                    <View style={loginStyles.ssoLogo}>
                        <GoogleIcon />
                    </View>
                    <Text style={loginStyles.ssoText}>Sign in with Google</Text>
                </View>
            </TouchableOpacity>
            <View style={{ marginBottom: 0 }}>
                <TouchableOpacity
                    onPress={() => (showLoaderFB ? {} : getFacebookUserInfo())}
                >
                    <View
                        style={[
                            loginStyles.ssoLogin,
                            { backgroundColor: "#3C5A9A" },
                        ]}
                    >
                        {showLoaderFB && (
                            <View style={confirmEmailStyles.loading}>
                                <CustomSpinner
                                    filePath={require("../../../assets/lottie/loader.json")}
                                    size={{
                                        width: customPixel.h80,
                                        height: customPixel.h70,
                                    }}
                                />
                            </View>
                        )}
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
                    Don't have an account?{" "}
                </Text>
                <Text style={loginStyles.register} onPress={moveSignUpPage}>
                    Register Now
                </Text>
            </View>
        </View>
    );
};

export default Login;
