import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { searchFilterStyles } from "../SearchFilter1/searchFilter1Style";
import FilterIcon from "../../../assets/svgs/filter/filter.svg";
import GridViewIcon from "../../../assets/svgs/filter/gridView.svg";
import ListViewIcon from "../../../assets/svgs/filter/listView.svg";
import DownIcon from "../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../assets/svgs/dropdown/up.svg";
import { selectDropdownStyle } from "../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getsearchProducts } from "../../../redux/slices/searchProducts/searchProducts";
import config from "../../../config";
import { useEffect } from "react";

const GrigconSize = customPixel.h26;
const ListconSize = customPixel.h35;
const URL = `${config.BASE_API_URL}/user/products?keyword=`;
const FilterComponent = (props) => {
    const navigation = useNavigation();
    const {
        setListView,
        listView,
        url,
        searchContent,
        visitFromFilter,
        update,
    } = props;
    return (
        <View style={searchFilterStyles.filterContainer}>
            <TouchableOpacity
                style={searchFilterStyles.filterBtnCont}
                onPress={() => navigation.navigate("filters")}
            >
                <FilterIcon height={customPixel.h14} width={customPixel.h14} />
                <Text style={searchFilterStyles.filrerText}>Filter</Text>
            </TouchableOpacity>
            <CustomFilterSelectDropdown
                url={url}
                searchContent={searchContent}
                visitFromFilter={visitFromFilter}
                update={update}
                filterArray={[
                    "Select an option.",
                    "Price Low to High",
                    "Price High to Low",
                    "Avg. Ratting",
                ]}
            />
            <TouchableOpacity
                style={searchFilterStyles.gridIcon}
                onPress={() => setListView(false)}
            >
                <GridViewIcon
                    height={GrigconSize}
                    width={GrigconSize}
                    fill={listView ? "#AFAFAF" : "#2C2C2C"}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setListView(true)}>
                <ListViewIcon
                    height={ListconSize}
                    width={ListconSize}
                    fill={!listView ? "#AFAFAF" : "#2C2C2C"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default FilterComponent;

const CustomFilterSelectDropdown = ({
    filterArray,
    url,
    searchContent,
    visitFromFilter,
    update,
}) => {
    const dispatch = useDispatch();
    const dropdownRef = useRef({});
    const [filterUrl, setFilterUrl] = useState(url);
    useEffect(() => {
        setFilterUrl(url);
        dropdownRef?.current?.reset();
    }, [url]);

    useEffect(async () => {
        setFilterUrl(null);
        await dropdownRef?.current?.reset();
    }, [update]);

    const sortByFilter = (selectedItem) => {
        if (selectedItem == filterArray[0] && !url) {
            dispatch(getsearchProducts(`${URL}${searchContent}`));
        } else {
            if (filterUrl) {
                dispatch(getsearchProducts(`${url}&sort_by=${selectedItem}`));
            } else {
                dispatch(
                    getsearchProducts(
                        `${URL}${searchContent}&sort_by=${selectedItem}`
                    )
                );
            }
        }
    };

    return (
        <SelectDropdown
            data={filterArray}
            onSelect={(selectedItem, index) => sortByFilter(selectedItem)}
            defaultButtonText={`Sort By: ${filterArray[0]}`}
            buttonTextAfterSelection={(selectedItem, index) => {
                return `Sort By: ${selectedItem}`;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={selectDropdownStyle.dropdown1BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
                return isOpened ? <UpIcon /> : <DownIcon />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={selectDropdownStyle.dropdown1DropdownStyle}
            rowStyle={selectDropdownStyle.dropdown1RowStyle}
            rowTextStyle={selectDropdownStyle.dropdown1RowTxtStyle}
            ref={dropdownRef}
        />
    );
};

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: customPixel.wF - customPixel.h220,
        height: customPixel.hFull < 534 ? customPixel.h50 : customPixel.h40,
        backgroundColor: "#FFF",
        borderRadius: customPixel.h4,
        borderWidth: 1,
        borderColor: "#DFDFDF",
    },
});
