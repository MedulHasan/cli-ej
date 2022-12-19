import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import MenuNavigation from "../Utilities/CustomHeader/MenuNavigation";
import { ProfileStyles } from "../Profile/ProfileStyle";
import Checkbox from "expo-checkbox";
import { cartStyle } from "./shoppingCartStyle";
import DeleteIcon from "../../assets/svgs/my wishlist/delete icon.svg";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import config from "../../config";
import {
    deleteGroupItemsFromCart,
    getCartProduct,
} from "../../redux/slices/cart/getCartProducts";
import { useIsFocused } from "@react-navigation/native";
import SellerGroup from "./SellerGroup";
import { restructureData } from "./cartCommonFunctions";
import { confirmEmailStyles } from "../../components/Authentication/ConfirmEmail/ConfirmEmailStyle";
import CustomSpinner from "../Utilities/CustomSpinner/CustomSpinner";
import { postSelectProduct } from "../../redux/slices/cart/selectProduct/selectProduct";
import { deleteGroupItems } from "../../redux/slices/cart/deleteCartItem/deleteGroupItems";
import { storeItemInCart } from "../../redux/slices/cart/storeItemInCart";
import { decrementQtyFromCart } from "../../redux/slices/cart/decrementQtyFromCart";

const CARTURL = `${config.BASE_API_URL}/user/carts`;
const selectURL = `${config.BASE_API_URL}/user/cart/selected-store`;
const storeItemInCartUrl = `${config.BASE_API_URL}/user/cart/store`;
const decrementUrl = `${config.BASE_API_URL}/user/cart/reduce-qty`;

const Cart = (props) => {
    let isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const {
        cart_Data: { cartData, selectedCarts, vendors } = {},
        cartLoading,
    } = useSelector((state) => state.cartProductSlice);
    const [data, setData] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isGroupCheck, setIsGroupCheck] = useState([]);
    const [isCheck, setIsCheck] = useState([]);
    const [priceData, setPriceData] = useState({});
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        if (isCheck?.length > 0) {
            const { selectedItems, priceData } = storeSelectedItems();
            setSelectedProducts(selectedItems);
            setPriceData(priceData);
        } else {
            setSelectedProducts([]);
            setPriceData({});
        }
    }, [isCheck, data]);

    useEffect(() => {
        let data = [];
        //convert cartData to vendor group data
        if (cartData?.length > 0) {
            data = restructureData(cartData, vendors);
            setData(data);
        } else {
            setData(data);
        }

        // set single checkbox
        let selectedCartsConvertToNum = selectedCarts?.map((str) =>
            Number(str)
        );
        setIsCheck(selectedCartsConvertToNum);

        //set group checkbox
        let updateGroupCheck = [];
        if (data?.length > 0) {
            let groupCheckValues = [...isGroupCheck];
            for (let item of data) {
                if (selectedCartsConvertToNum && item) {
                    let x = selectGroup(
                        selectedCartsConvertToNum,
                        item,
                        updateGroupCheck,
                        groupCheckValues
                    );
                    groupCheckValues = x;
                    updateGroupCheck = [...updateGroupCheck, ...x].filter(
                        (v, i, a) => a.indexOf(v) === i
                    );
                }
            }
            setIsGroupCheck(updateGroupCheck);
            // select all
            if (updateGroupCheck?.length == data?.length) {
                setIsCheckAll(true);
            } else {
                setIsCheckAll(false);
            }
        }
    }, [cartData, selectedCarts]);

    useEffect(() => {
        if (isFocused) {
            dispatch(getCartProduct({ access_token, CARTURL }));
        }
    }, [isFocused /* isCheck?.length, cartData?.length */]);

    const handleSelectAll = (e) => {
        let selectAll;
        setIsCheckAll(!isCheckAll);
        if (e) {
            //select group check
            setIsGroupCheck(
                data?.map((li) => {
                    return Number(li.vendor_id);
                })
            );
            // select single check
            let selectAllCheckbox = data?.map((arr) =>
                arr.items.map((a) => a.id)
            );
            selectAll = selectAllCheckbox
                .join()
                .split(",")
                .map((str) => Number(str));
            setIsCheck(selectAll);
            selectedItemStoreFunction(selectAll);
        } else {
            // uncheck all
            setIsGroupCheck([]);
            setIsCheck([]);
        }
    };

    const handleGroupCheck = (e, id) => {
        let groups = [];
        if (isGroupCheck.indexOf(id) == -1) {
            groups = [...isGroupCheck, id];
            setIsGroupCheck(groups);
        }
        let groupCheck;
        if (!e) {
            setIsGroupCheck(isGroupCheck.filter((item) => item !== id));
            let selectWhichCheckboxUncheck = data
                .find((arr) => arr.vendor_id == id)
                .items.map((a) => a.id);
            groupCheck = isCheck.filter(
                (item) => !selectWhichCheckboxUncheck.includes(item)
            );
            setIsCheck(groupCheck);
        } else {
            let singleCheck = data
                .find((arr) => arr.vendor_id == id)
                .items.map((a) => a.id);
            groupCheck = [...isCheck, ...singleCheck].filter(
                (v, i, a) => a.indexOf(v) === i
            );
            setIsCheck(groupCheck);
        }
        selectedItemStoreFunction(groupCheck);
        // select all
        if (groups.length == data.length) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }
    };

    const handleCheck = (e, id, vendor_id) => {
        //single select
        let allCheck;
        if (!e) {
            allCheck = isCheck.filter((itemId) => itemId != id);
            setIsCheck(allCheck);
        } else {
            allCheck = [...isCheck, id];
            setIsCheck(allCheck);
        }
        selectedItemStoreFunction(allCheck);
        // group select
        let uncheckGroup = data.find((item) => item.vendor_id == vendor_id);
        let updateGroupCheck = [];
        if (uncheckGroup && allCheck) {
            updateGroupCheck = selectGroup(
                allCheck,
                uncheckGroup,
                updateGroupCheck,
                isGroupCheck
            );
            setIsGroupCheck(updateGroupCheck);
        }
        // select all
        if (updateGroupCheck?.length == data?.length) {
            setIsCheckAll(true);
        } else {
            setIsCheckAll(false);
        }
    };

    const selectedItemStoreFunction = (allCheck) => {
        const data = {
            id: `[${allCheck}]`,
        };
        dispatch(
            postSelectProduct({
                access_token,
                selectURL,
                method: "POST",
                data,
            })
        );
    };

    const storeSelectedItems = () => {
        let selectedItems = [];
        for (let id of isCheck) {
            for (let group of data) {
                for (let data of group.items) {
                    if (data.id == id) {
                        selectedItems.push(data);
                    }
                }
            }
        }

        let priceData = {
            totalPrice: 0,
            tax: 0,
        };
        for (let item of selectedItems) {
            priceData.totalPrice =
                priceData.totalPrice +
                parseFloat(item?.price) * parseInt(item?.quantity);
            priceData.tax = parseFloat(item?.tax_rate);
        }
        return { selectedItems, priceData };
    };

    const selectGroup = (
        allCheck,
        uncheckGroup,
        updateGroupCheck,
        groupCheckValues
    ) => {
        let allCheckTrue = true;
        for (let item of uncheckGroup.items) {
            if (allCheck.indexOf(item.id) == -1) {
                allCheckTrue = false;
            }
        }
        if (allCheckTrue) {
            updateGroupCheck = [
                ...groupCheckValues,
                uncheckGroup.vendor_id,
            ].filter((v, i, a) => a.indexOf(v) === i);
            updateGroupCheck = updateGroupCheck.map((str) => Number(str));
        } else {
            updateGroupCheck = groupCheckValues.filter(
                (item) => item != uncheckGroup.vendor_id
            );
        }
        return updateGroupCheck;
    };

    const handleDeleteAll = () => {
        const deleteGroupURL = `${config.BASE_API_URL}/user/cart/selected-delete`;
        const data = {
            id: `[${isCheck}]`,
        };
        dispatch(deleteGroupItemsFromCart(isCheck));
        dispatch(
            deleteGroupItems({
                access_token,
                deleteGroupURL,
                method: "POST",
                data,
            })
        );
    };

    const handleIncrement = async (id) => {
        const updateData = data?.map((group) => {
            return {
                ...group,
                items: group.items.map((item) => {
                    if (item.id == id) {
                        const cartData = {
                            code: item.code,
                            variation_id: item.variation_id,
                        };
                        dispatch(
                            storeItemInCart({
                                access_token,
                                storeItemInCartUrl,
                                cartData,
                            })
                        );
                        return {
                            ...item,
                            quantity: Number(item.quantity) + 1,
                        };
                    } else {
                        return item;
                    }
                }),
            };
        });
        setData(updateData);
    };

    const handleDecrement = (index) => {
        const updateData = data?.map((group) => {
            return {
                ...group,
                items: group.items.map((item) => {
                    if (item.index == index) {
                        const data = {
                            cartIndex: index,
                        };
                        dispatch(
                            decrementQtyFromCart({
                                access_token,
                                decrementUrl,
                                method: "POST",
                                data,
                            })
                        );
                        return {
                            ...item,
                            quantity: Number(item.quantity) - 1,
                        };
                    } else {
                        return item;
                    }
                }),
            };
        });
        setData(updateData);
    };

    return (
        <>
            {cartLoading && <InOnScreenLoader />}
            {/* {!cartLoading && loading && <InOnScreenLoader />} */}
            <MenuNavigation
                navigationProps={props.navigation}
                routeName={props.route}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={cartStyle.container}>
                {cartData?.length === 0 && <Text>Empty Cart</Text>}
                {cartData?.length > 0 && (
                    <View
                        style={[
                            cartStyle.selectAllCont,
                            {
                                backgroundColor: isCheckAll
                                    ? "#FCCA19"
                                    : "#FFFFFF",
                            },
                        ]}
                    >
                        <View style={cartStyle.deleteAllCont}>
                            <Checkbox
                                value={isCheckAll}
                                onValueChange={handleSelectAll}
                                color={"#2C2C2C"}
                                style={cartStyle.checkBoxSize}
                            />
                            <Text
                                style={[
                                    cartStyle.deleteText,
                                    {
                                        color: isCheckAll
                                            ? "#2C2C2C"
                                            : "#898989",
                                    },
                                ]}
                            >
                                {`Select All (${cartData?.length || 0} Items)`}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={cartStyle.deleteAllCont}
                            onPress={handleDeleteAll}
                        >
                            <Text
                                style={[
                                    cartStyle.deleteText,
                                    {
                                        color: isCheckAll
                                            ? "#2C2C2C"
                                            : "#898989",
                                    },
                                ]}
                            >
                                Delete All
                            </Text>
                            <DeleteIcon
                                height={customPixel.h14}
                                width={customPixel.h14}
                                fill={isCheckAll ? "#2C2C2C" : "#898989"}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <SellerGroup
                            item={item}
                            isGroupCheck={isGroupCheck}
                            handleGroupCheck={handleGroupCheck}
                            isCheck={isCheck}
                            handleCheck={handleCheck}
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                        />
                    )}
                    keyExtractor={(_, i) => "key" + i}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={cartStyle.checkoutCont}>
                <View>
                    <Text style={cartStyle.totalPriceText}>Total Price</Text>
                    <Text
                        style={[
                            cartStyle.totalPriceText,
                            {
                                fontSize: customPixel.h20,
                                marginTop: customPixel.h5,
                            },
                        ]}
                    >
                        {`$${priceData.totalPrice || 0}`}
                    </Text>
                </View>
                <TouchableOpacity
                    disabled={priceData.totalPrice ? false : true}
                    style={[
                        cartStyle.proceedBtn,
                        {
                            backgroundColor: priceData.totalPrice
                                ? "#FCCA19"
                                : "#DFDFDF",
                        },
                    ]}
                    onPress={() =>
                        props.navigation.navigate("billing info", {
                            priceData,
                            selectedProducts,
                        })
                    }
                >
                    <Text style={cartStyle.proceedText}>
                        Proceed to Checkout
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Cart;

export const InOnScreenLoader = () => (
    <View style={confirmEmailStyles.loading}>
        <CustomSpinner
            filePath={require("../../assets/lottie/loader.json")}
            size={{
                width: customPixel.h80,
                height: customPixel.h70,
            }}
        />
    </View>
);
