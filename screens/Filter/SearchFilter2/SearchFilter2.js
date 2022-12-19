import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Rating } from "react-native-ratings";
import { ProductsStyle } from "../../Home/FeaturedProducts/featureProductsStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { searchFilter2Style } from "./searchFilter2Style";
import { useNavigation } from "@react-navigation/native";
import FeatureProductSkeleton from "../../../src/skeletons/screens/home/FeatureProductSkeleton";
import { allCategoriesStyle } from "../../Categories/categoriesStyle";
import ListViewSkeleton from "../../../src/skeletons/screens/Filter/ListViewSkeleton";
import FeatureCategories from "../../Home/FeatureCategories/FeatureCategories";
import RelatedItem from "../../Home/FeaturedProducts/ProductDetails/RelatedItem/RelatedItem";
import ProgressiveImage from "../../../src/components/ProgressiveImage";

const SearchFilter2 = ({ searchContent }) => {
    const navigation = useNavigation();

    const { searchProducts, loading } = useSelector(
        (state) => state.searchProducts
    );
    const size = {
        contHeight: customPixel.h130,
        contWidth: customPixel.h130,
        imgHeight: customPixel.h45,
        imgWidth: customPixel.h50,
    };
    const RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={searchFilter2Style.container}
                onPress={() =>
                    navigation.navigate("Product Details", {
                        slug: item?.slug,
                    })
                }
            >
                <View
                    style={[
                        ProductsStyle.imageContainer,
                        searchFilter2Style.imageCont,
                    ]}
                >
                    <ProgressiveImage
                        source={{ uri: item?.featured_image }}
                        style={[ProductsStyle.img, searchFilter2Style.img]}
                    />
                </View>

                <View>
                    <Rating
                        style={{ marginRight: "auto" }}
                        type='custom'
                        ratingColor='#FCCA19'
                        tintColor='#fff'
                        ratingBackgroundColor='#C8C8C8'
                        startingValue={parseInt(4)}
                        imageSize={customPixel.h16}
                        readonly={true}
                    />
                    <Text style={[ProductsStyle.text, searchFilter2Style.text]}>
                        {item.name.length > 50
                            ? `${item.name.slice(0, 50)} . . .`
                            : item.name}
                    </Text>
                    <Text style={ProductsStyle.price}>
                        {item.regular_price_formatted}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={allCategoriesStyle.superCont}>
                <View>
                    {loading ? (
                        <ListViewSkeleton></ListViewSkeleton>
                    ) : searchProducts?.records?.data.length > 0 ? (
                        <View
                            style={{
                                marginBottom: customPixel.h60,
                            }}
                        >
                            <FlatList
                                data={searchProducts?.records?.data}
                                keyExtractor={(_, i) => "key" + i}
                                renderItem={({ item }) => (
                                    <RenderItem item={item} />
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    textAlign: "center",
                                    marginVertical: customPixel.h50,
                                    fontFamily: "DMSans_500Medium",
                                    fontSize: customPixel.h18,
                                    color: "#2C2C2C",
                                }}
                            >
                                0 items found for "{searchContent}"
                            </Text>
                            <FeatureCategories
                                headerText={"Top Categories"}
                                size={size}
                            />
                            <View style={{ marginTop: customPixel.h30 }}>
                                <RelatedItem headerText={"Trending Items"} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </>
    );
};

export default SearchFilter2;
