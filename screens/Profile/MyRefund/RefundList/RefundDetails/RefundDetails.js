import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
} from "react-native";
import React, { useRef } from "react";
import { ProfileStyles } from "../../../ProfileStyle";
import BackNavigation from "../../../../Utilities/CustomHeader/BackNavigation";
import { OrderDetailsStyle } from "../../../OrderHistory/OrderDetails/OrderDetailsStyle";
import DotIcon from "../../../../../assets/svgs/order details/dot.svg";
import { MyRefundStyle } from "../../MyRefundStyle";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../../../hooks/useAuth";
import config from "../../../../../config";
import { postRefundMessage } from "../../../../../redux/slices/user/myRefund/refundMessage/PostRefundMessage";

import {
    CustomToast,
    errorToase,
    successToase,
} from "../../../../Utilities/CustomToast/CustomToast";
import { useToast } from "native-base";
import RefundDetailsSkeleton from "../../../../../src/skeletons/screens/profile/refund/RefundDetailsSkeleton";
import {
    dynamicStatusBG,
    dynamicStatusDot,
    dynamicStatusText,
    refundDetailsStyle,
} from "./refundDetailsStyle";
import RenderMessage from "./RenderMessage";
import RenderImage from "./RenderImage";
import CustomSpinner from "../../../../Utilities/CustomSpinner/CustomSpinner";
import {
    getRefundDetails,
    getRefundMessage,
} from "../../../../../redux/slices/user/myRefund/refundMessage/getRefundDetails";
import ProgressiveImage from "../../../../../src/components/ProgressiveImage";
import { refundStyle } from "../../RefundRequest/RefundRequestStyle";
import CustomerSupport from "../../../../Utilities/CustomerSupport/CustomerSupport";

const RefundDetails = (props) => {
    LogBox.ignoreLogs([
        "Non-serializable values were found in the navigation state",
    ]);
    const {
        contact_number,
        timeZone,
        id,
        dropdownRef1,
        dropdownRef2,
        setDate,
        setStatus,
    } = props?.route?.params;

    const scrollViewRef = useRef();
    const dispatch = useDispatch();
    const toast = useToast();
    const { loading } = useSelector((state) => state.postRefundMessage);
    const { refundDetails, loading: isLoading } = useSelector(
        (state) => state.myRefundDetails
    );
    const [messageError, setMessageError] = useState(false);
    const [text, setText] = useState("");
    const { access_token } = useAuth();
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const URL = `${config.BASE_API_URL}/user/refunds/${id}`;
            dispatch(getRefundDetails({ access_token, URL }));
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch, id]);
    const { refund, chat } = refundDetails || {};
    const {
        reference,
        quantity_sent,
        reason,
        refund_image_urls,
        product_image_url,
        line_items,
        status,
    } = refund || {};
    const handleMessage = async (text) => {
        const urlPost = `${config.BASE_API_URL}/user/refunds/${id}/messages`;
        const UrlGet = `${config.BASE_API_URL}/user/refunds/${id}/messages`;
        if (text) {
            setMessageError(false);
            let formData = new FormData();
            formData.append("note", text);
            let data = {
                access_token,
                urlPost,
                method: "POST",
                formData,
            };
            let newAdd = await dispatch(postRefundMessage(data));
            let { code } = newAdd?.payload?.status;
            let { message } = newAdd?.payload?.records;
            if (code === 200) {
                setText("");
                setStatus("");
                setDate("");
                await dispatch(getRefundMessage({ access_token, URL: UrlGet }));
                dropdownRef1?.current?.reset();
                dropdownRef2?.current?.reset();
            } else {
                CustomToast(toast, message, errorToase);
            }
        } else {
            setMessageError(true);
        }
    };
    const handleReverse = (array) => {
        let reverseArray = [...array].reverse();
        return reverseArray;
    };
    return (
        <View>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />

            <View style={ProfileStyles.hrLine} />
            {isLoading ? (
                <RefundDetailsSkeleton />
            ) : (
                <ScrollView
                    keyboardShouldPersistTaps='always'
                    style={[
                        refundStyle.container,
                        { marginBottom: customPixel.h100 },
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={refundDetailsStyle.detailHeader}>
                        <View>
                            <Text
                                style={{
                                    ...OrderDetailsStyle.idNum,
                                    textAlign: "left",
                                }}
                            >
                                ID Number
                            </Text>
                            <Text style={OrderDetailsStyle.invoiceId}>
                                #{reference?.toUpperCase()}
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    ...OrderDetailsStyle.idNum,
                                    textAlign: "right",
                                    marginBottom: customPixel.h2,
                                }}
                            >
                                Status
                            </Text>
                            <View style={OrderDetailsStyle.statusCont}>
                                <View
                                    style={[
                                        OrderDetailsStyle.status,
                                        {
                                            backgroundColor:
                                                dynamicStatusBG(status),
                                        },
                                    ]}
                                >
                                    <DotIcon fill={dynamicStatusDot(status)} />
                                    <Text
                                        style={[
                                            OrderDetailsStyle.statusText,
                                            {
                                                color: dynamicStatusText(
                                                    status
                                                ),
                                            },
                                        ]}
                                    >
                                        {status}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[
                            MyRefundStyle.lastRefund,
                            { alignItems: "center" },
                        ]}
                    >
                        <View>
                            <Text style={MyRefundStyle.title}>
                                Product Details
                            </Text>
                            <Text style={MyRefundStyle.text1}>
                                {line_items?.category}
                            </Text>
                            <Text style={MyRefundStyle.text2}>
                                {`${line_items?.name}`.length > 25
                                    ? `${line_items?.name}`.slice(0, 25) +
                                      ` . . .`
                                    : `${line_items?.name}`}
                            </Text>
                            <Text style={MyRefundStyle.attribute}>
                                Qty: {quantity_sent}
                            </Text>
                        </View>
                        <View>
                            <View style={refundDetailsStyle.imgCont}>
                                <ProgressiveImage
                                    source={{ uri: product_image_url }}
                                    style={refundDetailsStyle.img}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={refundDetailsStyle.reason}>
                        <Text style={refundDetailsStyle.reasonText}>
                            Refund Reason:
                        </Text>
                        <Text style={refundDetailsStyle.reasonText}>
                            {reason}
                        </Text>
                    </View>
                    {refund_image_urls?.length > 0 && (
                        <View>
                            <Text
                                style={[
                                    refundDetailsStyle.reasonText,
                                    { marginTop: customPixel.h15 },
                                ]}
                            >
                                Uploaded Pictures:
                            </Text>
                            <View style={refundDetailsStyle.uploadCont}>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    horizontal={true}
                                >
                                    {refund_image_urls?.map((item, index) => (
                                        <RenderImage item={item} key={index} />
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    )}
                    {chat?.data?.length > 0 && (
                        <View>
                            <Text
                                style={{
                                    ...refundDetailsStyle.writeMessageText,
                                    marginTop: customPixel.h30,
                                }}
                            >
                                Your Messages
                            </Text>
                            <View style={refundDetailsStyle.showMessage}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                    ref={scrollViewRef}
                                    onContentSizeChange={() =>
                                        scrollViewRef.current.scrollToEnd({
                                            animated: true,
                                        })
                                    }
                                >
                                    {handleReverse(chat?.data).map(
                                        (item, index) => (
                                            <RenderMessage
                                                item={item}
                                                key={index}
                                                timeZone={timeZone}
                                            />
                                        )
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    )}

                    {!(status === "Declined" || status === "Accepted") && (
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : ""}
                            style={{ flex: 1 }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={refundDetailsStyle.writeMessageText}
                                >
                                    Write A Message
                                </Text>
                                <TextInput
                                    style={{
                                        ...refundDetailsStyle.textArea,
                                        borderColor: messageError
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    }}
                                    multiline={true}
                                    numberOfLines={4}
                                    value={text}
                                    onChangeText={(e) => setText(e)}
                                    placeholder='Enter your message here'
                                />
                                <TouchableOpacity
                                    style={refundDetailsStyle.sendMessage}
                                    disabled={loading ? true : false}
                                    onPress={() => handleMessage(text)}
                                >
                                    {loading ? (
                                        <CustomSpinner
                                            filePath={require("../../../../../assets/lottie/loader2.json")}
                                            size={{
                                                width: customPixel.h60,
                                                height: customPixel.h50,
                                            }}
                                        />
                                    ) : (
                                        <Text
                                            style={
                                                refundDetailsStyle.sendMessageText
                                            }
                                        >
                                            Send Message
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    )}
                    <View style={{ marginBottom: 20 }}>
                        <CustomerSupport number={contact_number} />
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

export default RefundDetails;
