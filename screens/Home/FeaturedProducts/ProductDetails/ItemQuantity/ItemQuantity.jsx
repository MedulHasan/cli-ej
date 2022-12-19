import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MinusIcon from "../../../../../assets/svgs/cart/minus.svg";
import PlusIcon from "../../../../../assets/svgs/cart/plus.svg";
import { productDetailsStyle } from "../ProductDetailsStyle";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

const ItemQuantity = ({ quantity, setQuantity }) => {
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrement = () => {
        if (quantity <= 1) setQuantity(1);
        else setQuantity(quantity - 1);
    };
    return (
        <View style={productDetailsStyle.quantityCont}>
            <TouchableOpacity
                onPress={handleDecrement}
                style={productDetailsStyle.quantityIcon}
            >
                <MinusIcon
                    height={customPixel.h14}
                    width={customPixel.h14}
                    fill={quantity === 1 ? "#DFDFDF" : "#898989"}
                />
            </TouchableOpacity>
            <Text style={productDetailsStyle.quantity}>{quantity}</Text>
            <TouchableOpacity
                onPress={handleIncrement}
                style={productDetailsStyle.quantityIcon}
            >
                <PlusIcon
                    height={customPixel.h14}
                    width={customPixel.h14}
                    fill={"#898989"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ItemQuantity;
