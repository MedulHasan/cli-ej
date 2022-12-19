import { View } from "react-native";
import React, { useState } from "react";
import FilterComponent from "../FilterComponent/FilterComponent";
import SearchFilter2 from "../SearchFilter2/SearchFilter2";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import SearchProducts from "../Filters/SearchProducts";

const SearchFilter1 = ({ url, searchContent, visitFromFilter, update }) => {
    const [listView, setListView] = useState(false);
    return (
        <View style={{ marginBottom: customPixel.h200 }}>
            <FilterComponent
                setListView={setListView}
                listView={listView}
                url={url}
                searchContent={searchContent}
                update={update}
                visitFromFilter={visitFromFilter}
            />
            {listView ? (
                <SearchFilter2 searchContent={searchContent} />
            ) : (
                <SearchProducts searchContent={searchContent} />
            )}
        </View>
    );
};

export default SearchFilter1;
