import { StyleSheet, View, Dimensions, Text } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import { ProfileStyles } from "../../../../screens/Profile/ProfileStyle";

const ProductDetailsSkeleton = () => {
    return (
        <>
            <View style={styles.itemCont}>
                <SkeletonElement
                    wrapperStyle={{
                        width: customPixel.wF,
                        height: customPixel.h270,
                        marginBottom: customPixel.h10,
                    }}
                ></SkeletonElement>

                <View style={{ marginHorizontal: customPixel.h20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h180,
                                height: customPixel.h10,
                                marginBottom: customPixel.h10,
                            }}
                        />
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h40,
                                height: customPixel.h10,
                                marginBottom: customPixel.h10,
                            }}
                        />
                    </View>
                    <SkeletonElement
                        wrapperStyle={{
                            width: customPixel.h220,
                            height: customPixel.h20,
                        }}
                    />
                    <View
                        style={[
                            ProfileStyles.hrLine,
                            {
                                marginTop: customPixel.h15,
                            },
                        ]}
                    />
                    <View style={{ marginTop: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.wF - customPixel.h40,
                                height: customPixel.h30,
                            }}
                        />
                    </View>
                    <View
                        style={[
                            ProfileStyles.hrLine,
                            {
                                marginVertical: customPixel.h15,
                            },
                        ]}
                    />
                    <SkeletonElement
                        wrapperStyle={{
                            width: customPixel.wF - customPixel.h40,
                            height: customPixel.h30,
                        }}
                    />
                    <View
                        style={[
                            ProfileStyles.hrLine,
                            {
                                marginTop: customPixel.h15,
                            },
                        ]}
                    />
                    <View style={{ marginVertical: customPixel.h15 }}>
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h180,
                                height: customPixel.h20,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h100,
                                height: customPixel.h20,
                            }}
                        />
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h100,
                                height: customPixel.h20,
                            }}
                        />
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h100,
                                height: customPixel.h20,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: customPixel.h10,
                        }}
                    >
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h80,
                                height: customPixel.h70,
                                marginRight: customPixel.h20,
                            }}
                        />
                        <SkeletonElement
                            wrapperStyle={{
                                width: customPixel.h80,
                                height: customPixel.h70,
                            }}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

export default ProductDetailsSkeleton;

const styles = StyleSheet.create({
    itemCont: {
        backgroundColor: "#FFFFFF",
        height: customPixel.hFull,
    },
});
