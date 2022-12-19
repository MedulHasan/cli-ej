import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect } from "react";
import { useMemo } from "react";
import {
    FlatList,
    Text,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
} from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../config";
import { getFeatureProducts } from "../../../redux/slices/featureProducts/featureProducts";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import FeatureProductSkeleton from "../../../src/skeletons/screens/home/FeatureProductSkeleton";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { categoriesStyle } from "../FeatureCategories/featureCategoriesStyle";
import { ProductsStyle } from "./featureProductsStyle";

const FeaturedProducts = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { featureProducts, nextPageUrl, loading, loadMore } = useSelector(
        (state) => state.featureProducts
    );
    const URL = `${config.BASE_API_URL}/user/products`;

    useEffect(async () => {
        let isMounted = true;
        if (isMounted && loading && featureProducts.length === 0) {
            dispatch(getFeatureProducts(URL));
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const handleMoreData = () => {
        if (nextPageUrl && !loadMore) {
            dispatch(getFeatureProducts(nextPageUrl));
        }
    };

    const RenderItem = ({ item }) => {
        return (
            <View style={ProductsStyle.item}>
                <TouchableWithoutFeedback
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
                </TouchableWithoutFeedback>

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

    const renderItem = useMemo(() => RenderItem, []);
    const keyExtractor = useCallback((item) => item?.slug, []);
    return (
        <>
            <Text style={categoriesStyle.title}>Featured Products</Text>
            <View style={ProductsStyle.container}>
                <View style={{ paddingBottom: customPixel.h30 }}>
                    {loading ? (
                        <FeatureProductSkeleton />
                    ) : (
                        <FlatList
                            data={featureProducts}
                            initialNumToRender={20}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: "space-between",
                            }}
                            onEndReachedThreshold={0.1}
                            onEndReached={handleMoreData}
                            maxToRenderPerBatch={8}
                            windowSize={4}
                            removeClippedSubviews={true}
                            updateCellsBatchingPeriod={20}
                        />
                    )}
                </View>
                {loadMore && (
                    <View
                        style={{
                            position: "absolute",
                            bottom: customPixel.h10,
                            left: 0,
                            right: 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <ActivityIndicator color='#FCCA19' size='large' />
                    </View>
                )}
            </View>
        </>
    );
};

export default FeaturedProducts;
