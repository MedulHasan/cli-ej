import { View, Text, TouchableOpacity, LogBox } from "react-native";
import React from "react";
import DownIcon from "../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../assets/svgs/dropdown/up.svg";
import { filtersStyles } from "./filtersStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const iconHeight = customPixel.h8;
const iconWidth = customPixel.h16;

const FilterSelect = ({ item, handleUpDownIcon, show }) => {
    return (
        <View style={filtersStyles.selectCont}>
            <TouchableOpacity
                style={filtersStyles.subSelectCont}
                onPress={() => handleUpDownIcon(item)}
            >
                <Text style={filtersStyles.selectText}>Select {item}</Text>
                {show ? (
                    <UpIcon height={iconHeight} width={iconWidth} />
                ) : (
                    <DownIcon height={iconHeight} width={iconWidth} />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default FilterSelect;
