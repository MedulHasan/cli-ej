import {
    View,
    Text,
    FlatList,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { getbestSellers } from "../../../redux/slices/bestSellers/bestSellers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import config from "../../../config";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { filterHomeStyle } from "./FilterHomeStyle";
import { categoriesStyle } from "../../Home/FeatureCategories/featureCategoriesStyle";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import { ProductsStyle } from "../../Home/FeaturedProducts/featureProductsStyle";
import { useNavigation } from "@react-navigation/native";
import bestSellersSkeleton from "../../../src/skeletons/screens/Search/BestSellersSkeleton";
import BestSellersSkeleton from "../../../src/skeletons/screens/Search/BestSellersSkeleton";

const BestSellers = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const bestSellerURL = `${config.BASE_API_URL}/user/product-categorized/bestSeller`;
    const { bestSellers, loading: isLoading } = useSelector(
        (state) => state.bestSellers
    );
    useEffect(async () => {
        dispatch(getbestSellers(bestSellerURL));
    }, []);
    const RenderItem = ({ item }) => {
        return (
            <View style={[categoriesStyle.item, filterHomeStyle.sellerItem]}>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate("Product Details", {
                            slug: item?.slug,
                        })
                    }
                >
                    <View>
                        <ProgressiveImage
                            source={{ uri: item.featured_image }}
                            style={ProductsStyle.img}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    return (
        <View
            style={{
                marginTop: customPixel.h30,
                marginBottom: customPixel.h20,
            }}
        >
            <Text
                style={[
                    filterHomeStyle.header,
                    { marginBottom: customPixel.h15 },
                ]}
            >
                Best Sellers
            </Text>
            {isLoading ? (
                <View>
                    <BestSellersSkeleton />
                </View>
            ) : (
                <View>
                    {bestSellers.length > 0 ? (
                        <FlatList
                            data={bestSellers}
                            keyExtractor={(_, i) => "key" + i}
                            renderItem={({ item }) => (
                                <RenderItem item={item} />
                            )}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                            }}
                        />
                    ) : (
                        <View>
                            <Text>Best Sellers List is Empty</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default BestSellers;
