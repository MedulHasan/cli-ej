import { View, TouchableOpacity, TextInput, LogBox } from "react-native";
import React, { useState } from "react";
import BackIcon from "../../../assets/svgs/backButton.svg";
import CommonStyles from "../../Utilities/CommonStyles/CommonStyles";
import { homeStyle } from "../../Home/homeStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import SearchIcon from "../../../assets/svgs/searchIcon.svg";
import SearchFilter1 from "../SearchFilter1/SearchFilter1";
import RecentSearch from "./RecentSearch";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
const URL = `${config.BASE_API_URL}/user/products?keyword=`;
import { getsearchProducts } from "../../../redux/slices/searchProducts/searchProducts";
import { useCallback } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import PopularProducts from "./PopularProducts";
import BestSellers from "./BestSellers";
const FilterHome = (props) => {
    const url = props?.route?.params?.url;
    const visitFromFilter = props.route?.params?.visitFromFilter;
    const [update, forceUpdate] = useReducer((x) => x + 1, 0);
    const dispatch = useDispatch();
    const [searchContent, setSearchContent] = useState("");

    // const handleSearchInput = async (text) => {
    //     if (text.length > 0) {
    //         await dispatch(getsearchProducts(`${URL}${text}`));
    //     }
    // };

    // const debounce = (func) => {
    //     let timer;
    //     return function (...args) {
    //         const context = this;
    //         if (timer) clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             timer = null;
    //             func.apply(context, args);
    //         }, 2000);
    //     };
    // };

    // const optimizedFn = useCallback(debounce(handleSearchInput), []);

    const handleSearch = async (text) => {
        forceUpdate();
        setSearchContent(text);
        if (text.length > 0) {
            await dispatch(getsearchProducts(`${URL}${text}`));
        }
    };

    return (
        <View>
            <View>
                <View style={CommonStyles.container}>
                    <TouchableOpacity
                        style={[
                            CommonStyles.customHeaderIcon,
                            {
                                height: customPixel.h30,
                                width: customPixel.h40,
                            },
                        ]}
                        onPress={() => props.navigation.goBack()}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                </View>
                <View style={homeStyle.searchContainer}>
                    <TextInput
                        placeholder='Search'
                        style={[homeStyle.searchTextField]}
                        autoFocus={true}
                        value={searchContent}
                        onChangeText={(text) => handleSearch(text)}
                    />
                    <SearchIcon
                        width={customPixel.h16}
                        height={customPixel.h16}
                    />
                </View>
            </View>
            <View style={homeStyle.body}>
                {searchContent.length === 0 ? (
                    <View>
                        <RecentSearch
                            setSearchContent={setSearchContent}
                            handleSearch={handleSearch}
                        />
                        <PopularProducts></PopularProducts>
                        <BestSellers></BestSellers>
                    </View>
                ) : (
                    <SearchFilter1
                        searchContent={searchContent}
                        url={url}
                        visitFromFilter={visitFromFilter}
                        update={update}
                    />
                )}
            </View>
        </View>
    );
};

export default FilterHome;
