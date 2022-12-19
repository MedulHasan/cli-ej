import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { cartStyle } from "./shoppingCartStyle";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import DeleteIcon from "../../assets/svgs/my wishlist/delete icon.svg";
import Checkbox from "expo-checkbox";
import SingleProduct from "./SingleProduct";
import useAuth from "../../hooks/useAuth";
import config from "../../config";
import { useDispatch } from "react-redux";
import { deleteGroupItems } from "../../redux/slices/cart/deleteCartItem/deleteGroupItems";
import { deleteGroupItemsFromCart } from "../../redux/slices/cart/getCartProducts";

const SellerGroup = ({
    item,
    isGroupCheck,
    handleGroupCheck,
    isCheck,
    handleCheck,
    handleIncrement,
    handleDecrement,
}) => {
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const deleteGroupURL = `${config.BASE_API_URL}/user/cart/selected-delete`;
    let newArr = isGroupCheck.map((str) => Number(str));

    const handleGroupDelete = () => {
        const groupIds = item?.items?.map((item) => Number(item.id));
        const data = {
            id: `[${groupIds}]`,
        };
        dispatch(deleteGroupItemsFromCart(groupIds));
        dispatch(
            deleteGroupItems({
                access_token,
                deleteGroupURL,
                method: "POST",
                data,
            })
        );
    };
    return (
        <View style={cartStyle.items}>
            <View style={cartStyle.itemsHeader}>
                <View style={cartStyle.deleteAllCont}>
                    <Checkbox
                        value={newArr.includes(Number(item.vendor_id))}
                        onValueChange={(e) =>
                            handleGroupCheck(e, Number(item.vendor_id))
                        }
                        color={"#2C2C2C"}
                        style={cartStyle.checkBoxSize}
                    />
                    <Text style={[cartStyle.deleteText, cartStyle.sellerName]}>
                        {item.vendor_name}
                    </Text>
                </View>
                <TouchableOpacity onPress={handleGroupDelete}>
                    <DeleteIcon
                        height={customPixel.h14}
                        width={customPixel.h14}
                        fill={"#898989"}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={item.items}
                renderItem={({ item }) => (
                    <SingleProduct
                        item={item}
                        isCheck={isCheck}
                        handleCheck={handleCheck}
                        handleIncrement={handleIncrement}
                        handleDecrement={handleDecrement}
                    />
                )}
                keyExtractor={(_, i) => "key" + i}
                showsVerticalScrollIndicator={false}
            />
            <View style={cartStyle.itemFooter}>
                <Text style={cartStyle.footerText}>
                    Estimated Time: 4-5 days
                </Text>
                <Text style={cartStyle.footerText}>Shipping Charge: $0.00</Text>
            </View>
        </View>
    );
};

export default SellerGroup;
