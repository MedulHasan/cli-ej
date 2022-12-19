import { View } from "react-native";
import React from "react";
import { skeletonStyle } from "./skeletonStyle";
import Shimmer from "./Shimmer";

const SkeletonElement = ({ wrapperStyle }) => {
    return (
        <View style={[skeletonStyle.skeleton, wrapperStyle]}>
            <Shimmer wrapperStyle={wrapperStyle} />
        </View>
    );
};

export default SkeletonElement;
