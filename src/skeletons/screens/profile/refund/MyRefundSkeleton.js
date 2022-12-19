import { View, Text, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../../SkeletonElement";
import { customPixel } from "../../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { MyRefundStyle } from "../../../../../screens/Profile/MyRefund/MyRefundStyle";
const RenderItem = ({ item }) => {
    return (
        <View>
            <View style={MyRefundStyle.lastRefund}>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h20,
                            width: customPixel.wF - customPixel.h280,
                        }}
                    />
                    <View style={{ marginTop: customPixel.h14 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h14,
                                width: customPixel.wF - customPixel.h240,
                            }}
                        />
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h14,
                                width: customPixel.wF - customPixel.h180,
                            }}
                        />
                    </View>
                </View>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h14,
                            width: customPixel.wF - customPixel.h300,
                        }}
                    />
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h60,
                            width: customPixel.wF - customPixel.h300,
                        }}
                    />
                </View>
                <View style={{ marginVertical: customPixel.h10 }}>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h12,
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    ...MyRefundStyle.lastRefund,
                    marginTop: customPixel.h18,
                }}
            >
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h14,
                        width: customPixel.wF - customPixel.h80,
                    }}
                />
            </View>
            <View
                style={{
                    ...MyRefundStyle.lastRefund,
                    marginTop: customPixel.h18,
                    alignItems: "center",
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h80,
                            width: customPixel.wF - customPixel.h300,
                        }}
                    />
                </View>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h14,
                            width: customPixel.wF - customPixel.h260,
                        }}
                    />
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h14,
                            width: customPixel.wF - customPixel.h260,
                        }}
                    />
                </View>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h40,
                            width: customPixel.wF - customPixel.h300,
                        }}
                    />
                </View>
            </View>
        </View>
    );
};
const MyRefundSkeleton = () => {
    return (
        <View>
            <FlatList
                data={[1]}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(_, i) => `key-${i}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default MyRefundSkeleton;
