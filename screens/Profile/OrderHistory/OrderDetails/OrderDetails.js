import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomSpinner from "../../../Utilities/CustomSpinner/CustomSpinner";
import BackNavigation from "../../../Utilities/CustomHeader/BackNavigation";
import { ProfileStyles } from "../../ProfileStyle";
import { OrderDetailsStyle } from "./OrderDetailsStyle";
import DotIcon from "../../../../assets/svgs/order details/dot.svg";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";
import CustomStepIndicator from "../../../Utilities/CustomStepIndicator/CustomStepIndicator";
import config from "../../../../config";
import useAuth from "../../../../hooks/useAuth";
import { getOrderDetails } from "../../../../redux/slices/user/orderDetails/orderDetails";
import {
    dynamicStatusBG,
    dynamicStatusDot,
    dynamicStatusText,
} from "../../MyRefund/RefundList/RefundDetails/refundDetailsStyle";
import { thousandValueToNumber } from "../../../TrackOrder/TrackOrder";
import OrderDetailsSkeleton from "../../../../src/skeletons/screens/profile/order/OrderDetails/OrderDetailsSkeleton";
import { TouchableOpacity } from "react-native";

const OrderDetails = (props) => {
    const { itemId } = props.route.params;
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const { orderDetails, loading } = useSelector(
        (state) => state.getOrderDetailsSlice || {}
    );
    const {
        created_at = "",
        shipping,
        payment,
        discount_total,
        shipping_total,
        line_items,
        product_price,
        status_history = [],
        total,
        status,
    } = orderDetails || {};

    const dateArray = created_at?.split("-");
    const day = dateArray[0] || {};
    let month;
    let monthNum = parseInt(dateArray[1]);
    let monthName = [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    for (let i = 0; i < monthName.length - 1; i++) {
        if (monthNum == i + 1) {
            month = monthName[i];
        }
    }
    const year = dateArray[2];
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const URL = `${config.BASE_API_URL}/user/orders/${itemId}`;
            dispatch(getOrderDetails({ access_token, URL }));
        }
        return () => {
            isMounted = false;
        };
    }, []);
    const [allStatus, setAllStatus] = useState([]);
    useEffect(() => {
        if (status_history?.length > 0) {
            let statusSting = [];
            for (let status of status_history) {
                statusSting.push(status?.status);
            }
            setAllStatus(statusSting);
        }
    }, [status_history]);

    const redirectToPayment = () => {
        props.navigation.navigate("payment webview", {
            message: "Payment",
            url: orderDetails.payment_link,
        });
    };

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={OrderDetailsStyle.container}>
                {loading ? (
                    <OrderDetailsSkeleton />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={OrderDetailsStyle.idNum}>
                                ID Number
                            </Text>
                            <Text style={OrderDetailsStyle.invoiceId}>
                                #{payment?.code}
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
                        <CustomStepIndicator
                            direction={"horizontal"}
                            height={customPixel.h56}
                            data={allStatus}
                        />
                        <View style={OrderDetailsStyle.infoCont}>
                            <View style={OrderDetailsStyle.deliveryCont}>
                                <View style={OrderDetailsStyle.deliverySubCont}>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText1}
                                    >
                                        Shipping Method
                                    </Text>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText2}
                                    >
                                        Home Delivery
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        OrderDetailsStyle.deliverySubCont,
                                        {
                                            borderLeftWidth: 1,
                                            borderColor: "#B1B1B1",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={OrderDetailsStyle.deliveryText1}
                                    >
                                        Payment Status
                                    </Text>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText2}
                                    >
                                        {payment?.status}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    OrderDetailsStyle.deliveryCont,
                                    { marginTop: customPixel.h15 },
                                ]}
                            >
                                <View style={OrderDetailsStyle.deliverySubCont}>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText1}
                                    >
                                        Order Date
                                    </Text>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText2}
                                    >
                                        {`${day} ${month}, ${year}`}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        OrderDetailsStyle.deliverySubCont,
                                        {
                                            borderLeftWidth: 1,
                                            borderColor: "#B1B1B1",
                                        },
                                    ]}
                                >
                                    <Text
                                        style={OrderDetailsStyle.deliveryText1}
                                    >
                                        Estimated Delivery
                                    </Text>
                                    <Text
                                        style={OrderDetailsStyle.deliveryText2}
                                    >
                                        5-7 days (all items)
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text style={OrderDetailsStyle.shoppingTitle}>
                                    Shipping Address
                                </Text>
                                <View
                                    style={OrderDetailsStyle.shoppingTextCont}
                                >
                                    <View
                                        style={
                                            OrderDetailsStyle.shoppingTextWidth
                                        }
                                    >
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            Street
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            City
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            Postcode
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            Country
                                        </Text>
                                    </View>
                                    <View
                                        style={
                                            OrderDetailsStyle.shoppingTextWidth
                                        }
                                    >
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            {shipping?.address1}
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            {shipping?.city}
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            {shipping?.post_code}
                                        </Text>
                                        <Text
                                            style={
                                                OrderDetailsStyle.shoppingText
                                            }
                                        >
                                            {shipping?.country}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={OrderDetailsStyle.orderProductsCont}>
                                <Text
                                    style={OrderDetailsStyle.orderProductTitle}
                                >
                                    Ordered Products
                                </Text>
                                {line_items?.map((item, index) => (
                                    <View key={`key` + index}>
                                        <View
                                            style={{
                                                ...OrderDetailsStyle.singleProductCont,
                                                borderBottomColor:
                                                    index ===
                                                    line_items.length - 1
                                                        ? "transparent"
                                                        : "#DFDFDF",
                                            }}
                                        >
                                            <View>
                                                <Text
                                                    style={
                                                        OrderDetailsStyle.name
                                                    }
                                                >
                                                    {item?.name.slice(0, 20)} .
                                                    . .
                                                </Text>
                                                <View
                                                    style={
                                                        OrderDetailsStyle.items
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            OrderDetailsStyle.quantity
                                                        }
                                                    >
                                                        {item?.quantity} x Item
                                                    </Text>
                                                    <View
                                                        style={
                                                            OrderDetailsStyle.vrLine
                                                        }
                                                    />
                                                    <Text
                                                        style={
                                                            OrderDetailsStyle.quantity
                                                        }
                                                    >
                                                        Zoopie Australia
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text
                                                    style={
                                                        OrderDetailsStyle.name
                                                    }
                                                >
                                                    $
                                                    {thousandValueToNumber(
                                                        item?.subtotal,
                                                        item?.quantity
                                                    )}
                                                </Text>
                                                <Text
                                                    style={
                                                        OrderDetailsStyle.quantity
                                                    }
                                                >
                                                    {item?.is_delivered
                                                        ? "Delivered"
                                                        : "Pending"}
                                                </Text>
                                            </View>
                                        </View>
                                        {line_items.length !== index + 1 && (
                                            <View
                                                style={OrderDetailsStyle.hrLine}
                                            />
                                        )}
                                    </View>
                                ))}
                            </View>
                            <View style={{ marginBottom: 15 }}>
                                <View style={OrderDetailsStyle.subTotalCont}>
                                    <Text style={OrderDetailsStyle.subText}>
                                        Subtotal
                                    </Text>
                                    <Text style={OrderDetailsStyle.subText}>
                                        ${product_price}
                                    </Text>
                                </View>
                                <View style={OrderDetailsStyle.subTotalCont}>
                                    <Text style={OrderDetailsStyle.subText}>
                                        Shipping
                                    </Text>
                                    <Text style={OrderDetailsStyle.subText}>
                                        ${shipping_total}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        OrderDetailsStyle.subTotalCont,
                                        {
                                            borderBottomWidth: 0,
                                            paddingBottom: 0,
                                        },
                                    ]}
                                >
                                    <Text style={OrderDetailsStyle.subText}>
                                        Discount
                                    </Text>
                                    <Text style={OrderDetailsStyle.subText}>
                                        ${discount_total}
                                    </Text>
                                </View>
                                <View
                                    style={[
                                        OrderDetailsStyle.subTotalCont,
                                        OrderDetailsStyle.grandTotal,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            OrderDetailsStyle.subText,
                                            { color: "#FFFFFF" },
                                        ]}
                                    >
                                        Grand Total
                                    </Text>
                                    <Text
                                        style={[
                                            OrderDetailsStyle.subText,
                                            { color: "#FFFFFF" },
                                        ]}
                                    >
                                        ${total}
                                    </Text>
                                </View>

                                {orderDetails.payment_link && (
                                    <TouchableOpacity
                                        style={[
                                            OrderDetailsStyle.subTotalCont,
                                            OrderDetailsStyle.grandTotal,
                                        ]}
                                        onPress={redirectToPayment}
                                    >
                                        <Text
                                            style={[
                                                OrderDetailsStyle.subText,
                                                { color: "#FFFFFF" },
                                            ]}
                                        >
                                            Proceed to payment
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                )}
            </View>
        </>
    );
};

export default OrderDetails;
