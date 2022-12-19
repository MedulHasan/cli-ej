import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { categoriesStyle } from "./featureCategoriesStyle";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getTopCategory } from "../../../redux/slices/categorys/topCategory";
import FeatureCategorySkeleton from "../../../src/skeletons/screens/home/FeatureCategorySkeleton";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { useNavigation } from "@react-navigation/native";
import ProgressiveImage from "../../../src/components/ProgressiveImage";

const FeatureCategories = ({ headerText, size }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { topCategory, loading } = useSelector((state) => state.topCategory);

    useEffect(async () => {
        let isMounted = true;
        if (isMounted && topCategory.length === 0) {
            dispatch(getTopCategory());
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    const RenderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                /* onPress={() =>
                    navigation.navigate("Product Details", {
                        slug: item?.slug,
                    })
                } */
                style={[
                    categoriesStyle.item,
                    {
                        height: size.contHeight,
                        width: size.contWidth,
                        marginRight:
                            topCategory.length - 1 === index
                                ? 0
                                : customPixel.h15,
                    },
                ]}
            >
                <ProgressiveImage
                    source={{ uri: item?.picture_url }}
                    style={[
                        categoriesStyle.img,
                        { height: size.imgHeight, width: size.imgWidth },
                    ]}
                />
                <Text style={categoriesStyle.text}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Text style={categoriesStyle.title}>{headerText}</Text>
            {loading ? (
                <View>
                    <FlatList
                        keyExtractor={(_, i) => "key" + i}
                        data={[1, 2, 3, 4]}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <FeatureCategorySkeleton item={item} />
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            ) : (
                <>
                    {topCategory?.length === 0 ? (
                        <View>
                            <Text style={categoriesStyle.emptyTextStyle}>
                                Category List is Empty
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            keyExtractor={(_, i) => "key" + i}
                            data={topCategory}
                            horizontal={true}
                            renderItem={({ item, index }) => (
                                <RenderItem item={item} index={index} />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}
                </>
            )}
        </View>
    );
};

export default FeatureCategories;
