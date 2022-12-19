import { View, Text, FlatList } from "react-native";
import React from "react";
import { itemDetailsStyles } from "../../Home/FeaturedProducts/ProductDetails/ItemDetails/ItemDetailsStyle";
import CorrectBlack from "../../../assets/svgs/product details/correctBlack.svg";
import CorrectWhite from "../../../assets/svgs/product details/correctWhite.svg";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { filtersStyles } from "./filtersStyle";

const color = [
    {
        hex: "#FFFFFF",
        color: "White",
    },
    {
        hex: "#232323",
        color: "Black",
    },
    {
        hex: "#296BCD",
        color: "Blue",
    },
    {
        hex: "#FCCA19",
        color: "Yellow",
    },
    {
        hex: "#26C252",
        color: "Green",
    },
    {
        hex: "#F89ADD",
        color: "Pink",
    },
    {
        hex: "#D95454",
        color: "Red",
    },
    {
        hex: "#E0E0E0",
        color: "Others",
    },
];

const RenderItem = ({ items }) => {
    const { item } = items;
    return (
        <View style={filtersStyles.selececolorCont}>
            <View
                style={[
                    itemDetailsStyles.activeBorderColor,
                    {
                        borderWidth: item.hex === "#26C252" ? 1.5 : 0,
                        marginLeft: 0,
                    },
                ]}
            >
                <View
                    style={[
                        itemDetailsStyles.colorItem,
                        {
                            backgroundColor: item.hex,
                            borderWidth: item.hex === "#FFFFFF" ? 1 : 0,
                        },
                    ]}
                >
                    {item.hex === "#26C252" && (
                        <Text>
                            {item.hex === "#FFFFFF" ? (
                                <CorrectBlack />
                            ) : (
                                <CorrectWhite />
                            )}
                        </Text>
                    )}
                </View>
            </View>
            <Text
                style={[
                    filtersStyles.colorText,
                    {
                        color: item.color === "Green" ? "#2C2C2C" : "#898989",
                    },
                ]}
            >
                {item.color}
            </Text>
        </View>
    );
};

const SelectColor = () => {
    return (
        <FlatList
            data={color}
            renderItem={(item) => <RenderItem items={item} />}
            listKey={(_, i) => `list${i}`}
            keyExtractor={(_, i) => "key" + i}
            numColumns={3}
            columnWrapperStyle={{
                marginBottom: customPixel.h20,
            }}
            scrollEnabled={false}
        />
    );
};

export default SelectColor;
