import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import CustomSelectDropdown from "../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { orderHistoryStyle } from "../OrderHistory/OrderHistoryStyle";
import { ProfileStyles } from "../ProfileStyle";
import { myReviresStyle } from "./MyReviewsStyle";
import DotIcon from "../../../assets/svgs/order history/dot.svg";
import DownIcon from "../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../assets/svgs/dropdown/up.svg";
import EditIcon from "../../../assets/svgs/profile/edit profile.svg";
import { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import useAuth from "../../../hooks/useAuth";
import {
    fetchReviewStart,
    getMyReviews,
    getMyReviewsSuccree,
} from "../../../redux/slices/user/myReviews/getMyReviews";
import { refresh } from "../../../redux/slices/user/util/refresh";
import config from "../../../config";
import { getUserInfo } from "../../../redux/slices/user/util/fetchUserInfo";
import OrderHistorySkeleton from "../../../src/skeletons/screens/profile/order/OrderHistorySkeleton";
import EmptyContent from "../../Utilities/EmptyContent/EmptyContent";
import NoContentIcon from "../../../assets/svgs/empty content/noAddress";
import CustomSelectKeyValue from "../../Utilities/CustomSelectDropdown/CustomSelectKeyValue";
import { useRef } from "react";
import ProgressiveImage from "../../../src/components/ProgressiveImage";

const dotSize = customPixel.h6;
const pageFilter = [
    { label: "All Time", value: "all_time" },
    { label: "Today", value: "today" },
    { label: "Last 7 days", value: "last_week" },
    { label: "Last 30 Days", value: "last_month" },
    { label: "Last 12 Month", value: "last_year" },
];
const statusArray = [
    { label: "All", value: "" },
    { label: "Approve", value: "active" },
    { label: "Unapprove", value: "inactive" },
];
const URL = `${config.BASE_API_URL}/user/reviews`;

const MyReviews = (props) => {
    const dropdownRef1 = useRef({});
    const dropdownRef2 = useRef({});

    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const { myReviews, loading, isRefresh } = useSelector(
        (state) => state.getMyReviewsSlice
    );
    const [showDetails, setShowDetails] = useState({
        id: null,
        show: false,
    });

    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (date && status) {
            dispatch(
                getMyReviews({
                    access_token,
                    URL: `${URL}?filter=${date}&status=${status}`,
                })
            );
        } else if (date && !status) {
            dispatch(
                getMyReviews({ access_token, URL: `${URL}?filter=${date}` })
            );
        } else if (!date && status) {
            dispatch(
                getMyReviews({
                    access_token,
                    URL: `${URL}?status=${status}`,
                })
            );
        } else {
            dispatch(getMyReviews({ access_token, URL }));
        }
    }, [date, status]);

    const handleShowDetails = (id) => {
        setShowDetails({
            id: id,
            show: false,
        });
    };
    const handleHideDetails = (id) => {
        setShowDetails({
            id: id,
            show: true,
        });
    };

    const onRefresh = () => {
        refresh(
            access_token,
            `${URL}?filter=${date}&status=${status}`,
            dispatch,
            fetchReviewStart,
            getUserInfo,
            getMyReviewsSuccree
        );
    };

    const RenderItem = ({ item }) => {
        let month, year, day;
        const dateArray = item?.created_at?.split("-");
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
            for (let i = 0; i < monthName.length; i++) {
                if (monthNum == i + 1) {
                    month = monthName[i];
                }
            }
            year = dateArray[2];
        }

        return (
            <View style={orderHistoryStyle.item}>
                <View style={orderHistoryStyle.header}>
                    <Text style={orderHistoryStyle.headerText}>
                        {item?.product_name?.length > 50
                            ? `${item?.product_name?.slice(0, 50)}...`
                            : item?.product_name}
                    </Text>
                    <Rating
                        type='custom'
                        ratingColor='#FCCA19'
                        tintColor='#fff'
                        ratingBackgroundColor='#C8C8C8'
                        startingValue={item.rating}
                        imageSize={customPixel.h15}
                        readonly={true}
                        style={{ width: "20%" }}
                    />
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
                                {item.rating} Stars
                            </Text>
                        </View>
                        <View style={orderHistoryStyle.infoTextCont}>
                            <DotIcon
                                height={dotSize}
                                width={dotSize}
                                fill={"#C4C4C4"}
                            />
                            <Text style={orderHistoryStyle.infoText}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                    <View>
                        {showDetails.id === item.id && showDetails.show ? (
                            <TouchableOpacity
                                onPress={() => handleShowDetails(item.id)}
                                style={myReviresStyle.dropDown}
                            >
                                <UpIcon />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => handleHideDetails(item.id)}
                                style={myReviresStyle.dropDown}
                            >
                                <DownIcon />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View>
                    {showDetails.id === item.id && showDetails.show && (
                        <View>
                            <Text style={myReviresStyle.detailsTitle}>
                                Review you wrote
                            </Text>
                            <Text style={myReviresStyle.detailsText}>
                                {item.comments}
                            </Text>
                            <View style={myReviresStyle.detailsImgCont}>
                                <View style={myReviresStyle.detailsImg}>
                                    {item?.image
                                        ?.slice(0, 4)
                                        .map((img, index) => (
                                            <ProgressiveImage
                                                key={index}
                                                source={{ uri: img }}
                                                style={
                                                    myReviresStyle.detailsSingleImg
                                                }
                                            />
                                        ))}
                                    {item?.image.length > 4 && (
                                        <TouchableOpacity
                                            style={myReviresStyle.layerImg}
                                            onPress={() =>
                                                props.navigation.navigate(
                                                    "Edit Review",
                                                    {
                                                        dropdownRef1:
                                                            dropdownRef1,
                                                        dropdownRef2:
                                                            dropdownRef2,
                                                        setDate: setDate,
                                                        setStatus: setStatus,
                                                        item: item,
                                                    }
                                                )
                                            }
                                        >
                                            <View>
                                                <Text
                                                    style={
                                                        myReviresStyle.layerImgText
                                                    }
                                                >
                                                    +{item?.image.length - 4}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate(
                                            "Edit Review",
                                            {
                                                dropdownRef1: dropdownRef1,
                                                dropdownRef2: dropdownRef2,
                                                setDate: setDate,
                                                setStatus: setStatus,
                                                item: item,
                                            }
                                        )
                                    }
                                >
                                    <View style={myReviresStyle.editReviewCont}>
                                        <EditIcon
                                            height={customPixel.h12}
                                            width={customPixel.h12}
                                        />
                                        <Text style={myReviresStyle.editText}>
                                            Edit Review
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={myReviresStyle.container}>
                <View style={orderHistoryStyle.filterCont}>
                    <Text style={orderHistoryStyle.filterText}>Filter By</Text>
                    <CustomSelectKeyValue
                        filterArray={pageFilter}
                        setValue={setDate}
                        dropdownRef={dropdownRef1}
                    />
                    <CustomSelectKeyValue
                        filterArray={statusArray}
                        setValue={setStatus}
                        dropdownRef={dropdownRef2}
                    />
                </View>
                {loading ? (
                    <OrderHistorySkeleton />
                ) : (
                    <View>
                        {myReviews?.length > 0 ? (
                            <FlatList
                                scrollEnabled={true}
                                keyExtractor={(_, i) => "key-A" + i}
                                data={myReviews}
                                renderItem={RenderItem}
                                refreshing={isRefresh}
                                onRefresh={onRefresh}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <FlatList
                                style={{ marginTop: customPixel.h20 }}
                                keyExtractor={(_, i) => "key-A" + i}
                                refreshing={isRefresh}
                                onRefresh={onRefresh}
                                showsVerticalScrollIndicator={false}
                                ListHeaderComponent={() => (
                                    <EmptyContent
                                        Icon={NoContentIcon}
                                        text={"No Reviews Given"}
                                    />
                                )}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default MyReviews;
