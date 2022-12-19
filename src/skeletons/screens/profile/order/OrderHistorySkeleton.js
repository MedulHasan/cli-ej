import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../../SkeletonElement";
import { orderHistoryStyle } from "../../../../../screens/Profile/OrderHistory/OrderHistoryStyle";
import { customPixel } from "../../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const RenderItem = ({ item }) => (
    <View style={orderHistoryStyle.item}>
        <View style={styles.header}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h20,
                    width: customPixel.h100,
                }}
            />
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h20,
                    width: customPixel.h100,
                }}
            />
        </View>
        <SkeletonElement
            wrapperStyle={{
                height: customPixel.h12,
                width: customPixel.wF - customPixel.h120,
            }}
        />
    </View>
);

const OrderHistorySkeleton = () => {
    let x = undefined;
    return (
        <View>
            <FlatList
                data={new Array(9).fill(x)}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(_, i) => `key${i}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default OrderHistorySkeleton;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: customPixel.h10,
    },
});
