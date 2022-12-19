import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useToast } from "native-base";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { ProfileStyles } from "../../Profile/ProfileStyle";
import { filtersStyles } from "./filtersStyle";
import CommonStyles from "../../Utilities/CommonStyles/CommonStyles";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { EditProfileStyle } from "../../Profile/EditProfile/StyleEditProfile";
import FilterInput from "./FilterInput";
import { Rating } from "react-native-ratings";
import FilterSelect from "./FilterSelect";
import SelectBrand from "./SelectBrand";
import { addNewAddressStyle } from "../../Profile/Address/AddNewAddress/AddNewAddressStyle";
import { useDispatch, useSelector } from "react-redux";
import { manageFilter } from "../utils/filterAttribute";
import { allCategoriesStyle } from "../../Categories/categoriesStyle";
import { getsearchProducts } from "../../../redux/slices/searchProducts/searchProducts";
import config from "../../../config";
import {
    CustomToast,
    successToase,
} from "../../Utilities/CustomToast/CustomToast";
import CustomSpinner from "../../Utilities/CustomSpinner/CustomSpinner";
import { useNavigation } from "@react-navigation/native";
import { useReducer } from "react";
const URL = `${config.BASE_API_URL}/user/products?`;
const Filters = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();
    const { searchProducts, loading } = useSelector(
        (state) => state.searchProducts
    );
    var res = "",
        count = 0,
        price_key = "price_range";
    const filterableAttributes = searchProducts?.records?.filterable;
    let { prop, price_range, rating } = manageFilter(filterableAttributes);
    const [attributeKey, setattributeKey] = useState(prop);
    const [stars, setStars] = useState(0);
    const [visitFromFilter, setVisitFromFilter] = useState(true);

    const ratingCompleted = (r) => {
        let ratingValue = r.toFixed(1);
        setStars(parseInt(ratingValue));
    };
    const [minPrice, setMin_Price] = useState("");
    const [maxPrice, setMax_Price] = useState("");
    const updatedPrice = (text, type) => {
        if (type === "min") setMin_Price(text);
        else {
            setMax_Price(text);
        }
    };

    const resetData = () => {
        setattributeKey(prop);
        setMin_Price("");
        setMax_Price("");
        setStars(0);
    };

    const handleCheckSize = (itemTitle, item, index) => {
        let name1 = item.name;
        const updProducts = attributeKey.map((name) => {
            for (let n in name) {
                if (n === itemTitle) {
                    return {
                        [n]: {
                            ...name[n],
                            value: name[n].value.map((n2) => {
                                if (n2.id == index && n2.name == name1) {
                                    return {
                                        ...n2,
                                        isChecked: !n2.isChecked,
                                    };
                                } else {
                                    return n2;
                                }
                            }),
                        },
                    };
                } else {
                    return { [n]: name[n] };
                }
            }
        });
        setattributeKey(updProducts);
    };

    const handleUpDownIcon = (item) => {
        let updatedAttribute = attributeKey.map((product) => {
            if (Object.keys(product)[0] === item) {
                return {
                    [item]: {
                        ...product[item],
                        status: !product[item].status,
                    },
                };
            } else {
                return product;
            }
        });
        setattributeKey(updatedAttribute);
    };

    if (attributeKey.length > 0) {
        var out = attributeKey.map((obj) => {
            for (let key in obj) {
                if (!obj[key].attribute) {
                    return {
                        [key]: obj[key].value
                            .filter((v) => v.isChecked)
                            .map((v) => v.name),
                    };
                } else {
                    return {
                        attribute: {
                            [key]: obj[key].value
                                .filter((v) => v.isChecked)
                                .map((v) => v.name),
                        },
                    };
                }
            }
        });
    }
    if (out?.length > 0) {
        out.map((v) => {
            for (let k in v) {
                if (Array.isArray(v[k]) && v[k].length > 0) {
                    res += `${k}=${v[k].toString()}`;
                    res += `&`;
                } else if (!Array.isArray(v[k])) {
                    count += 1;
                    if (count == 1) {
                        res += `${k}:`;
                    }

                    for (let k1 in v[k]) {
                        res += `${k1}=${v[k][k1].toString()}`;
                        res += `&`;
                    }
                }
            }
        });
    }

    if (minPrice && maxPrice) {
        res += `${price_key}=${minPrice},${maxPrice}&`;
    }
    if (stars > 0) {
        res += `rating=${stars}&`;
    }

    const updateData = async () => {
        if (res) {
            let value = res.slice(0, -1);
            const result = await dispatch(getsearchProducts(`${URL}${value}`));
            let data = result?.payload?.records?.data;
            let code = result?.payload?.status?.code;

            if (code === 200) {
                navigation.navigate("filter home", {
                    url: `${URL}${value}`,
                    visitFromFilter: visitFromFilter,
                });
                CustomToast(
                    toast,
                    "Products updated successfully",
                    successToase
                );
            }
        } else {
            alert("Please select an option first.");
        }
    };
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : ""}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={[
                            CommonStyles.globalContainer,
                            { marginBottom: 0 },
                        ]}
                    >
                        <View>
                            <View>
                                {attributeKey.map((item, index) => (
                                    <View key={`key${index}`}>
                                        <FilterSelect
                                            item={Object.keys(item)[0]}
                                            show={Object.values(item)[0].status}
                                            handleUpDownIcon={handleUpDownIcon}
                                        />

                                        {Object.values(item)[0].status && (
                                            <SelectBrand
                                                itemTitle={Object.keys(item)[0]}
                                                brands={
                                                    Object.values(item)[0].value
                                                }
                                                handleCheckSize={
                                                    handleCheckSize
                                                }
                                            ></SelectBrand>
                                        )}
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ marginBottom: customPixel.h120 }}>
                            <View>
                                <View>
                                    <Text
                                        style={[
                                            filtersStyles.selectText,
                                            {
                                                marginTop: customPixel.h20,
                                            },
                                        ]}
                                    >
                                        Ratings
                                    </Text>
                                </View>
                                <View style={filtersStyles.ratingCont}>
                                    <Rating
                                        type='custom'
                                        ratingColor='#FCCA19'
                                        tintColor='#fff'
                                        ratingBackgroundColor='#C8C8C8'
                                        startingValue={parseInt(stars)}
                                        imageSize={customPixel.h25}
                                        onFinishRating={ratingCompleted}
                                    />
                                    <Text style={filtersStyles.inputText}>
                                        {stars === 0
                                            ? "Not Selected"
                                            : stars.toFixed(1)}
                                    </Text>
                                </View>
                            </View>

                            <View>
                                {price_range?.length > 0 && (
                                    <FilterInput
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        updatedPrice={updatedPrice}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View
                style={[EditProfileStyle.changeInfo, filtersStyles.applyCont]}
            >
                <TouchableOpacity onPress={resetData}>
                    <Text style={EditProfileStyle.cancel}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={!loading ? updateData : null}
                    style={addNewAddressStyle.saveAddressCont}
                >
                    {loading ? (
                        <CustomSpinner
                            filePath={require("../../../assets/lottie/loader2.json")}
                            size={{
                                width: customPixel.h60,
                                height: customPixel.h50,
                            }}
                        />
                    ) : (
                        <Text style={addNewAddressStyle.saveAddressBtn}>
                            Apply Changes
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Filters;
