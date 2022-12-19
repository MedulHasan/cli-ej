import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { categoriesStyle } from "../../../../screens/Home/FeatureCategories/featureCategoriesStyle";
import { filterHomeStyle } from "../../../../screens/Filter/FilterHome/FilterHomeStyle";
const { width } = Dimensions.get("window");

const RenderItem = ({ item }) => {
    return (
        <View
            style={[
                styles.itemCont,
                categoriesStyle.item,
                filterHomeStyle.sellerItem,
                { borderColor: "white" },
            ]}
        >
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h105,
                    width: customPixel.h100,
                }}
            />
        </View>
    );
};

const BestSellersSkeleton = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({ item }) => <RenderItem item={item} />}
            keyExtractor={(_, i) => "key" + i}
            listKey={(_, i) => `listKey-b${i}`}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={{
                justifyContent: "flex-start",
            }}
        />
    );
};

export default BestSellersSkeleton;

const styles = StyleSheet.create({
    itemCont: {
        marginTop: customPixel.h20,
    },
});
