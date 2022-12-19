import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../../../SkeletonElement";
import { orderHistoryStyle } from "../../../../../../screens/Profile/OrderHistory/OrderHistoryStyle";
import { customPixel } from "../../../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { MyRefundStyle } from "../../../../../../screens/Profile/MyRefund/MyRefundStyle";
import { OrderDetailsStyle } from "../../../../../../screens/Profile/OrderHistory/OrderDetails/OrderDetailsStyle";

const RenderItem = ({ item }) => (
    <View style={styles.container}>
        <SkeletonElement
            wrapperStyle={{
                height: customPixel.h20,
                width: customPixel.wF - customPixel.h260,
            }}
        />
        <SkeletonElement
            wrapperStyle={{
                height: customPixel.h20,
                width: customPixel.wF - customPixel.h210,
            }}
        />
        <SkeletonElement
            wrapperStyle={{
                height: customPixel.h20,
                width: customPixel.wF - customPixel.h260,
            }}
        />

        <View style={{ marginTop: customPixel.h30 }}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h30,
                    width: customPixel.wF - customPixel.h40,
                }}
            />
        </View>
        <View
            style={{
                ...OrderDetailsStyle.deliveryCont,
                marginTop: customPixel.h26,
            }}
        >
            <View style={OrderDetailsStyle.deliverySubCont}>
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
            </View>
            <View
                style={[
                    OrderDetailsStyle.deliverySubCont,
                    {
                        borderLeftWidth: 1,
                        borderColor: "#B1B1B1",
                    },
                ]}
            >
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
            </View>
        </View>
        <View
            style={{
                ...OrderDetailsStyle.deliveryCont,
                marginTop: customPixel.h26,
            }}
        >
            <View style={OrderDetailsStyle.deliverySubCont}>
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
            </View>
            <View
                style={[
                    OrderDetailsStyle.deliverySubCont,
                    {
                        borderLeftWidth: 1,
                        borderColor: "#B1B1B1",
                    },
                ]}
            >
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h280,
                    }}
                />
            </View>
        </View>
        <View style={{ marginTop: customPixel.h30 }}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h12,
                    width: customPixel.wF - customPixel.h220,
                }}
            />
            <View style={OrderDetailsStyle.shoppingTextCont}>
                <View style={OrderDetailsStyle.shoppingTextWidth}>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                </View>
                <View style={OrderDetailsStyle.shoppingTextWidth}>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: customPixel.h12 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                height: customPixel.h12,
                                width: customPixel.wF - customPixel.h280,
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    </View>
);

const OrderDetailsSkeleton = () => {
    let x = undefined;
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

export default OrderDetailsSkeleton;

const styles = StyleSheet.create({
    container: {
        marginTop: customPixel.h20,
        flex: 1,
        alignItems: "center",
    },
    shipping: {
        marginTop: customPixel.h20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
