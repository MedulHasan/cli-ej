import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { filtersStyles } from "./filtersStyle";
import RightArrow from "../../../assets/svgs/refund/rightArrow.svg";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { unique } from "../utils/checkDuplicate";
import config from "../../../config";
import { useDispatch } from "react-redux";
import { getsearchProducts } from "../../../redux/slices/searchProducts/searchProducts";

const iconHeight = customPixel.h8;
const iconWidth = customPixel.h13;

const category = [
    "Electronic Devices",
    "Smart Phones",
    "TV & Home Appliances",
    "Health & Beauty",
];

const URL = `${config.BASE_API_URL}/user/products?categories=`;
const SelectCategory = ({ categories }) => {
    const dispatch = useDispatch();
    const handleCategory = async (item) => {};
    return (
        <View>
            {categories.map((item, index) => (
                <View key={`key${index}`} style={filtersStyles.categoryCont}>
                    <TouchableOpacity>
                        <Text
                            onPress={() => handleCategory(item)}
                            style={filtersStyles.categoryText}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={filtersStyles.visitCategory}>
                <Text style={filtersStyles.visiTtext}>Visit Categories</Text>
                <RightArrow
                    fill={"#898989"}
                    height={iconHeight}
                    width={iconWidth}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SelectCategory;
