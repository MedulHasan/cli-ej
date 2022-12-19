import { View, Text } from "react-native";
import React from "react";
import StarIcon from "../../../../../assets/svgs/product details/Star.svg";
import { itemDetailsStyles } from "./ItemDetailsStyle";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { productDetailsStyle } from "../../ProductDetails/ProductDetailsStyle";
import Variations from "./Variations";

const ItemDetails = ({ price, variations, productDetails }) => {
    const { salePrice, regularPrice } = price;
    const {
        name,
        categories,
        manage_stocks,
        stock_quantity,
        stock_status,
        type,
    } = productDetails?.data;
    const variationKeys = Object.keys(variations);
    return (
        <View style={productDetailsStyle.container}>
            <View style={itemDetailsStyles.ratingCont}>
                {categories[0] && (
                    <Text style={itemDetailsStyles.nameText}>
                        {categories[0]}
                    </Text>
                )}
                <View style={itemDetailsStyles.rating}>
                    <StarIcon
                        height={customPixel.h13}
                        width={customPixel.h13}
                    />
                    <Text
                        style={[
                            itemDetailsStyles.ratingText,
                            itemDetailsStyles.nameText,
                        ]}
                    >
                        4.6
                    </Text>
                </View>
            </View>
            {name && <Text style={itemDetailsStyles.title}>{name}</Text>}
            <View style={itemDetailsStyles.priceCont}>
                {(salePrice || regularPrice) && (
                    <Text style={itemDetailsStyles.price}>
                        {salePrice || regularPrice}
                    </Text>
                )}
                {salePrice && regularPrice && (
                    <Text style={itemDetailsStyles.discount}>
                        {regularPrice}
                    </Text>
                )}
            </View>
            {type === "Variable Product" && (
                <View
                    style={{
                        borderTopWidth: 1,
                        borderColor: "#DFDFDF",
                    }}
                >
                    {variationKeys.map((key, i) => {
                        return (
                            <View
                                style={[
                                    itemDetailsStyles.sizeCont,
                                    /* {
                                        borderBottomWidth:
                                            variationKeys.length - 1 === i
                                                ? 0
                                                : 1,
                                    }, */
                                ]}
                                key={`key${i}`}
                            >
                                <Text style={itemDetailsStyles.sizeText}>
                                    {key[0].toUpperCase() + key.slice(1)}:
                                </Text>
                                <Variations
                                    variationObj={variations[key]}
                                    keyName={key}
                                />
                            </View>
                        );
                    })}
                </View>
            )}

            {stock_status && (
                <View style={itemDetailsStyles.availabilityCont}>
                    <Text style={itemDetailsStyles.availabilityText}>
                        Availability:
                    </Text>
                    <Text
                        style={[
                            itemDetailsStyles.stockText,
                            {
                                color:
                                    stock_status === "Out Of Stock"
                                        ? "#E43147"
                                        : "#009651",
                                backgroundColor:
                                    stock_status === "Out Of Stock"
                                        ? "#FFEEEE"
                                        : "#EBF9F1",
                            },
                        ]}
                    >
                        <Text>{stock_status}</Text>
                    </Text>
                </View>
            )}
        </View>
    );
};

export default ItemDetails;
