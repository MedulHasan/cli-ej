import { View, FlatList } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { skeletonStyle } from "../../skeletonStyle";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const RenderItem = ({ index }) => {
    return (
        <View
            key={`key-${index}`}
            style={[skeletonStyle.sleletonWrapper, { flexDirection: "row" }]}
        >
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h100,
                    width: customPixel.h100,
                }}
            />
            <View
                style={{
                    width: "100%",
                    marginLeft: 15,
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h20,
                        width: customPixel.wF - customPixel.h150,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h180,
                    }}
                />
            </View>
        </View>
    );
};

const CategoriesSkeleton = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={(_, index) => <RenderItem index={index} />}
            keyExtractor={(_, i) => "key" + i}
            style={{ minHeight: customPixel.hFull }}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default CategoriesSkeleton;
