import { View, Dimensions, FlatList, StyleSheet } from "react-native";
import React from "react";
import SkeletonElement from "../../SkeletonElement";
import { customPixel } from "../../../../screens/Utilities/CustomStyleAttribute/CustomPixel";

const { width } = Dimensions.get("window");

const RenderItem = ({ item }) => {
    return (
        <View style={styles.itemCont}>
            <SkeletonElement
                wrapperStyle={{
                    width:
                        width < 321 ? customPixel.h160 + 25 : width / 2.5 - 30,
                    height:
                        width < 321 ? customPixel.h160 + 25 : width / 2.5 - 30,
                }}
            />
            <View
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: customPixel.h20,
                }}
            >
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h12,
                        width: customPixel.h100,
                    }}
                />
                <SkeletonElement
                    wrapperStyle={{
                        height: customPixel.h14,
                        width: customPixel.h130,
                    }}
                />
            </View>
        </View>
    );
};

const ListViewSkeleton = () => {
    return (
        <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            keyExtractor={(_, i) => "key" + i}
            renderItem={({ item }) => <RenderItem item={item} />}
            showsVerticalScrollIndicator={false}
            //     numColumns={2}
            //     columnWrapperStyle={{
            //         justifyContent: "space-between",
            //     }}
        />
    );
};

export default ListViewSkeleton;

const styles = StyleSheet.create({
    itemCont: {
        marginBottom: customPixel.h20,
        flexDirection: "row",
        alignContent: "center",
    },
});
