import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { ProfileStyles } from "../../Profile/ProfileStyle";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { fetchGetItem } from "../../../redux/slices/util/fetchGetItem";
import config from "../../../config";
import { useState } from "react";
import { allCategoriesStyle } from "../../Categories/categoriesStyle";
import { ProductsStyle } from "../FeaturedProducts/featureProductsStyle";
import FeatureProductSkeleton from "../../../src/skeletons/screens/home/FeatureProductSkeleton";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import { Rating } from "react-native-ratings";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { homeStyle } from "../homeStyle";
import { useNavigation } from "@react-navigation/native";
const URL = `${config.BASE_API_URL}/user/product-categorized`;
const FeatureDisplay = (props) => {
    const { text, value } = props?.route?.params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(async () => {
        const getProducts = await fetchGetItem(`${URL}/${value}`);
        setProducts(getProducts?.response?.records?.data);
        setLoading(false);
    }, []);

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
            <BackNavigation
                navigationProps={props.navigation}
                routeName={text}
                capitalize={true}
            />
            <View style={ProfileStyles.hrLine} />
            <View
                style={[
                    homeStyle.body,
                    {
                        paddingVertical: customPixel.h20,
                    },
                ]}
            >
                <View
                    style={{
                        marginBottom: customPixel.h60,
                    }}
                >
                    <View>
                        {loading ? (
                            <FeatureProductSkeleton />
                        ) : products?.length > 0 ? (
                            <FlatList
                                data={products}
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
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: customPixel.HWH,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: "DMSans_500Medium",
                                        fontSize: customPixel.h18,
                                        color: "#2C2C2C",
                                    }}
                                >
                                    {text} list is empty
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default FeatureDisplay;
