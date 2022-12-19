import {
    View,
    Text,
    FlatList,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { allCategoriesStyle } from "./categoriesStyle";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SearchIcon from "../../assets/svgs/searchIcon.svg";
import { homeStyle } from "../Home/homeStyle";
import DownIcon from "../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../assets/svgs/dropdown/up.svg";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import CommonStyles from "../Utilities/CommonStyles/CommonStyles";
import MenuIcon from "../../assets/svgs/menuIcon.svg";
import {
    fetchCategoryStart,
    getAllCategory,
    getAllCategoryWithoutLoading,
} from "../../redux/slices/categorys/allCategory";
import config from "../../config";
import { fetchGetItem } from "../../redux/slices/util/fetchGetItem";
import { refresh } from "../../redux/slices/util/refresh";
import CategoriesSkeleton from "../../src/skeletons/screens/Categories/CategoriesSkeleton";
import ProgressiveImage from "../../src/components/ProgressiveImage";

const { width, height } = Dimensions.get("window");

const subCategory = [
    {
        id: 1,
        name: "Men Fashion",
    },
    {
        id: 2,
        name: "Women Fashion",
    },
    {
        id: 3,
        name: "Kids Clothes",
    },
    {
        id: 4,
        name: "Winter Offer",
    },
    {
        id: 5,
        name: "New Arrivals",
    },
];

const Categories = (props) => {
    const dispatch = useDispatch();
    const { allCategory, loading, isRefresh } = useSelector(
        (state) => state.allCategory
    );
    const [showSubCategory, setShowSubCategory] = useState({
        id: null,
        show: false,
    });
    const [openSearchBar, setOpenSearchBar] = useState(false);

    useEffect(async () => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getAllCategory());
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    const onRefresh = () => {
        const URL = `${config.BASE_API_URL}/user/categories/all`;
        refresh(
            URL,
            dispatch,
            fetchCategoryStart,
            fetchGetItem,
            getAllCategoryWithoutLoading
        );
    };

    const handleShowSubCategory = (id) => {
        setShowSubCategory({
            id: id,
            show: true,
        });
    };
    const handleHideSubCategory = (id) => {
        setShowSubCategory({
            id: id,
            show: false,
        });
    };

    const SubCategory = ({ item }) => {
        return (
            <View>
                <Text style={allCategoriesStyle.singleSubText}>
                    {item.name}
                </Text>
                <View style={allCategoriesStyle.singleSubLine} />
            </View>
        );
    };

    const RenderItem = ({ item }) => {
        return (
            <View
                style={{
                    paddingHorizontal: customPixel.h20,
                    paddingBottom: customPixel.h20,
                }}
            >
                <View style={allCategoriesStyle.item}>
                    <View style={allCategoriesStyle.imageContainer}>
                        <ProgressiveImage
                            source={{ uri: item.picture_url }}
                            style={allCategoriesStyle.image}
                        />
                    </View>
                    <View style={allCategoriesStyle.categoryView}>
                        <Text style={allCategoriesStyle.categoryName}>
                            {item.name}
                        </Text>
                        <View style={allCategoriesStyle.subCategoryContainer}>
                            <Text style={allCategoriesStyle.subCategories}>
                                Sub-Categories
                            </Text>
                            {showSubCategory.id === item.id &&
                            showSubCategory.show ? (
                                <TouchableOpacity
                                    onPress={() =>
                                        handleHideSubCategory(item.id)
                                    }
                                    style={allCategoriesStyle.dropdownIcon}
                                >
                                    <UpIcon />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() =>
                                        handleShowSubCategory(item.id)
                                    }
                                    style={allCategoriesStyle.dropdownIcon}
                                >
                                    <DownIcon />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
                {showSubCategory.id === item.id && showSubCategory.show && (
                    <View style={[allCategoriesStyle.item]}>
                        <View
                            style={[
                                allCategoriesStyle.imageContainer,
                                { borderWidth: 0 },
                            ]}
                        />
                        <View
                            style={[
                                allCategoriesStyle.categoryView,
                                {
                                    width: width,
                                },
                            ]}
                        >
                            <FlatList
                                data={subCategory}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <SubCategory item={item} />
                                )}
                            />
                        </View>
                    </View>
                )}
            </View>
        );
    };
    return (
        <View style={allCategoriesStyle.superCont}>
            <View>
                <View style={CommonStyles.container}>
                    {openSearchBar ? (
                        <View style={allCategoriesStyle.searchContainer}>
                            <TextInput
                                placeholder='Search Category'
                                style={[
                                    homeStyle.searchTextField,
                                    {
                                        width: customPixel.h270,
                                        paddingHorizontal: customPixel.h5,
                                    },
                                ]}
                            />
                        </View>
                    ) : (
                        <View style={CommonStyles.customHeaderContainer}>
                            <Text style={CommonStyles.headerName}>
                                {props.route.name?.toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={() => props.navigation.toggleDrawer()}
                        style={CommonStyles.customHeaderIcon}
                    >
                        <MenuIcon
                            width={width * 0.08}
                            height={customPixel.h22}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: "absolute",
                        right: customPixel.h20,
                        top: height < 534 ? customPixel.h20 : customPixel.h25,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setOpenSearchBar(!openSearchBar)}
                    >
                        <SearchIcon
                            width={customPixel.h18}
                            height={customPixel.h18}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {loading ? (
                <CategoriesSkeleton />
            ) : (
                <View style={allCategoriesStyle.container}>
                    <FlatList
                        data={allCategory}
                        renderItem={({ item }) => <RenderItem item={item} />}
                        keyExtractor={(_, i) => "key" + i}
                        refreshing={isRefresh}
                        onRefresh={onRefresh}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </View>
    );
};

export default Categories;
