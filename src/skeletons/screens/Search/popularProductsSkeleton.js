import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { relatedItemStyle } from "../../../../screens/Home/FeaturedProducts/ProductDetails/RelatedItem/relatedItemStyle";
const { width } = Dimensions.get("window");

const RenderItem = ({ item }) => {
    return (
        <View style={relatedItemStyle.imgCont}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h105,
                    width: customPixel.h100,
                }}
            />
        </View>
    );
};

const PopularProductsSkeleton = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(_, i) => "key" + i}
            listKey={(_, i) => `listKey-b${i}`}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default PopularProductsSkeleton;

const styles = StyleSheet.create({
    itemCont: {
        marginTop: customPixel.h10,
    },
});
