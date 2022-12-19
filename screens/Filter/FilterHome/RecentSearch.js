import {
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import DeleteIcon from "../../../assets/svgs/my wishlist/delete icon.svg";
import ClockIcon from "../../../assets/svgs/filter/clock.svg";
import { filterHomeStyle } from "./FilterHomeStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import FeatureCategories from "../../Home/FeatureCategories/FeatureCategories";
import RelatedItem from "../../Home/FeaturedProducts/ProductDetails/RelatedItem/RelatedItem";
import { categoriesStyle } from "../../Home/FeatureCategories/featureCategoriesStyle";
import config from "../../../config";
import { getUserInfo } from "../../../redux/slices/user/util/fetchUserInfo";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import RecentSearchSkeleton from "../../../src/skeletons/screens/Search/RecentSearchSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { getpopularProducts } from "../../../redux/slices/popularProducts/popularProducts";
import { getbestSellers } from "../../../redux/slices/bestSellers/bestSellers";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import { ProductsStyle } from "../../Home/FeaturedProducts/featureProductsStyle";
import { useMemo } from "react";

const seller = [
    {
        CompanyLogo: require("../../../assets/images/companyLogo/addidas.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/garnier.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/jbl.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/pepsi.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/samsung.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/uvilever.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/uvilever.png"),
    },
    {
        CompanyLogo: require("../../../assets/images/companyLogo/uvilever.png"),
    },
];

const URL = `${config.BASE_API_URL}/user/recent-search`;

const deleteIconSize = customPixel.h15;
const clockIconSize = customPixel.h12;

const size = {
    contHeight: customPixel.h130,
    contWidth: customPixel.h130,
    imgHeight: customPixel.h45,
    imgWidth: customPixel.h50,
};

const RecentSearch = ({ setSearchContent, handleSearch }) => {
    const [recentData, setRecentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { access_token } = useAuth();

    useEffect(async () => {
        const data = await getUserInfo(access_token, URL);
        setRecentData(data);
        setLoading(false);
    }, []);

    const handleRecentSearch = (text) => {
        handleSearch(text);
    };

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <>
                    {access_token && (
                        <View>
                            <View style={filterHomeStyle.headerCont}>
                                <Text style={filterHomeStyle.header}>
                                    Recent Search
                                </Text>
                                <DeleteIcon
                                    height={deleteIconSize}
                                    width={deleteIconSize}
                                    fill={"#898989"}
                                />
                            </View>
                            {loading ? (
                                <RecentSearchSkeleton />
                            ) : (
                                <View
                                    style={{
                                        marginTop: customPixel.h10,
                                    }}
                                >
                                    {recentData?.length > 0 ? (
                                        recentData
                                            .slice(-5)
                                            .reverse()
                                            .map((item, i) => (
                                                <View
                                                    key={`key-${i}`}
                                                    style={
                                                        filterHomeStyle.historyCont
                                                    }
                                                >
                                                    <ClockIcon
                                                        height={clockIconSize}
                                                        width={clockIconSize}
                                                    />
                                                    <Text
                                                        style={
                                                            filterHomeStyle.historyText
                                                        }
                                                        onPress={() =>
                                                            handleRecentSearch(
                                                                item?.name
                                                            )
                                                        }
                                                    >
                                                        {item?.name}
                                                    </Text>
                                                </View>
                                            ))
                                    ) : (
                                        <View>
                                            <Text>
                                                You haven't search anything yet.
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    )}
                </>
            )}
        />
    );
};

export default RecentSearch;
