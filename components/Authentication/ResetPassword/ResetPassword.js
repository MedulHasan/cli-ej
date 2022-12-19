import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BackNavigation from "../../../screens/Utilities/CustomHeader/BackNavigation";
import { resetPasswordStyle } from "./ResetPasswordStyle";
import { loginStyles } from "../Login/LoginStyle";
import PasswordIcon from "../../../assets/svgs/login/password.svg";
import PasswordIcon2 from "../../../assets/svgs/login/password2.svg";
import { useNavigation } from "@react-navigation/native";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { passwordValidation } from "../Registration/formValidation";
import { fetchResetPassword } from "./fetchResetPassword";

const ResetPassword = (props) => {
    const { token } = props?.route?.params;
    const initialState = {
        password: "",
        password_confirmation: "",
        token,
    };
    const navigation = useNavigation();
    const [seePassword, setSeePassword] = useState(false);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
    const [formValue, setFormValue] = useState(initialState);
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSeePassword = () => {
        setSeePassword(!seePassword);
    };
    const handleSeeConfirmPassword = () => {
        setSeeConfirmPassword(!seeConfirmPassword);
    };
    const handleChange = (name, value) => {
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };
    const handleResetPassword = async () => {
        const error = passwordValidation(formValue);
        if (Object.keys(error).length === 0) {
            setFormError({});

            if (formValue.password !== formValue.password_confirmation) {
                setFormError({
                    ["confirmPassword"]:
                        "The password confirmation does not match.",
                });
            } else {
                setFormError({});
                setLoading(true);
                const data = await fetchResetPassword(formValue);
                const { status, records } = data.response;
                if (status.code === 200) {
                    setFormError({});
                    setFormValue(initialState);
                    navigation.navigate("Password Reset Done");
                } else {
                    setFormError({
                        [`new${Object.keys(records)[0]}`]:
                            records[Object.keys(records)[0]][0],
                    });
                }
            }
        } else {
            setFormError(error);
        }
        setLoading(false);
    };
    return (
        <View style={resetPasswordStyle.header}>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={resetPasswordStyle.container}>
                <Text style={resetPasswordStyle.text}>
                    Your new password must be different from previous used
                    passwords.
                </Text>
                <View>
                    <View>
                        <View style={loginStyles.inputTextContainer}>
                            <Text style={loginStyles.inputText}>
                                New Password
                            </Text>
                        </View>

                        <View style={loginStyles.inputFieldContainer}>
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
                    </View>
                    {formError?.password ? (
                        <Text style={resetPasswordStyle.errMeaagae}>
                            {formError.password}
                        </Text>
                    ) : (
                        <View></View>
                    )}
                    <View>
                        <View style={loginStyles.inputTextContainer}>
                            <Text style={loginStyles.inputText}>
                                Confirm Password
                            </Text>
                        </View>

                        <View style={loginStyles.inputFieldContainer}>
                            <TextInput
                                value={formValue.password_confirmation}
                                style={loginStyles.inputField}
                                placeholder='**************'
                                secureTextEntry={
                                    !seeConfirmPassword ? true : false
                                }
                                onChangeText={(text) =>
                                    handleChange("password_confirmation", text)
                                }
                            />
                            {seeConfirmPassword ? (
                                <PasswordIcon2
                                    onPress={handleSeeConfirmPassword}
                                />
                            ) : (
                                <PasswordIcon
                                    onPress={handleSeeConfirmPassword}
                                />
                            )}
                        </View>
                    </View>
                    {formError?.confirmPassword || formError?.newpassword ? (
                        <Text style={resetPasswordStyle.errMeaagae}>
                            {formError.confirmPassword ||
                                formError?.newpassword}
                        </Text>
                    ) : (
                        <View></View>
                    )}
                    <TouchableOpacity onPress={handleResetPassword}>
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
                                    Reset Password
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("login")}
                    >
                        <Text style={resetPasswordStyle.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ResetPassword;
