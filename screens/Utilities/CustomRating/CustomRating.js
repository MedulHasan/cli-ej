import { View, Text } from "react-native";
import React from "react";
import { Rating } from "react-native-ratings";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";

const CustomRating = ({ read }) => {
    return (
        <View>
            <Rating
                type='custom'
                ratingColor='#FCCA19'
                tintColor='#fff'
                ratingBackgroundColor='#C8C8C8'
                startingValue={parseInt(0)}
                imageSize={customPixel.h22}
                readonly={read}
            />
        </View>
    );
};

export default CustomRating;
