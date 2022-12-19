import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import DownIcon from "../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../assets/svgs/dropdown/up.svg";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";

const { width, height } = Dimensions.get("window");

const CustomSelectDropdown = ({ filterArray, setValue }) => {
    let dropdownData;
    if (Array.isArray(filterArray)) {
        dropdownData = [`Select One`, ...filterArray];
    }
    return (
        <SelectDropdown
            data={dropdownData}
            onSelect={(selectedItem) => {
                if (selectedItem === `Select One`) return setValue("");
                else return setValue(selectedItem);
            }}
            defaultButtonText={dropdownData[0]}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
            buttonStyle={selectDropdownStyle.dropdown1BtnStyle}
            buttonTextStyle={selectDropdownStyle.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) =>
                isOpened ? <UpIcon /> : <DownIcon />
            }
            dropdownIconPosition={"right"}
            dropdownStyle={selectDropdownStyle.dropdown1DropdownStyle}
            rowStyle={selectDropdownStyle.dropdown1RowStyle}
            rowTextStyle={selectDropdownStyle.dropdown1RowTxtStyle}
        />
    );
};

export default CustomSelectDropdown;

export const selectDropdownStyle = StyleSheet.create({
    dropdown1BtnStyle: {
        width: (width - customPixel.w20 * 2) / 2.6,
        height: height < 534 ? customPixel.h50 : customPixel.h40,
        backgroundColor: "#FFF",
        borderRadius: customPixel.h4,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
    dropdown1BtnTxtStyle: {
        color: "#898989",
        textAlign: "left",
        fontSize: customPixel.h14,
        marginLeft: 0,
    },
    dropdown1DropdownStyle: {
        backgroundColor: "#fff",
        marginTop:
            Platform.OS === "android"
                ? height < 534
                    ? -customPixel.h35
                    : -customPixel.h31
                : 0,
        borderRadius: 6,
    },
    dropdown1RowStyle: {
        backgroundColor: "#fff",
        borderBottomColor: "#C5C5C5",
        height: height < 534 ? customPixel.h54 : customPixel.h50,
    },
    dropdown1RowTxtStyle: {
        color: "#898989",
        textAlign: "left",
        fontSize: customPixel.h14,
    },
});
