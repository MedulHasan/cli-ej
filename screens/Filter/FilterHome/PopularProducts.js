import {
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getpopularProducts } from "../../../redux/slices/popularProducts/popularProducts";
import RelatedItem from "../../Home/FeaturedProducts/ProductDetails/RelatedItem/RelatedItem";
import { useEffect } from "react";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import config from "../../../config";
import { relatedItemStyle } from "../../Home/FeaturedProducts/ProductDetails/RelatedItem/relatedItemStyle";
import { filterHomeStyle } from "./FilterHomeStyle";
import { useNavigation } from "@react-navigation/native";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import { ProductsStyle } from "../../Home/FeaturedProducts/featureProductsStyle";
import PopularProductsSkeleton from "../../../src/skeletons/screens/Search/popularProductsSkeleton";

const PopularProducts = () => {
    const dispatch = useDispatch();
    const popularURL = `${config.BASE_API_URL}/user/product-categorized/popularProducts`;
    const { popularProducts, loading } = useSelector(
        (state) => state.popularProducts
    );
    useEffect(async () => {
        dispatch(getpopularProducts(popularURL));
    }, []);
    const RenderItem = ({ item }) => {
        const navigation = useNavigation();
        return (
            <View style={relatedItemStyle.imgCont}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate("Product Details", {
                            slug: item?.slug,
                        })
                    }
                >
                    <View>
                        <ProgressiveImage
                            source={{ uri: item?.featured_image }}
                            style={ProductsStyle.img}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    return (
        <View>
            <View
                style={{
                    marginTop: customPixel.h30,
                }}
            >
                <Text
                    style={[
                        filterHomeStyle.header,
                        { marginBottom: customPixel.h15 },
                    ]}
                >
                    Most Popular
                </Text>
                {loading ? (
                    <View>
                        <PopularProductsSkeleton />
                    </View>
                ) : (
                    <View>
                        {popularProducts.length > 0 ? (
                            <FlatList
                                data={popularProducts}
                                renderItem={({ item }) => (
                                    <RenderItem item={item} />
                                )}
                                keyExtractor={(_, i) => "key" + i}
                                listKey={(_, i) => `listKey-b${i}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        ) : (
                            <View>
                                <Text>Popular Products List is Empty</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default PopularProducts;
