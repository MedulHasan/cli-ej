import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import React from "react";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { orderSummaryStyle } from "./OrderSummaryStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomSpinner from "../../Utilities/CustomSpinner/CustomSpinner";
import { useDispatch } from "react-redux";
import config from "../../../config";
import { postOrders } from "../../../redux/slices/order/postOrders";
import useAuth from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const OrderSummary = (props) => {
    const navigation = useNavigation();
    const orderPostUrl = `${config.BASE_API_URL}/user/orders`;
    const { priceData, selectedProducts, shippingAddress } =
        props?.route?.params;
    const [couponText, setCouponText] = useState("");
    const { orderLoading } = useSelector((state) => state.postOrdersReducer);
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const handleProceedToCheckout = async () => {
        let products = [];
        let totalQuantity = 0;
        for (let item of selectedProducts) {
            products.push({
                id: item.id,
                type: item.type,
                variation: item.variation_meta,
                quantity: item.quantity,
                price: item.price,
                vendor_id: item.vendor_id,
                shop_id: item.shop_id,
                name: item.name,
                shipping_charge: item.shipping,
                tax_charge: item.tax_rate,
            });
            totalQuantity += parseInt(item.quantity);
        }
        const orderData = {
            address_id: shippingAddress.id,
            shipping_charge: 0,
            shipping_title: null,
            tax_charge: 0,
            other_discount_amount: 0,
            other_discount_type: null,
            total: priceData.totalPrice,
            total_quantity: totalQuantity,
            product: products,
            shipping_zone_shipping_class_id: null,
            shipping_zone_shipping_method_id: null,
        };
        const { payload: { message = {}, records } = {} } = await dispatch(
            postOrders({ access_token, orderPostUrl, orderData })
        );

        if (message === "OK") {
            navigation.navigate("payment webview", {
                message: message,
                url: records.route,
            });
        }
    };
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : ""}
                style={{ flex: 1 }}
            >
                <ScrollView nestedScrollEnabled={true}>
                    <View style={orderSummaryStyle.container}>
                        <View style={orderSummaryStyle.indicatorCont}>
                            {["#33C172", "#33C172", "#A9DFC1", "#DFDFDF"].map(
                                (item, i) => (
                                    <OrderIndicator key={`key${i}`} bg={item} />
                                )
                            )}
                        </View>
                        <Text style={orderSummaryStyle.allProducts}>
                            {`All Products (${selectedProducts.length})`}
                        </Text>
                        <View style={[{ maxHeight: customPixel.h180 }]}>
                            <ScrollView>
                                {selectedProducts.map((item, index) => (
                                    <RenderItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        length={selectedProducts.length - 1}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                        <View style={[orderSummaryStyle.productsContainer]}>
                            <View style={orderSummaryStyle.priceingCont}>
                                <Text style={orderSummaryStyle.price}>
                                    Subtotal
                                </Text>
                                <Text style={orderSummaryStyle.price}>
                                    {`$${priceData.totalPrice}`}
                                </Text>
                            </View>
                            <View style={orderSummaryStyle.priceingCont}>
                                <Text style={orderSummaryStyle.price}>
                                    Shipping
                                </Text>
                                <Text style={orderSummaryStyle.price}>$0</Text>
                            </View>
                            <View style={orderSummaryStyle.priceingCont}>
                                <Text style={orderSummaryStyle.price}>
                                    Coupon
                                </Text>
                                <Text style={orderSummaryStyle.price}>$0</Text>
                            </View>
                            <View style={orderSummaryStyle.priceingCont}>
                                <Text style={orderSummaryStyle.price}>
                                    VAT (15%)
                                </Text>
                                <Text style={orderSummaryStyle.price}>
                                    {`$${priceData.tax}`}
                                </Text>
                            </View>
                            <View
                                style={[
                                    orderSummaryStyle.priceingCont,
                                    orderSummaryStyle.grandTotal,
                                ]}
                            >
                                <Text style={orderSummaryStyle.price}>
                                    Grand Total
                                </Text>
                                <Text style={orderSummaryStyle.price}>
                                    {`$${
                                        priceData?.totalPrice + priceData?.tax
                                    }`}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={orderSummaryStyle.cuponText}>
                                Have a coupon? Apply Now.
                            </Text>
                            <View style={orderSummaryStyle.cuponInput}>
                                <TextInput
                                    style={orderSummaryStyle.input}
                                    placeholder='Type coupon code'
                                    onChangeText={(text) => setCouponText(text)}
                                />
                                <Text style={orderSummaryStyle.inputText}>
                                    Apply
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={orderSummaryStyle.checkoutCont}
                            onPress={handleProceedToCheckout}
                            disabled={orderLoading}
                        >
                            {orderLoading ? (
                                <CustomSpinner
                                    filePath={require("../../../assets/lottie/loader2.json")}
                                    size={{
                                        width: customPixel.h60,
                                        height: customPixel.h30,
                                    }}
                                />
                            ) : (
                                <Text style={orderSummaryStyle.checkoutText}>
                                    Proceed to Checkout
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default OrderSummary;

export const OrderIndicator = ({ bg }) => (
    <View style={[orderSummaryStyle.orderIndicator, { borderColor: bg }]} />
);

const RenderItem = ({ item, index, length }) => {
    return (
        <View
            style={[
                orderSummaryStyle.productCont,
                {
                    marginBottom: index === length ? 0 : customPixel.h10,
                },
            ]}
        >
            <Text style={[orderSummaryStyle.productName, { width: "75%" }]}>
                {`${
                    item.name.length > 25
                        ? `${item.name.substring(0, 25)}...`
                        : item.name
                } x ${item.quantity}`}
            </Text>
            <Text style={orderSummaryStyle.productName}>
                {`$${parseFloat(item.price).toFixed(2)}`}
            </Text>
        </View>
    );
};
