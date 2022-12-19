import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";

const RenderItem = ({ itemKey, value }) => {
    return (
        <View style={specificationStyle.tableData}>
            <Text
                style={[
                    specificationStyle.specsWidth,
                    specificationStyle.borderRight,
                    specificationStyle.dataFont,
                ]}
            >
                {itemKey}
            </Text>
            <Text
                style={[
                    specificationStyle.detailsWidth,
                    specificationStyle.dataFont,
                ]}
            >
                {value.map((v, i) => {
                    if (value.length - 1 == i) return v;
                    else return `${v}, `;
                })}
            </Text>
        </View>
    );
};

const Specification = ({ specification }) => {
    return (
        <View style={specificationStyle.container}>
            <View>
                <View style={specificationStyle.tableHeader}>
                    <Text
                        style={[
                            specificationStyle.headerFont,
                            specificationStyle.specsWidth,
                            specificationStyle.borderRight,
                        ]}
                    >
                        Specs
                    </Text>
                    <Text
                        style={[
                            specificationStyle.headerFont,
                            specificationStyle.detailsWidth,
                        ]}
                    >
                        Details
                    </Text>
                </View>
                <ScrollView>
                    {Object.keys(specification).map((key, i) => {
                        return (
                            <RenderItem
                                itemKey={key}
                                value={specification[key]}
                                key={i}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

export default Specification;

const specificationStyle = StyleSheet.create({
    container: {
        padding: customPixel.h20,
        backgroundColor: "#fff",
        // height: customPixel.h375 * 1.5,
    },
    tableHeader: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    headerFont: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        lineHeight: customPixel.h22,
        color: "#000",
        textAlign: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    specsWidth: {
        width: "40%",
    },
    detailsWidth: {
        width: "60%",
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    tableData: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#DFDFDF",
    },
    dataFont: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h13,
        color: "#898989",
        lineHeight: customPixel.h22,
        padding: 15,
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: "#DFDFDF",
    },
});
