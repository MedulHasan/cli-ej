import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { ProductsStyle } from "../../Home/FeaturedProducts/featureProductsStyle";
import { useSelector } from "react-redux";
import { Rating } from "react-native-ratings";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import FeatureProductSkeleton from "../../../src/skeletons/screens/home/FeatureProductSkeleton";
import { useNavigation } from "@react-navigation/native";
import { allCategoriesStyle } from "../../Categories/categoriesStyle";
import FeatureCategories from "../../Home/FeatureCategories/FeatureCategories";
import RelatedItem from "../../Home/FeaturedProducts/ProductDetails/RelatedItem/RelatedItem";
import ProgressiveImage from "../../../src/components/ProgressiveImage";

const SearchProducts = ({ searchContent }) => {
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
            <View style={ProductsStyle.item}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Product Details", {
                            slug: item?.slug,
                        })
                    }
                >
                    <View style={ProductsStyle.imageContainer}>
                        <ProgressiveImage
                            source={{ uri: item?.featured_image }}
                            style={ProductsStyle.img}
                        />
                    </View>
                </TouchableOpacity>

                <Rating
                    style={{ marginRight: "auto" }}
                    type='custom'
                    ratingColor='#FCCA19'
                    tintColor='#fff'
                    ratingBackgroundColor='#C8C8C8'
                    startingValue={parseInt(4)}
                    imageSize={customPixel.h15}
                    readonly={true}
                />
                <Text style={ProductsStyle.text}>
                    {item?.name.length > 34
                        ? `${item.name.slice(0, 34)}...`
                        : item.name}
                </Text>
                <Text style={ProductsStyle.price}>
                    {item.regular_price_formatted}
                </Text>
            </View>
        );
    };
    return (
        <>
            <View style={allCategoriesStyle.superCont}>
                <View style={ProductsStyle.container}>
                    <View>
                        {loading ? (
                            <FeatureProductSkeleton />
                        ) : searchProducts?.records?.data.length > 0 ? (
                            <FlatList
                                data={searchProducts?.records?.data}
                                keyExtractor={(_, i) => "key-A" + i}
                                listKey={(_, i) => `listKey-A${i}`}
                                renderItem={({ item }) => (
                                    <RenderItem item={item} />
                                )}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                columnWrapperStyle={{
                                    justifyContent: "space-between",
                                }}
                            />
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
                                    <RelatedItem
                                        headerText={"Trending Items"}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default SearchProducts;
