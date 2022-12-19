import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import React from "react";
import CommonStyles from "../../Utilities/CommonStyles/CommonStyles";
import { orderSummaryStyle } from "../OrderSummary/OrderSummaryStyle";
import { OrderIndicator } from "../OrderSummary/OrderSummary";
import SubtractIcon from "../../../assets/svgs/cart/subtract.svg";
import { orderConfirmedStyle } from "./OrderConfirmedStyle";
import { OrderDetailsStyle } from "../../Profile/OrderHistory/OrderDetails/OrderDetailsStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { EditProfileStyle } from "../../Profile/EditProfile/StyleEditProfile";
import CustomSpinner from "../../Utilities/CustomSpinner/CustomSpinner";
import { addNewAddressStyle } from "../../Profile/Address/AddNewAddress/AddNewAddressStyle";

const { width } = Dimensions.get("window");

let arr = [1, 2, 3, 4];

const OrderConfirmed = (props) => {
    return (
        <>
            <View style={CommonStyles.container}>
                <View style={CommonStyles.customHeaderContainer}>
                    <Text style={CommonStyles.headerName}>
                        {props.route.name.toUpperCase()}
                    </Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[CommonStyles.globalContainer]}>
                    <View style={orderSummaryStyle.indicatorCont}>
                        {["#33C172", "#33C172", "#33C172", "#33C172"].map(
                            (item, i) => (
                                <OrderIndicator key={`key${i}`} bg={item} />
                            )
                        )}
                    </View>
                    <View style={orderConfirmedStyle.topPosition}>
                        <Text style={orderConfirmedStyle.topIcon}>
                            <SubtractIcon />
                        </Text>
                        <Text style={orderConfirmedStyle.topText1}>
                            Thank you
                        </Text>
                        <Text style={orderConfirmedStyle.topText2}>
                            Your order has been received.
                        </Text>
                    </View>
                    <View
                        style={[
                            OrderDetailsStyle.deliveryCont,
                            {
                                backgroundColor: "#fff",
                                marginBottom: customPixel.h15,
                                borderWidth: 1,
                                borderColor: "#DFDFDF",
                            },
                        ]}
                    >
                        <View style={OrderDetailsStyle.deliverySubCont}>
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Invoice Number
                            </Text>
                            <Text style={orderConfirmedStyle.deliveryText2}>
                                INV-0004
                            </Text>
                        </View>
                        <View
                            style={[
                                OrderDetailsStyle.deliverySubCont,
                                {
                                    borderLeftWidth: 1,
                                    borderColor: "#B1B1B1",
                                },
                            ]}
                        >
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Grand Total
                            </Text>
                            <Text style={orderConfirmedStyle.deliveryText2}>
                                {"$244.50"}
                            </Text>
                        </View>
                    </View>
                    <View style={OrderDetailsStyle.deliveryCont}>
                        <View style={OrderDetailsStyle.deliverySubCont}>
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Shipping Method
                            </Text>
                            <Text style={OrderDetailsStyle.deliveryText2}>
                                Home Delivery
                            </Text>
                        </View>
                        <View
                            style={[
                                OrderDetailsStyle.deliverySubCont,
                                {
                                    borderLeftWidth: 1,
                                    borderColor: "#B1B1B1",
                                },
                            ]}
                        >
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Payment Status
                            </Text>
                            <Text style={OrderDetailsStyle.deliveryText2}>
                                {"Paid"}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[
                            OrderDetailsStyle.deliveryCont,
                            { marginTop: customPixel.h15 },
                        ]}
                    >
                        <View style={OrderDetailsStyle.deliverySubCont}>
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Order Date
                            </Text>
                            <Text style={OrderDetailsStyle.deliveryText2}>
                                27 Feb, 2022 at 8:01 pm
                            </Text>
                        </View>
                        <View
                            style={[
                                OrderDetailsStyle.deliverySubCont,
                                {
                                    borderLeftWidth: 1,
                                    borderColor: "#B1B1B1",
                                },
                            ]}
                        >
                            <Text style={OrderDetailsStyle.deliveryText1}>
                                Estimated Delivery
                            </Text>
                            <Text style={OrderDetailsStyle.deliveryText2}>
                                5-7 days (all items)
                            </Text>
                        </View>
                    </View>
                    <View style={OrderDetailsStyle.orderProductsCont}>
                        <Text style={OrderDetailsStyle.orderProductTitle}>
                            Ordered Products
                        </Text>
                        {arr.map((item, index) => (
                            <View key={`key` + index}>
                                <View
                                    style={[
                                        OrderDetailsStyle.singleProductCont,
                                        {
                                            borderBottomWidth:
                                                index === arr.length - 1
                                                    ? 0
                                                    : 1,
                                            paddingBottom:
                                                index === arr.length - 1
                                                    ? 0
                                                    : customPixel.h12,
                                            marginBottom:
                                                index === arr.length - 1
                                                    ? 0
                                                    : customPixel.h12,
                                        },
                                    ]}
                                >
                                    <View>
                                        <Text style={OrderDetailsStyle.name}>
                                            {
                                                /* item.name.slice(0, 20) || */
                                                "50ML Mount Eva-rest Backpack"
                                            }{" "}
                                            . . .
                                        </Text>
                                        <View style={OrderDetailsStyle.items}>
                                            <Text
                                                style={
                                                    OrderDetailsStyle.quantity
                                                }
                                            >
                                                {/* item.quantity || */ "1"} x
                                                Item
                                            </Text>
                                            <View
                                                style={OrderDetailsStyle.vrLine}
                                            />
                                            <Text
                                                style={
                                                    OrderDetailsStyle.quantity
                                                }
                                            >
                                                Backpackoo World
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={OrderDetailsStyle.name}>
                                            {/* item.price || */ "$65.00"}
                                        </Text>
                                    </View>
                                </View>
                                {/* {items.length !== index + 1 && (
                                    <View
                                        style={OrderDetailsStyle.hrLine}
                                    />
                                )} */}
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View style={EditProfileStyle.changeInfo}>
                <TouchableOpacity>
                    <Text style={EditProfileStyle.cancel}>View Details</Text>
                </TouchableOpacity>
                {false ? (
                    <View
                        style={{
                            width: (width - width * 0.051 - 30) / 2,
                            marginHorizontal: "auto",
                        }}
                    >
                        {/* will fix this section */}
                        <CustomSpinner
                            filePath={require("../../../assets/lottie/loader2.json")}
                            size={{
                                width: customPixel.h60,
                                height: customPixel.h50,
                            }}
                        />
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("my cart")}
                        style={addNewAddressStyle.saveAddressCont}
                    >
                        <Text style={addNewAddressStyle.saveAddressBtn}>
                            Back to Home
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
};

export default OrderConfirmed;
