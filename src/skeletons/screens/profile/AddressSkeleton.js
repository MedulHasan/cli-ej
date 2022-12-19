import { View, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import AddressStyle from "../../../../screens/Profile/Address/AddressStyle";

const RenderItem = ({ item }) => {
    return (
        <View style={AddressStyle.singleAddressCont}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h20,
                    width: customPixel.wF - customPixel.h150,
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: customPixel.h10,
                }}
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
            <View style={{ marginVertical: customPixel.h10 }}>
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                    }}
                />
            </View>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h12,
                    width: customPixel.wF - customPixel.h250,
                }}
            />
        </View>
    );
};

const AddressSkeleton = () => {
    return (
        <View style={AddressStyle.container}>
            <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(_, i) => `key-${i}`}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default AddressSkeleton;
