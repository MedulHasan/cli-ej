import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React from "react";
import BackNavigation from "../../../Utilities/CustomHeader/BackNavigation";
import { ProfileStyles } from "../../ProfileStyle";
import { orderHistoryStyle } from "../../OrderHistory/OrderHistoryStyle";
import CustomSelectDropdown from "../../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import { useSelector } from "react-redux";
import { myReviresStyle } from "../../MyReviews/MyReviewsStyle";
import DotIcon from "../../../../assets/svgs/order history/dot.svg";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";
import { MyRefundStyle } from "../MyRefundStyle";
import { useState } from "react";
import { useEffect } from "react";

import useAuth from "../../../../hooks/useAuth";

import config from "../../../../config";
import { useDispatch } from "react-redux";
import {
    fetchFilterRefundStart,
    getFilterRefunds,
    getFilterRefundsSuccree,
} from "../../../../redux/slices/user/myRefund/filterRefund/filterRefunds";
import { refresh } from "../../../../redux/slices/user/util/refresh";
import { getUserInfo } from "../../../../redux/slices/user/util/fetchUserInfo";
import RefundListSkeleton from "../../../../src/skeletons/screens/profile/refund/RefundListSkeleton";
import { useRef } from "react";
import CustomSelectKeyValue from "../../../Utilities/CustomSelectDropdown/CustomSelectKeyValue";
import { refundStyle } from "../RefundRequest/RefundRequestStyle";
const dotSize = customPixel.h6;

const pageFilter = [
    { label: "All Time", value: "all_time" },
    { label: "Today", value: "today" },
    { label: "Last 7 days", value: "last_week" },
    { label: "Last 30 Days", value: "last_month" },
    { label: "Last 12 Month", value: "last_year" },
];
const statusArray = [
    { label: "All Status", value: "" },
    { label: "Opened", value: "opened" },
    { label: "In Progress", value: "in progress" },
    { label: "Declined", value: "declined" },
];

const RefundList = (props) => {
    const { myFilterRefunds, loading, isRefresh } = useSelector(
        (state) => state.getFilterRefunds
    );
    const { allPreferences } =
        useSelector((state) => state.getPreferences) || {};
    const dropdownRef1 = useRef({});
    const dropdownRef2 = useRef({});
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const { access_token } = useAuth();

    const RenderItem = ({ item = {} }) => {
        const dateArray = item?.created_at?.split("-") || [];
        const day = dateArray[0];
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
        return (
            <TouchableOpacity
                style={orderHistoryStyle.item}
                onPress={() =>
                    props.navigation.navigate("refund details", {
                        refundId: item?.id,
                        dropdownRef1,
                        dropdownRef2,
                        setDate,
                        setStatus,
                        timeZone: allPreferences?.preference?.default_timezone,
                        contact_number: allPreferences?.company?.company_phone,
                    })
                }
            >
                <View style={orderHistoryStyle.header}>
                    <Text
                        style={{
                            ...orderHistoryStyle.headerText,
                            textTransform: "uppercase",
                        }}
                    >
                        #{item?.reference}
                    </Text>
                    <View
                        style={[
                            refundListStyle.status,
                            {
                                backgroundColor: dynamicStatusBG(item.status),
                            },
                        ]}
                    >
                        <DotIcon
                            height={dotSize}
                            width={dotSize}
                            fill={dynamicStatusDot(item?.status)}
                        />
                        <Text
                            style={[
                                refundListStyle.statusText,
                                {
                                    color: dynamicStatusDot(item?.status),
                                },
                            ]}
                        >
                            {item?.status}
                        </Text>
                    </View>
                </View>
                <View style={myReviresStyle.detailsCont}>
                    <View style={orderHistoryStyle.info}>
                        <View style={orderHistoryStyle.infoTextCont}>
                            <DotIcon
                                height={dotSize}
                                width={dotSize}
                                fill={"#C4C4C4"}
                            />
                            <Text style={orderHistoryStyle.infoText}>
                                {`${day} ${month}, ${year}`}
                            </Text>
                        </View>
                        <View style={orderHistoryStyle.infoTextCont}>
                            <DotIcon
                                height={dotSize}
                                width={dotSize}
                                fill={"#C4C4C4"}
                            />
                            <Text style={orderHistoryStyle.infoText}>
                                {item?.status}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={refundListStyle.price}>
                            $ {item?.line_items?.price}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const getUrl = `${config.BASE_API_URL}/user/refunds`;
    useEffect(() => {
        if (date && status) {
            const URL = `${config.BASE_API_URL}/user/refunds?status=${status}&filter=${date}`;
            dispatch(getFilterRefunds({ access_token, URL }));
        } else if (date && !status) {
            const URL = `${config.BASE_API_URL}/user/refunds?filter=${date}`;
            dispatch(getFilterRefunds({ access_token, URL }));
        } else if (!date && status) {
            const URL = `${config.BASE_API_URL}/user/refunds?status=${status}`;
            dispatch(getFilterRefunds({ access_token, URL }));
        } else {
            const URL = `${config.BASE_API_URL}/user/refunds`;
            dispatch(getFilterRefunds({ access_token, URL }));
        }
    }, [status, date]);

    const onRefresh = () => {
        refresh(
            access_token,
            `${getUrl}?filter=${date}&status=${status}`,
            dispatch,
            fetchFilterRefundStart,
            getUserInfo,
            getFilterRefundsSuccree
        );
    };
    let content = null;
    if (loading) {
        content = <RefundListSkeleton />;
    }
    if (!loading && myFilterRefunds?.length === 0) {
        content = (
            <FlatList
                refreshing={isRefresh}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View
                        style={{
                            ...MyRefundStyle.noRefund,
                            marginTop: customPixel.h20,
                        }}
                    >
                        <Text
                            style={{
                                ...MyRefundStyle.noRefundText,
                                textAlignVertical: "center",
                                textAlign: "center",
                            }}
                        >
                            You Have No Refund Requests Yet
                        </Text>
                    </View>
                )}
            />
        );
    }
    if (!loading && myFilterRefunds?.length > 0) {
        content = (
            <FlatList
                data={myFilterRefunds}
                keyExtractor={(_, i) => "key-A" + i}
                listKey={(_, i) => `listKey-A${i}`}
                renderItem={RenderItem}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={true}
            />
        );
    }

    return (
        <View>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={refundStyle.container}>
                <View style={orderHistoryStyle.filterCont}>
                    <Text style={orderHistoryStyle.filterText}>Filter By</Text>
                    <CustomSelectKeyValue
                        setValue={setDate}
                        filterArray={pageFilter}
                        dropdownRef={dropdownRef1}
                    />
                    <CustomSelectKeyValue
                        setValue={setStatus}
                        filterArray={statusArray}
                        dropdownRef={dropdownRef2}
                    />
                </View>
                {content}
            </View>
        </View>
    );
};

export default RefundList;

const refundListStyle = StyleSheet.create({
    status: {
        paddingHorizontal: customPixel.h13,
        paddingVertical: customPixel.h4,
        borderRadius: 2,
        flexDirection: "row",
        alignItems: "center",
    },
    statusText: {
        marginLeft: customPixel.h5,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h10,
        color: "#898989",
    },
    price: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h13,
        color: "#2C2C2C",
    },
});

const dynamicStatusBG = (status) => {
    return status === "In progress"
        ? "#FEF8E7"
        : status === "Pending"
        ? "#F4F4F4"
        : status === "Accepted"
        ? "#EBF9F1"
        : status === "Declined"
        ? "#F9E8E8"
        : status === "Processing"
        ? "#FEF8E7"
        : "#F4F4F4";
};
const dynamicStatusDot = (status) => {
    return status === "In progress"
        ? "#DEA512"
        : status === "Pending"
        ? "#898989"
        : status === "Accepted"
        ? "#009651"
        : status === "Declined"
        ? "#C8191C"
        : status === "Processing"
        ? "#DEA512"
        : "#898989";
};
