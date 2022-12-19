import { View, Text, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../../SkeletonElement";
import { customPixel } from "../../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { MyRefundStyle } from "../../../../../screens/Profile/MyRefund/MyRefundStyle";

import { refundStyle } from "../../../../../screens/Profile/MyRefund/RefundRequest/RefundRequestStyle";
import { refundDetailsStyle } from "../../../../../screens/Profile/MyRefund/RefundList/RefundDetails/refundDetailsStyle";
const RenderItem = ({ item }) => {
    return (
        <View style={refundStyle.container}>
            <View style={refundDetailsStyle.detailHeader}>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h20,
                            width: customPixel.wF - customPixel.h280,
                        }}
                    />
                    <View style={{ marginTop: customPixel.h10 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h40,
                                width: customPixel.wF - customPixel.h240,
                            }}
                        />
                    </View>
                </View>
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h20,
                            width: customPixel.wF - customPixel.h280,
                        }}
                    />
                    <View style={{ marginTop: customPixel.h10 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h40,
                                width: customPixel.wF - customPixel.h240,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    ...MyRefundStyle.lastRefund,
                    marginTop: customPixel.h24,
                }}
            >
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
                            height: customPixel.h85,
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
                    marginTop: customPixel.h18,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h16,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h80,
                                width: customPixel.wF - customPixel.h300,
                            }}
                        />
                    </View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h80,
                                width: customPixel.wF - customPixel.h300,
                            }}
                        />
                    </View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h80,
                                width: customPixel.wF - customPixel.h300,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h18,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h16,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h100,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h20 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h50,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};
const RefundDetailsSkeleton = () => {
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

export default RefundDetailsSkeleton;
