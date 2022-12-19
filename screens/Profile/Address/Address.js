import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    LogBox,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DefaultAddressIcon from "../../../assets/svgs/address/defaultAddress.svg";
import NoContentIcon from "../../../assets/svgs/empty content/noAddress";
import EditIcon from "../../../assets/svgs/profile/edit profile.svg";
import config from "../../../config";
import useAuth from "../../../hooks/useAuth";
import {
    fetchAddressStart,
    getMyAddress,
    getMyAddressWithoutLoading,
} from "../../../redux/slices/user/address/getMyAddress";
import { postNewAddress } from "../../../redux/slices/user/address/postNewAddress";
import { getUserInfo } from "../../../redux/slices/user/util/fetchUserInfo";
import { refresh } from "../../../redux/slices/user/util/refresh";
import AddressSkeleton from "../../../src/skeletons/screens/profile/AddressSkeleton";
import { InOnScreenLoader } from "../../ShoppingCart/ShoppingCart";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import EmptyContent from "../../Utilities/EmptyContent/EmptyContent";
import { ProfileStyles } from "../ProfileStyle";
import AddressStyle from "./AddressStyle";

const Address = (props) => {
    const dispatch = useDispatch();
    LogBox.ignoreLogs([
        "Non-serializable values were found in the navigation state",
    ]);
    const { anotherAddress, handleProceedToCheckout } =
        props?.route?.params || {};
    const { myAddresses, loading, isRefresh } = useSelector(
        (state) => state.getMyAddress
    );
    const { access_token } = useAuth();
    const URL = `${config.BASE_API_URL}/user/addresses`;

    const [showLottieAnimation, setShowLottieAnimation] = useState({
        id: null,
        isLoading: false,
    });
    const { orderLoading } = useSelector((state) => state.postOrdersReducer);
    useEffect(() => {
        let isMounted = true;
        if (isMounted && myAddresses?.length === 0) {
            dispatch(getMyAddress(access_token));
        }
        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    const onRefresh = () => {
        refresh(
            access_token,
            URL,
            dispatch,
            fetchAddressStart,
            getUserInfo,
            getMyAddressWithoutLoading
        );
    };

    const handleMakeDefaultAddress = async (item) => {
        setShowLottieAnimation({
            id: item.id,
            isLoading: true,
        });
        const URLFORPUT = `${config.BASE_API_URL}/user/address/update`;
        const address = { ...item, is_default: 1 };
        let newAddress = await dispatch(
            postNewAddress({
                access_token,
                URL: URLFORPUT,
                method: "POST",
                address,
            })
        );
        if (newAddress.payload.records.length === 0) {
            let data = await getUserInfo(access_token, URL);
            dispatch(getMyAddressWithoutLoading(data));
        }
        setShowLottieAnimation({
            id: item.id,
            isLoading: false,
        });
    };

    const SingleAddress = ({
        item,
        index,
        anotherAddress,
        handleProceedToCheckout,
    }) => {
        const {
            first_name,
            last_name,
            phone,
            address_1,
            city,
            country,
            is_default,
            zip,
            type_of_place,
        } = item;
        const handleOrder = () => {
            Alert.alert(
                "Confirm Shipping Address?",
                "Are you sure confirm this address for shipping",
                [
                    {
                        text: "Yes",
                        onPress: () => {
                            handleProceedToCheckout();
                        },
                    },
                    {
                        text: "No",
                        onPress: () => {},
                    },
                ]
            );
        };
        return (
            <>
                {anotherAddress ? (
                    !is_default && (
                        <TouchableOpacity
                            disabled={orderLoading}
                            onPress={handleOrder}
                        >
                            <View
                                style={[
                                    AddressStyle.singleAddressCont,
                                    {
                                        borderColor: is_default
                                            ? "#FCCA19"
                                            : "#DFDFDF",
                                        backgroundColor: is_default
                                            ? "#FEF8E7"
                                            : "#FFFFFF",
                                    },
                                ]}
                            >
                                <View style={AddressStyle.titleCont}>
                                    <Text style={AddressStyle.title}>
                                        {`Address ${index + 1} (${
                                            type_of_place
                                                .charAt(0)
                                                .toUpperCase() +
                                            type_of_place.slice(1)
                                        })`}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.navigation.navigate(
                                                "add new address",
                                                {
                                                    isUpdate: true,
                                                    item,
                                                    index,
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
                                    <Text
                                        style={[
                                            AddressStyle.name,
                                            { width: "57%" },
                                        ]}
                                    >
                                        {first_name} {last_name}
                                    </Text>
                                    <Text
                                        style={[
                                            AddressStyle.name,
                                            {
                                                width: "40%",
                                                textAlign: "right",
                                            },
                                        ]}
                                    >
                                        {phone}
                                    </Text>
                                </View>
                                <Text
                                    style={AddressStyle.address}
                                >{`${address_1}. City: ${city}. Postcode: ${zip}. Country: ${country}`}</Text>
                                {!anotherAddress &&
                                    (is_default ? (
                                        <View style={AddressStyle.default}>
                                            <DefaultAddressIcon
                                                width={customPixel.h14}
                                                height={customPixel.h14}
                                            />
                                            <Text
                                                style={AddressStyle.defaultText}
                                            >
                                                Used as default address
                                            </Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleMakeDefaultAddress(item)
                                            }
                                            style={AddressStyle.default}
                                        >
                                            <Text
                                                style={AddressStyle.makeDefault}
                                            >
                                                Make as default address
                                            </Text>
                                            {showLottieAnimation.id ===
                                                item.id &&
                                                showLottieAnimation.isLoading && (
                                                    <LottieView
                                                        source={require("../../../assets/lottie/loader.json")}
                                                        autoPlay
                                                        style={{
                                                            height: customPixel.h45,
                                                            width: customPixel.h40,
                                                        }}
                                                    />
                                                )}
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </TouchableOpacity>
                    )
                ) : (
                    <View
                        style={[
                            AddressStyle.singleAddressCont,
                            {
                                borderColor: is_default ? "#FCCA19" : "#DFDFDF",
                                backgroundColor: is_default
                                    ? "#FEF8E7"
                                    : "#FFFFFF",
                            },
                        ]}
                    >
                        <View style={AddressStyle.titleCont}>
                            <Text style={AddressStyle.title}>
                                {`Address ${index + 1} (${
                                    type_of_place.charAt(0).toUpperCase() +
                                    type_of_place.slice(1)
                                })`}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate(
                                        "add new address",
                                        {
                                            isUpdate: true,
                                            item,
                                            index,
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
                            <Text style={[AddressStyle.name, { width: "57%" }]}>
                                {first_name} {last_name}
                            </Text>
                            <Text
                                style={[
                                    AddressStyle.name,
                                    {
                                        width: "40%",
                                        textAlign: "right",
                                    },
                                ]}
                            >
                                {phone}
                            </Text>
                        </View>
                        <Text
                            style={AddressStyle.address}
                        >{`${address_1}. City: ${city}. Postcode: ${zip}. Country: ${country}`}</Text>
                        {is_default ? (
                            <View style={AddressStyle.default}>
                                <DefaultAddressIcon
                                    width={customPixel.h14}
                                    height={customPixel.h14}
                                />
                                <Text style={AddressStyle.defaultText}>
                                    Used as default address
                                </Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => handleMakeDefaultAddress(item)}
                                style={AddressStyle.default}
                            >
                                <Text style={AddressStyle.makeDefault}>
                                    Make as default address
                                </Text>
                                {showLottieAnimation.id === item.id &&
                                    showLottieAnimation.isLoading && (
                                        <LottieView
                                            source={require("../../../assets/lottie/loader.json")}
                                            autoPlay
                                            style={{
                                                height: customPixel.h45,
                                                width: customPixel.h40,
                                            }}
                                        />
                                    )}
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </>
        );
    };

    return (
        <>
            {orderLoading && <InOnScreenLoader />}
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <TouchableOpacity
                style={AddressStyle.btnContainer}
                onPress={() =>
                    props.navigation.navigate("add new address", {
                        isUpdate: false,
                    })
                }
            >
                {!anotherAddress && (
                    <Text style={AddressStyle.btnText}>+ Add New Address</Text>
                )}
            </TouchableOpacity>
            {loading ? (
                <AddressSkeleton />
            ) : (
                <View style={AddressStyle.container}>
                    {myAddresses?.length > 0 ? (
                        <FlatList
                            data={myAddresses}
                            renderItem={({ item, index }) => (
                                <SingleAddress
                                    item={item}
                                    index={index}
                                    anotherAddress={anotherAddress}
                                    handleProceedToCheckout={
                                        handleProceedToCheckout
                                    }
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            refreshing={isRefresh}
                            onRefresh={onRefresh}
                            showsVerticalScrollIndicator={false}
                        />
                    ) : (
                        <FlatList
                            refreshing={isRefresh}
                            onRefresh={onRefresh}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => (
                                <EmptyContent
                                    Icon={NoContentIcon}
                                    text={"No Address Has Been Fixed"}
                                />
                            )}
                        />
                    )}
                </View>
            )}
        </>
    );
};

export default Address;
