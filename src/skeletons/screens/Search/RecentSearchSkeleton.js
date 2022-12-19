import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
const { width } = Dimensions.get("window");

const RenderItem = ({ item }) => {
    return (
        <View style={styles.itemCont}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h12,
                    width: customPixel.h200,
                }}
            />
        </View>
    );
};

const RecentSearchSkeleton = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(_, i) => "key" + i}
            listKey={(_, i) => `listKey-A${i}`}
            renderItem={({ item }) => <RenderItem item={item} />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default RecentSearchSkeleton;

const styles = StyleSheet.create({
    itemCont: {
        marginTop: customPixel.h10,
    },
});
