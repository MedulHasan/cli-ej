import { View } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { skeletonStyle } from "../../skeletonStyle";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const FeatureCategorySkeleton = () => {
    return (
        <View style={skeletonStyle.sleletonWrapper}>
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h100,
                    width: customPixel.h100,
                }}
            />
        </View>
    );
};

export default FeatureCategorySkeleton;
