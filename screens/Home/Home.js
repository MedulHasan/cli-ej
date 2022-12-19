import {
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import React from "react";
import FeatureCategories from "./FeatureCategories/FeatureCategories";
import { homeStyle } from "./homeStyle";
import HomeBanner from "./HomeBanner/HomeBanner";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import MenuNavigation from "../Utilities/CustomHeader/MenuNavigation";
import SearchIcon from "../../assets/svgs/searchIcon.svg";
import Feature from "./Feature/Feature";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import { allCategoriesStyle } from "../Categories/categoriesStyle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPreferences } from "../../redux/slices/util/getPreferences";

const { height } = Dimensions.get("screen");

const size = {
    contHeight: customPixel.h130,
    contWidth: customPixel.h130,
    imgHeight: customPixel.h45,
    imgWidth: customPixel.h50,
};

const Home = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getPreferences());
        }
        return () => {
            isMounted = false;
        };
    }, []);
    return (
        <View style={allCategoriesStyle.superCont}>
            <View>
                <MenuNavigation
                    navigationProps={props.navigation}
                    routeName={""}
                />
                <SearchContainer props={props} />
            </View>
            <View style={homeStyle.body}>
                <FlatList
                    listKey={() => `listKey-AA${Math.random(100)}`}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={() => (
                        <>
                            <HomeBanner />
                            <Feature />
                            <FeatureCategories
                                headerText={"Featured Categories"}
                                size={size}
                            />
                            <FeaturedProducts />
                        </>
                    )}
                />
            </View>
        </View>
    );
};

export default Home;

const SearchContainer = ({ props }) => {
    return (
        <View style={homeStyle.searchContainer}>
            <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("filter home")}
            >
                <Text
                    style={[
                        homeStyle.searchTextField,
                        {
                            color:
                                Platform.OS === "android"
                                    ? "#9E9E9E"
                                    : "#C4C4C4",
                            fontSize:
                                height < 684
                                    ? customPixel.h20
                                    : customPixel.h16,
                            marginBottom: height < 684 ? -1 : 0,
                        },
                    ]}
                >
                    Search
                </Text>
            </TouchableWithoutFeedback>
            <SearchIcon width={customPixel.h16} height={customPixel.h16} />
        </View>
    );
};
