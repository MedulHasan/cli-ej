import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import React, { useRef, useState } from "react";
import { forgetPasswordStyle } from "../ForgetPassword/ForgetPasswordStyle";
import BackNavigation from "../../../screens/Utilities/CustomHeader/BackNavigation";
import BrokenEmailLogo from "../../../assets/svgs/confirmEmail/confirm-email.svg";
import { confirmEmailStyles } from "./ConfirmEmailStyle";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { fetchResetPassOtp } from "../ForgetPassword/ForgetPassword";
import useAuth from "../../../hooks/useAuth";

const ConfirmEmail = (props) => {
    const { signUpUsingEmailAndPassword } = useAuth();
    const { navigation, route } = props;
    const { email, nextScreen, title, url } = route?.params;

    const pref = email.substring(0, 3);
    const postf = email.split("@")[1];
    const otp1Ref = useRef(null);
    const otp2Ref = useRef(null);
    const otp3Ref = useRef(null);
    const otp4Ref = useRef(null);

    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");

    const [showLoader, setShowLoader] = useState(false);
    const [invalidOtp, setInvalidOtp] = useState("");

    /* useEffect(() => {
        otp1Ref.current.focus();
    }, []); */

    const handleResendCode = async () => {
        if (nextScreen === "Reset Password") {
            fetchResetPassOtp(email);
        } else {
            // const d = await signUpUsingEmailAndPassword(data);
            // console.log(d);
        }
    };

    return (
        <View style={forgetPasswordStyle.header}>
            {showLoader && (
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
            <View style={{ zIndex: -1 }}>
                <BackNavigation
                    navigationProps={navigation}
                    routeName={""}
                    capitalize={false}
                />
            </View>
            <View style={confirmEmailStyles.container}>
                <BrokenEmailLogo style={confirmEmailStyles.brokenEmail} />
                <Text style={confirmEmailStyles.checkEmail}>
                    {title || "Check Your Mail"}
                </Text>
                <Text style={confirmEmailStyles.text}>
                    A 4 digit code has been sent to {`${pref}.....@${postf}`}.
                    Use the code here.
                </Text>
                <View style={confirmEmailStyles.otpContainer}>
                    <View style={confirmEmailStyles.otpgap}>
                        <TextInput
                            keyboardType='number-pad'
                            returnKeyType='done'
                            ref={otp1Ref}
                            style={confirmEmailStyles.textInputField}
                            maxLength={1}
                            value={otp1}
                            onChangeText={(otp1) => {
                                setOtp1(otp1);
                                if (otp1 != "") {
                                    otp2Ref.current.focus();
                                }
                            }}
                        />
                    </View>
                    <View style={confirmEmailStyles.otpgap}>
                        <TextInput
                            keyboardType='number-pad'
                            returnKeyType='done'
                            ref={otp2Ref}
                            style={confirmEmailStyles.textInputField}
                            maxLength={1}
                            value={otp2}
                            onChangeText={(otp2) => {
                                setOtp2(otp2);
                                if (otp2 != "") {
                                    otp3Ref.current.focus();
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.nativeEvent.key === "Backspace") {
                                    setOtp1("");
                                    otp1Ref.current.focus();
                                }
                            }}
                        />
                    </View>
                    <View style={confirmEmailStyles.otpgap}>
                        <TextInput
                            ref={otp3Ref}
                            keyboardType='number-pad'
                            returnKeyType='done'
                            style={confirmEmailStyles.textInputField}
                            maxLength={1}
                            value={otp3}
                            onChangeText={(otp3) => {
                                setOtp3(otp3);
                                if (otp3 != "") {
                                    otp4Ref.current.focus();
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.nativeEvent.key === "Backspace") {
                                    setOtp2("");
                                    otp2Ref.current.focus();
                                }
                            }}
                        />
                    </View>
                    <View style={confirmEmailStyles.otpgap}>
                        <TextInput
                            ref={otp4Ref}
                            keyboardType='number-pad'
                            returnKeyType='done'
                            style={confirmEmailStyles.textInputField}
                            maxLength={1}
                            value={otp4}
                            onChangeText={async (otp4) => {
                                setOtp4(otp4);
                                if (otp1 && otp2 && otp3 && otp4) {
                                    setInvalidOtp("");
                                    const otp = otp1 + otp2 + otp3 + otp4;
                                    setShowLoader(true);
                                    let data = await fetchOtp(url, otp);
                                    setShowLoader(false);
                                    const { code } = data?.response?.status;
                                    if (code === 200 || code === 201) {
                                        navigation.navigate(nextScreen, {
                                            token: otp,
                                        });
                                    } else {
                                        setInvalidOtp(
                                            data?.response?.records?.otp
                                        );
                                    }

                                    setOtp1("");
                                    setOtp2("");
                                    setOtp3("");
                                    setOtp4("");
                                    otp1Ref.current.focus();
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.nativeEvent.key === "Backspace") {
                                    if (otp4 === "") {
                                        setOtp3("");
                                        otp3Ref.current.focus();
                                    } else {
                                        setOtp4("");
                                        otp4Ref.current.focus();
                                    }
                                }
                            }}
                        />
                    </View>
                </View>
                {invalidOtp ? (
                    <Text style={confirmEmailStyles.errorText}>
                        Invalid OTP
                    </Text>
                ) : (
                    <Text></Text>
                )}
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={confirmEmailStyles.resendCode}>
                        Resend Code
                    </Text>
                </TouchableOpacity>
                <View style={confirmEmailStyles.anotherEmailContainer}>
                    <Text style={confirmEmailStyles.checkSpam}>
                        Did not receive any code? Check your spam filter, or{" "}
                        <Text style={confirmEmailStyles.tryAnother}>
                            try another email address
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ConfirmEmail;

const fetchOtp = async (url, otp) => {
    return fetch(`${url}/${otp}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
};
