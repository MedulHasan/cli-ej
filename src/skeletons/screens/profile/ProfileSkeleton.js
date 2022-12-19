import { View } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const ProfileSkeleton = () => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <SkeletonElement
                wrapperStyle={{
                    height: customPixel.h100,
                    width: customPixel.h100,
                    borderRadius: 50,
                }}
            />
            <View style={{ marginLeft: customPixel.h10 }}>
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h20,
                        width: customPixel.wF - customPixel.h200,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h250,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.wF - customPixel.h250,
                    }}
                />
            </View>
        </View>
    );
};

export default ProfileSkeleton;
