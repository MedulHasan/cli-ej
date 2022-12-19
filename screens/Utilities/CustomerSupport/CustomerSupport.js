import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";
import { MyRefundStyle } from "../../Profile/MyRefund/MyRefundStyle";
import HeadphoneIcon from "../../../assets/svgs/refund/headphone.svg";
import RightArrowIcon from "../../../assets/svgs/refund/rightArrow.svg";
const CustomerSupport = ({ number }) => {
    const handleMakeCall = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== "android") {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (!supported) {
                    CustomToast(
                        toast,
                        "Phone number is not available",
                        errorToase
                    );
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <View style={MyRefundStyle.supportCont}>
            <View style={MyRefundStyle.headphoneCont}>
                <HeadphoneIcon
                    height={customPixel.h42}
                    width={customPixel.h42}
                />
            </View>
            <View style={MyRefundStyle.contactCont}>
                <View>
                    <Text style={MyRefundStyle.contactText}>
                        Customer Support
                    </Text>
                    <Text style={MyRefundStyle.contactNum}>{number}</Text>
                </View>
                <TouchableOpacity
                    style={MyRefundStyle.nextBtn}
                    onPress={() => handleMakeCall(number)}
                >
                    <RightArrowIcon
                        height={customPixel.h10}
                        width={customPixel.h15}
                        fill={"#2C2C2C"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomerSupport;
