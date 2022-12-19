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
            <View
                style={{
                    marginTop: customPixel.h30,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h24,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h50,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h20,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h24,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h50,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h20,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h24,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h50,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h20,
                }}
            >
                <View>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h24,
                            width: customPixel.wF - customPixel.h160,
                        }}
                    />
                </View>
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h50,
                                width: customPixel.wF - customPixel.h40,
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h30,
                }}
            >
                <View style={{ alignItems: "center" }}>
                    <SkeletonElement
                        wrapperStyle={{
                            height: customPixel.h100,
                            width: customPixel.wF - customPixel.h260,
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    marginTop: customPixel.h20,
                }}
            >
                <View>
                    <View style={{ marginEnd: customPixel.h15 }}>
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
const RequestRefundSkeleton = () => {
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

export default RequestRefundSkeleton;
