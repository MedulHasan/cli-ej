import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { ProfileStyles } from "../ProfileStyle";
import { orderHistoryStyle } from "./OrderHistoryStyle";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import config from "../../../config";
import DotIcon from "../../../assets/svgs/order history/dot.svg";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import CustomSelectDropdown from "../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import {
    fetchOrderStart,
    getMyOrders,
    getOrderSuccrss,
} from "../../../redux/slices/user/orderHistory/getOrderHistory";
import { refresh } from "../../../redux/slices/user/util/refresh";
import { getUserInfo } from "../../../redux/slices/user/util/fetchUserInfo";
import OrderHistorySkeleton from "../../../src/skeletons/screens/profile/order/OrderHistorySkeleton";
import EmptyContent from "../../Utilities/EmptyContent/EmptyContent";
import NoContentIcon from "../../../assets/svgs/empty content/noAddress.svg";
import { useRef } from "react";
import CustomSelectKeyValue from "../../Utilities/CustomSelectDropdown/CustomSelectKeyValue";
import { useState } from "react";

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

const OrderHistory = (props) => {
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const URL = `${config.BASE_API_URL}/user/orders`;
    const dropdownRef1 = useRef({});
    const dropdownRef2 = useRef({});
    const [status, setStatus] = useState("");
    const [date, setDate] = useState("");
    const { myOrders, loading, isRefresh } = useSelector(
        (state) => state.getMyOrdersSlice
    );

    useEffect(() => {
        let isMounted = true;
        if (isMounted && myOrders.length === 0) {
            dispatch(getMyOrders({ access_token, URL }));
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const onRefresh = () => {
        refresh(
            access_token,
            URL,
            dispatch,
            fetchOrderStart,
            getUserInfo,
            getOrderSuccrss
        );
    };
    useEffect(() => {
        if (date && status) {
            const URL = `${config.BASE_API_URL}/user/orders?status=${status}&filter=${date}`;

            dispatch(getMyOrders({ access_token, URL }));
        } else if (date && !status) {
            const URL = `${config.BASE_API_URL}/user/orders?filter=${date}`;
            dispatch(getMyOrders({ access_token, URL }));
        } else if (!date && status) {
            const URL = `${config.BASE_API_URL}/user/orders?status=${status}`;
            dispatch(getMyOrders({ access_token, URL }));
        } else {
            const URL = `${config.BASE_API_URL}/user/orders`;
            dispatch(getMyOrders({ access_token, URL }));
        }
    }, [status, date]);
    const RenderItem = ({ item, index }) => {
        // const { created_at, invoice_id, item_price, status } = item || {};
        const { created_at, number, total, status } = item || {};
        const dateArray = created_at?.split("-");
        let day, month, year;
        if (dateArray?.length > 0) {
            day = dateArray[0];
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
            year = dateArray[2];
        }

        const handleOrderDetails = () => {
            props.navigation.navigate("order details", {
                itemId: item.id,
            });
        };

        return (
            <TouchableOpacity
                onPress={() => handleOrderDetails()}
                style={[
                    orderHistoryStyle.item,
                    {
                        marginBottom:
                            myOrders.length - 1 === index ? customPixel.h20 : 0,
                    },
                ]}
            >
                <View style={orderHistoryStyle.header}>
                    <Text style={orderHistoryStyle.headerText}>
                        #{item.order_key}
                    </Text>
                    <Text style={orderHistoryStyle.headerText}>${total}</Text>
                </View>
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
                            {item.payment_status}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    let content = null;
    if (loading) {
        content = <OrderHistorySkeleton />;
    }
    if (!loading && myOrders.length === 0) {
        content = (
            <FlatList
                style={{ marginTop: customPixel.h20 }}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <EmptyContent
                        Icon={NoContentIcon}
                        text={"No Order Available"}
                    />
                )}
            />
        );
    }
    if (!loading && myOrders.length > 0) {
        content = (
            <>
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
                <FlatList
                    data={myOrders}
                    renderItem={RenderItem}
                    refreshing={isRefresh}
                    onRefresh={onRefresh}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, i) => "key" + i}
                />
            </>
        );
    }
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={orderHistoryStyle.itemsContainer}>{content}</View>
        </>
    );
};

export default OrderHistory;
