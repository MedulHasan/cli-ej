import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { cartStyle } from "./shoppingCartStyle";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import DeleteIcon from "../../assets/svgs/my wishlist/delete icon.svg";
import MinusIcon from "../../assets/svgs/cart/minus.svg";
import PlusIcon from "../../assets/svgs/cart/plus.svg";
import Checkbox from "expo-checkbox";
import { useDispatch } from "react-redux";
import { deleteItemFromCart } from "../../redux/slices/cart/getCartProducts";
import { deleteSingleItem } from "../../redux/slices/cart/deleteCartItem/deleteSingleItem";
import useAuth from "../../hooks/useAuth";
import config from "../../config";

const SingleProduct = ({
    item,
    isCheck,
    handleCheck,
    handleIncrement,
    handleDecrement,
}) => {
    const { access_token } = useAuth();
    const deleteURL = `${config.BASE_API_URL}/user/cart/delete`;
    let newIsCheck = isCheck.map((str) => Number(str));
    const { variation_meta, id, vendor_id, index, quantity, price } =
        item || {};
    let variationMeta;
    if (variation_meta?.length > 0) {
        variationMeta = JSON.parse(variation_meta.replace(/\\/g, ""));
    }
    const dispatch = useDispatch();
    const handleDelete = () => {
        const data = {
            cartIndex: index,
        };
        handleCheck(false, Number(id), Number(vendor_id));
        dispatch(deleteItemFromCart(index));
        dispatch(
            deleteSingleItem({ access_token, deleteURL, method: "POST", data })
        );
    };
    return (
        <View style={cartStyle.singleItemCont}>
            <View style={cartStyle.singleItem}>
                <View style={cartStyle.itemLeftCont}>
                    <Checkbox
                        value={newIsCheck.includes(item.id)}
                        onValueChange={(e) =>
                            handleCheck(e, Number(id), Number(vendor_id))
                        }
                        color={"#2C2C2C"}
                        style={cartStyle.checkBoxSize}
                    />
                    <View style={cartStyle.imgCont}>
                        <Image
                            style={cartStyle.img}
                            source={{ uri: item.photo }}
                        />
                    </View>
                </View>
                <View style={cartStyle.itemRightCont}>
                    <View style={cartStyle.itemInfo}>
                        <Text style={cartStyle.itemName}>{item.name}</Text>
                        {item.type === "Variable Product" && (
                            <Text style={cartStyle.itemSize}>
                                {Object.keys(variationMeta)?.map(
                                    (meta, i) =>
                                        `${meta}: ${variationMeta[meta]} ${
                                            i ===
                                            Object.keys(variationMeta)?.length -
                                                1
                                                ? ""
                                                : "|"
                                        } `
                                )}
                            </Text>
                        )}
                        <Text
                            style={[
                                cartStyle.itemName,
                                {
                                    fontSize: customPixel.h10,
                                    marginTop: customPixel.h4,
                                },
                            ]}
                        >
                            {`$${parseFloat(item.price).toFixed(3)}`}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleDelete}>
                        <DeleteIcon
                            height={customPixel.h14}
                            width={customPixel.h14}
                            fill={"#898989"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={cartStyle.qtyCont}>
                <View style={cartStyle.incDecCont}>
                    <View style={cartStyle.chechBox} />
                    <View style={cartStyle.incDec}>
                        <TouchableOpacity
                            style={[cartStyle.inc]}
                            onPress={() => handleDecrement(id)}
                        >
                            <MinusIcon fill={"#2C2C2C"} />
                        </TouchableOpacity>
                        <View style={[cartStyle.inc, { width: 4 }]}>
                            <Text style={cartStyle.hr} />
                        </View>
                        <TouchableOpacity
                            style={cartStyle.inc}
                            onPress={() => handleIncrement(id)}
                        >
                            <PlusIcon fill={"#2C2C2C"} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={[cartStyle.itemRightCont, { alignItems: "center" }]}
                >
                    <Text style={cartStyle.qty}>Qty: {quantity}</Text>
                    <Text
                        style={[cartStyle.qty, { fontSize: customPixel.h12 }]}
                    >
                        ${parseFloat(price * quantity).toFixed(2)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default SingleProduct;
