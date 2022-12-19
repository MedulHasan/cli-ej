import { View, Text, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../../SkeletonElement";
import { customPixel } from "../../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import AddressStyle from "../../../../../screens/Profile/Address/AddressStyle";
import { orderHistoryStyle } from "../../../../../screens/Profile/OrderHistory/OrderHistoryStyle";

const RenderItem = ({ item }) => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: "#DFDFDF",
                marginTop: customPixel.h20,
                borderRadius: customPixel.h6,
                paddingVertical: customPixel.h5,
                paddingHorizontal: customPixel.h15,
            }}
        >
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h20,
                    width: customPixel.wF - customPixel.h280,
                }}
            />

            <View style={{ marginVertical: customPixel.h10 }}>
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                    }}
                />
            </View>
        </View>
    );
};
const RefundListSkeleton = () => {
    return (
        <View>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(_, i) => `key-${i}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default RefundListSkeleton;
