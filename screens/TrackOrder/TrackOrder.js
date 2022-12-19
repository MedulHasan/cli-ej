import {
    View,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { ProfileStyles } from "../Profile/ProfileStyle";
import CommonStyles from "../Utilities/CommonStyles/CommonStyles";
import DotIcon from "../../assets/svgs/order details/dot.svg";
import { trackOrderStyle } from "./trackOrderStyle";
import RocketIcon from "../../assets/svgs/trackOrder/rocket.svg";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import {
    dynamicStatusForStepIndicatorBG,
    dynamicStatusForStepIndicatorDot,
    dynamicStatusForStepIndicatorText,
    refundDetailsStyle,
} from "../Profile/MyRefund/RefundList/RefundDetails/refundDetailsStyle";
import CustomStepIndicator from "../Utilities/CustomStepIndicator/CustomStepIndicator";

import BackNavigation from "../Utilities/CustomHeader/BackNavigation";
import { OrderDetailsStyle } from "../Profile/OrderHistory/OrderDetails/OrderDetailsStyle";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import moment from "moment";
import CustomerSupport from "../Utilities/CustomerSupport/CustomerSupport";
import { useSelector } from "react-redux";

const iconSize = customPixel.h90;

const TrackOrder = (props) => {
    const { allPreferences } =
        useSelector((state) => state.getPreferences) || {};
    const { myTrackOrders = {}, allStatus = [] } = props?.route?.params;

    const {
        order_key,
        line_items = [],
        status,
        status_history = [],
    } = myTrackOrders;
    const [stepStatus, setStepStatus] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(0);
    const { user = {} } = useAuth();

    useEffect(() => {
        let a;
        if (status_history?.length > 0) {
            let lastElement = status_history[status_history.length - 1];
            for (let status of allStatus) {
                if (lastElement?.status == status?.name) {
                    const object = allStatus.find(
                        (a) => a.name == lastElement?.status
                    );
                    a = allStatus.indexOf(object);
                }
            }
            setCurrentPosition(a);
        }
    }, [status_history]);

    useEffect(() => {
        let statusForAll = [],
            storeStatus = [],
            lastElement = status_history[status_history?.length - 1],
            possibleStatus = [...allStatus];
        for (let status of allStatus) {
            for (let orderStatus of status_history) {
                if (orderStatus?.status == status?.name) {
                    const object = allStatus.find(
                        (a) => a.name == orderStatus?.status
                    );
                    const lastObject = allStatus.find(
                        (a) => a.name == lastElement?.status
                    );

                    for (let status of allStatus) {
                        let statusObject = {
                            label: "",
                            date: "",
                            time: "",
                        };
                        if (
                            orderStatus?.status == status?.name &&
                            orderStatus?.product_id === null &&
                            allStatus.indexOf(object) <=
                                allStatus.indexOf(lastObject)
                        ) {
                            if (!storeStatus.includes(orderStatus.status)) {
                                let array0 =
                                    orderStatus?.created_at?.split(" ");
                                let label = orderStatus?.status,
                                    date = moment(
                                        orderStatus?.created_at,
                                        "DD/MM/YYYY"
                                    ).format("DD MMM, YYYY"),
                                    time = moment(
                                        array0[1] + array0[2],
                                        "hh:mm a"
                                    ).format("hh:mm a");
                                statusObject.label = label;
                                statusObject.time = time;
                                statusObject.date = date;
                                statusForAll.push(statusObject);
                                storeStatus.push(orderStatus.status);
                            }
                        }
                    }
                }
            }
        }
        let doneStatus = possibleStatus.splice(
            0,
            parseInt(currentPosition) + 1
        );
        for (let status of possibleStatus) {
            let statusObject = {
                label: "",
                date: "",
                time: "",
            };

            if (!storeStatus.includes(status.name)) {
                let label = status?.name;
                statusObject.label = label;

                statusForAll.push(statusObject);
            }
        }
        for (let status of doneStatus) {
            let statusObject = {
                label: "",
                date: "",
                time: "",
            };

            let array0 = lastElement?.created_at?.split(" ");
            let label = status?.name;
            statusObject.label = label;

            statusForAll.push(statusObject);
        }
        let sortResult = [];
        allStatus.forEach(function (key) {
            let found = false;
            statusForAll = statusForAll.filter(function (item) {
                if (!found && key.name == item.label) {
                    sortResult.push(item);
                    found = true;
                    return false;
                } else return true;
            });
        });
        setStepStatus(sortResult);
    }, [currentPosition]);

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />

            <View style={ProfileStyles.hrLine} />

            <ScrollView
                style={[
                    CommonStyles.globalContainer,
                    { marginBottom: customPixel.h100 },
                ]}
            >
                <View style={trackOrderStyle.headerCont}>
                    <View>
                        <Text
                            style={[
                                OrderDetailsStyle.idNum,
                                trackOrderStyle.idNum,
                            ]}
                        >
                            ID Number
                        </Text>
                        <Text
                            style={[
                                OrderDetailsStyle.invoiceId,
                                trackOrderStyle.idNum,
                            ]}
                        >
                            #{order_key}
                        </Text>
                        <View
                            style={[
                                OrderDetailsStyle.statusCont,
                                trackOrderStyle.statusCout,
                            ]}
                        >
                            <View
                                style={[
                                    OrderDetailsStyle.status,
                                    {
                                        backgroundColor:
                                            dynamicStatusForStepIndicatorBG(
                                                status
                                            ),
                                    },
                                ]}
                            >
                                <DotIcon
                                    fill={dynamicStatusForStepIndicatorDot(
                                        status
                                    )}
                                />
                                <Text
                                    style={[
                                        OrderDetailsStyle.statusText,
                                        {
                                            color: dynamicStatusForStepIndicatorText(
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
                    <View style={{ marginRight: customPixel.h20 }}>
                        <RocketIcon width={iconSize} height={iconSize} />
                    </View>
                </View>
                <View>
                    <Text
                        style={[
                            refundDetailsStyle.trackTitle,
                            { marginTop: 0 },
                        ]}
                    >
                        Order Status
                    </Text>
                </View>
                {!user && (
                    <View style={trackOrderStyle.moreDetailsContainer}>
                        <Text style={trackOrderStyle.moreDetailsText}>
                            For more details, please{" "}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate("login");
                            }}
                        >
                            <Text style={trackOrderStyle.login}>
                                login to your account.
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={refundDetailsStyle.trackRequest}>
                    {stepStatus?.length > 0 && (
                        <CustomStepIndicator
                            direction={"vertical"}
                            height={450}
                            data={stepStatus}
                            currentPosition={currentPosition}
                        />
                    )}
                </View>
                <Text style={trackOrderStyle.orderedProduct}>
                    Ordered Products
                </Text>

                <View style={OrderDetailsStyle.orderProductsCont}>
                    {line_items?.map((item, index) => (
                        <View key={`key` + index}>
                            <View
                                style={[
                                    OrderDetailsStyle.singleProductCont,
                                    {
                                        borderBottomWidth:
                                            index === line_items.length - 1
                                                ? 0
                                                : 1,
                                        paddingBottom:
                                            index === line_items.length - 1
                                                ? customPixel.h12
                                                : customPixel.h12,
                                        marginBottom:
                                            index === line_items.length - 1
                                                ? 0
                                                : customPixel.h0,
                                    },
                                ]}
                            >
                                <View>
                                    <Text style={OrderDetailsStyle.name}>
                                        {`${item?.name}`.length > 30
                                            ? `${item?.name}`.slice(0, 30) +
                                              ` . . .`
                                            : `${item?.name}`}
                                    </Text>
                                    <View style={OrderDetailsStyle.items}>
                                        <Text
                                            style={OrderDetailsStyle.quantity}
                                        >
                                            {item?.quantity} x Item
                                        </Text>
                                        <View
                                            style={OrderDetailsStyle.vrLine}
                                        />
                                        <Text
                                            style={OrderDetailsStyle.quantity}
                                        >
                                            {item?.category}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={OrderDetailsStyle.name}>
                                        ${item?.sub_total}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={{ marginBottom: customPixel.h20 }}>
                    <CustomerSupport
                        number={allPreferences?.company?.company_phone}
                    />
                </View>
            </ScrollView>
        </>
    );
};

export default TrackOrder;

export const thousandValueToNumber = (value, item) => {
    let amount = value?.replace(/,(?=\d{3})/g, "");
    let totalAmount = parseInt(amount) * parseInt(item);
    let thousandValue = totalAmount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return thousandValue;
};
