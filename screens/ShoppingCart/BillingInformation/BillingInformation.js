import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import CommonStyles from "../../Utilities/CommonStyles/CommonStyles";
import { orderSummaryStyle } from "../OrderSummary/OrderSummaryStyle";
import { OrderIndicator } from "../OrderSummary/OrderSummary";
import { billingInfoStyle } from "./BillingInformationStyle";
import AddressStyle from "../../Profile/Address/AddressStyle";
import EditIcon from "../../../assets/svgs/profile/edit profile.svg";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../../hooks/useAuth";
import { getMyAddress } from "../../../redux/slices/user/address/getMyAddress";
import { InOnScreenLoader } from "../ShoppingCart";
import { postOrders } from "../../../redux/slices/order/postOrders";
import config from "../../../config";
import CustomSpinner from "../../../screens/Utilities/CustomSpinner/CustomSpinner";
import { ScrollView } from "native-base";
import { writeReviewStyle } from "../../Home/FeaturedProducts/ProductDetails/RatingAndReviews/WriteReviews/WriteReviewsStyle";

const BillingInformation = (props) => {
    const dispatch = useDispatch();

    const {
        navigation,
        route: { params: { priceData, selectedProducts } = {} } = {},
    } = props;
    const { access_token } = useAuth();
    const { myAddresses, loading } = useSelector((state) => state.getMyAddress);

    const [defaultAddress, setDefaultAddress] = useState({});
    const [shippingAddress, setShippingAddress] = useState({});
    const [borderColor, setBorderColor] = useState(-1);

    const handleSelectAddress = ({ address, index }) => {
        setBorderColor(index);
        setShippingAddress(address);
    };
    useEffect(() => {
        let isMounted = true;
        if (isMounted && myAddresses?.length > 0) {
            for (let item of myAddresses) {
                if (item?.is_default) {
                    setDefaultAddress(item);
                    setShippingAddress(item);
                }
            }
        }
        return () => {
            isMounted = false;
        };
    }, [myAddresses]);
    useEffect(() => {
        let isMounted = true;
        if (isMounted && myAddresses?.length === 0) {
            dispatch(getMyAddress(access_token));
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    if (loading) {
        return <InOnScreenLoader />;
    }

    return (
        <>
            <View>
                <BackNavigation
                    navigationProps={navigation}
                    routeName={"Shipping Address"}
                    capitalize={false}
                />
                <View
                    style={{
                        ...CommonStyles.globalContainer,
                    }}
                >
                    <View style={orderSummaryStyle.indicatorCont}>
                        {["#33C172", "#A9DFC1", "#DFDFDF", "#DFDFDF"].map(
                            (item, i) => (
                                <OrderIndicator key={`key${i}`} bg={item} />
                            )
                        )}
                    </View>
                    <TouchableOpacity
                        style={[
                            billingInfoStyle.otherAddressCont,
                            {
                                marginTop: customPixel.h20,
                                borderStyle: "dashed",
                                borderColor: "#2C2C2C",
                            },
                        ]}
                        onPress={() =>
                            props.navigation.navigate("add new address", {
                                isUpdate: false,
                            })
                        }
                    >
                        <Text style={[billingInfoStyle.text, { marginTop: 0 }]}>
                            + Add New Address
                        </Text>
                    </TouchableOpacity>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            maxHeight: customPixel.hFull - customPixel.h260,
                        }}
                    >
                        {myAddresses?.length > 0 && (
                            <Text
                                style={{
                                    ...billingInfoStyle.text,
                                    marginBottom: customPixel.h20,
                                }}
                            >
                                Select Your Address
                            </Text>
                        )}
                        {Object.keys(defaultAddress)?.length > 0 && (
                            <>
                                <TouchableOpacity
                                    onPress={() =>
                                        handleSelectAddress({
                                            address: defaultAddress,
                                            index: -1,
                                        })
                                    }
                                >
                                    <View
                                        style={[
                                            AddressStyle.singleAddressCont,
                                            {
                                                borderColor:
                                                    borderColor === -1
                                                        ? "#FCCA19"
                                                        : "#DFDFDF",
                                                backgroundColor:
                                                    borderColor === -1
                                                        ? "#FEF8E7"
                                                        : "#FFFFFF",
                                            },
                                        ]}
                                    >
                                        <View style={AddressStyle.titleCont}>
                                            <Text style={AddressStyle.title}>
                                                Default Address
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    props.navigation.navigate(
                                                        "add new address",
                                                        {
                                                            isUpdate: true,
                                                            item: defaultAddress,
                                                            index: 0,
                                                        }
                                                    )
                                                }
                                            >
                                                <EditIcon
                                                    width={customPixel.w15}
                                                    height={customPixel.h17}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={[
                                                AddressStyle.titleCont,
                                                { marginTop: customPixel.h19 },
                                            ]}
                                        >
                                            <Text style={AddressStyle.name}>
                                                {(
                                                    `${defaultAddress?.first_name}` +
                                                    `${` `}` +
                                                    `${defaultAddress?.last_name}`
                                                ).length > 30
                                                    ? (
                                                          `${defaultAddress?.first_name}` +
                                                          `${` `}` +
                                                          `${defaultAddress?.last_name}`
                                                      ).slice(0, 30) + ` . . .`
                                                    : `${defaultAddress?.first_name}` +
                                                      `${` `}` +
                                                      `${defaultAddress?.last_name}`}
                                            </Text>
                                            <Text style={AddressStyle.name}>
                                                {defaultAddress?.phone}
                                            </Text>
                                        </View>
                                        <Text
                                            style={AddressStyle.address}
                                        >{`${defaultAddress?.address_1}. City: ${defaultAddress?.city}. Postcode: ${defaultAddress?.zip}. Country: ${defaultAddress?.country}`}</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}

                        {myAddresses?.length > 0 &&
                            myAddresses.map((address, index) => {
                                const {
                                    address_1,
                                    city,
                                    country,
                                    first_name,
                                    last_name,
                                    is_default,
                                    phone,
                                    zip,
                                    type_of_place,
                                } = address;

                                return (
                                    !is_default && (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() =>
                                                handleSelectAddress({
                                                    address,
                                                    index,
                                                })
                                            }
                                        >
                                            <View
                                                style={[
                                                    AddressStyle.singleAddressCont,
                                                    {
                                                        borderColor:
                                                            borderColor + 1 ===
                                                            index + 1
                                                                ? "#FCCA19"
                                                                : "#DFDFDF",
                                                        backgroundColor:
                                                            borderColor + 1 ===
                                                            index + 1
                                                                ? "#FEF8E7"
                                                                : "#FFFFFF",
                                                    },
                                                ]}
                                            >
                                                <View
                                                    style={
                                                        AddressStyle.titleCont
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            AddressStyle.title
                                                        }
                                                    >
                                                        {`Address ${
                                                            index + 1
                                                        } (${
                                                            type_of_place
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                            type_of_place.slice(
                                                                1
                                                            )
                                                        })`}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            props.navigation.navigate(
                                                                "add new address",
                                                                {
                                                                    isUpdate: true,
                                                                    item: address,
                                                                    index,
                                                                }
                                                            )
                                                        }
                                                    >
                                                        <EditIcon
                                                            width={
                                                                customPixel.w15
                                                            }
                                                            height={
                                                                customPixel.h17
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View
                                                    style={[
                                                        AddressStyle.titleCont,
                                                        {
                                                            marginTop:
                                                                customPixel.h19,
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            AddressStyle.name,
                                                            { width: "57%" },
                                                        ]}
                                                    >
                                                        {(
                                                            `${first_name}` +
                                                            `${` `}` +
                                                            `${last_name}`
                                                        ).length > 30
                                                            ? (
                                                                  `${first_name}` +
                                                                  `${` `}` +
                                                                  `${last_name}`
                                                              ).slice(0, 30) +
                                                              ` . . .`
                                                            : `${first_name}` +
                                                              `${` `}` +
                                                              `${last_name}`}
                                                    </Text>
                                                    <Text
                                                        style={[
                                                            AddressStyle.name,
                                                            {
                                                                width: "40%",
                                                                textAlign:
                                                                    "right",
                                                            },
                                                        ]}
                                                    >
                                                        {phone}
                                                    </Text>
                                                </View>
                                                <Text
                                                    style={AddressStyle.address}
                                                >{`${address_1}. City: ${city}. Postcode: ${zip}. Country: ${country}`}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                );
                            })}
                    </ScrollView>

                    <TouchableOpacity
                        style={orderSummaryStyle.checkoutCont}
                        onPress={() =>
                            props.navigation.navigate("order summary", {
                                priceData,
                                selectedProducts,
                                shippingAddress,
                            })
                        }
                        disabled={myAddresses?.length === 0}
                    >
                        <Text style={orderSummaryStyle.checkoutText}>
                            Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default BillingInformation;
