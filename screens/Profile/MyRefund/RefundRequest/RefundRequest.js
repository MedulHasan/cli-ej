import { useToast } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { isArray } from "underscore";
import DownIcon from "../../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../../assets/svgs/dropdown/up.svg";
import ImgUpload from "../../../../assets/svgs/refund/imgUpload.svg";
import config from "../../../../config";
import useAuth from "../../../../hooks/useAuth";
import { getMyRefunds } from "../../../../redux/slices/user/myRefund/getMyRefunds";
import { postNewRefund } from "../../../../redux/slices/user/myRefund/postUpdateRefund";
import { getMyOrders } from "../../../../redux/slices/user/orderHistory/getOrderHistory";
import { getUserInfo } from "../../../../redux/slices/user/util/fetchUserInfo";
import RequestRefundSkeleton from "../../../../src/skeletons/screens/profile/refund/RequestRefundSkeleton";
import BackNavigation from "../../../Utilities/CustomHeader/BackNavigation";
import { selectDropdownStyle } from "../../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import CustomSpinner from "../../../Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";
import {
    CustomToast,
    errorToase,
    successToase,
} from "../../../Utilities/CustomToast/CustomToast";
import { uploadImages } from "../../../Utilities/UploadImages/UploadImages";
import { ProfileStyles } from "../../ProfileStyle";
import { MyRefundStyle } from "../MyRefundStyle";
import { refundStyle } from "./RefundRequestStyle";
import { handleProduct } from "./rrfunctions/handleProduct";

const RefundRequest = (props) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { loading } = useSelector((state) => state.postUpdateRefund);
    const initialState = {
        invoice_id: "",
        order_detail_id: "",
        quantity: "",
        reason: "",
        image: {},
        is_default: 0,
    };
    const errorText = {
        invoice_id: false,
        order_detail_id: false,
        quantity: false,
        reason: false,
        images: false,
    };
    const [refundRequest, setRefundRequest] = useState(initialState);
    const [error, setError] = useState(errorText);
    const resetOrderIdRef = useRef({});
    const resetProductNameRef = useRef({});
    const resetQuantityRef = useRef({});
    const resetReasonRef = useRef({});
    const { myOrders, loading: orderLoading } = useSelector(
        (state) => state.getMyOrdersSlice
    );
    const { order_detail_id, invoice_id, quantity, reason } = refundRequest;
    const [orders, setOrders] = useState([]);
    const { access_token } = useAuth();
    const [images, setImages] = useState([]);
    const [reasons, setReasons] = useState([]);
    const [products, setProducts] = useState([]);
    const [numberOfQuantity, setNumberOfQuantity] = useState([]);
    const pickImage = async () => {
        const image = await uploadImages(images?.images);
        if (Object.keys(image).length > 0) {
            setImages([...images, image]);

            setRefundRequest({
                ...refundRequest,
                image: image,
            });
        }
    };
    const urlPost = `${config.BASE_API_URL}/user/refunds`;
    const UrlGet = `${config.BASE_API_URL}/user/refunds`;
    useEffect(async () => {
        let isMounted = true;
        if (isMounted && myOrders?.length === 0) {
            const URL = `${config.BASE_API_URL}/user/orders`;
            const r = await dispatch(getMyOrders({ access_token, URL }));
        }
        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        if (myOrders?.length > 0) {
            let allOrders = [];
            for (let orders of myOrders) {
                if (orders?.payment_status === "Paid") {
                    allOrders.push(orders);
                }
            }
            setOrders(allOrders);
        }
    }, [myOrders]);
    useEffect(async () => {
        let isMounted = true;
        if (isMounted) {
            const URL = `${config.BASE_API_URL}/user/refunds/reasons`;
            const reasons = await getUserInfo(access_token, URL);
            let allReason = [];
            for (let reason of reasons) {
                allReason.push(reason);
            }
            setReasons(allReason);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const handleRefundRequestInfo = (name, text) => {
        if (name === "invoice_id") {
            setRefundRequest({
                ...refundRequest,
                [name]: text,
                quantity: "",
                order_detail_id: "",
            });
        } else if (name === "quantity") {
            setRefundRequest({ ...refundRequest, [name]: text });
        } else if (name === "order_detail_id") {
            setRefundRequest({ ...refundRequest, [name]: text });
        } else if (name === "reason") {
            setRefundRequest({ ...refundRequest, [name]: text });
        } else if (name === "image") {
            setRefundRequest({
                ...refundRequest,
                [image]: text,
            });
        } else {
            setRefundRequest({
                ...refundRequest,
                [name]: text,
            });
        }
    };

    const handleProductQuantity = async (id) => {
        if (products.length > 0) {
            const is_Exits_Product = await products.find(
                (product) => product.product_id === id
            );
            if (is_Exits_Product?.refunds.length > 0) {
                let totalQuantity = 0;

                for (let refund in is_Exits_Product?.refunds) {
                    const previousQuantity = is_Exits_Product?.refunds[refund];
                    totalQuantity += parseInt(previousQuantity.quantity);
                }

                let number = [];
                for (
                    let quantity = 1;
                    quantity <=
                    parseInt(is_Exits_Product?.quantity) - totalQuantity;
                    quantity++
                ) {
                    number.push(quantity);
                }
                return setNumberOfQuantity(number);
            } else {
                if (is_Exits_Product) {
                    const number = [];
                    for (
                        let quantity = 1;
                        quantity <= is_Exits_Product?.quantity;
                        quantity++
                    ) {
                        number.push(quantity);
                    }
                    return setNumberOfQuantity(number);
                }
            }
        }
    };
    const handleValidationError = () => {
        const order = order_detail_id === "" ? true : false;
        const invoice = invoice_id === "" ? true : false;
        const quantity_item = quantity === "" ? true : false;
        const reason_id = reason === "" ? true : false;
        setError({
            ...error,
            order_detail_id: order,
            invoice_id: invoice,
            quantity: quantity_item,
            reason: reason_id,
        });
    };
    const handleRefundRequest = async () => {
        refundRequest.is_default = refundRequest?.is_default ? 0 : 1;
        if (order_detail_id && invoice_id && quantity && reason) {
            const { order_detail_id, quantity, reason, image } = refundRequest;
            let formData = new FormData();
            formData.append("order_detail_id", order_detail_id);
            formData.append("quantity_sent", quantity);
            formData.append("refund_reason_id", reason);
            Object.keys(image).length === 3 && formData.append("image", image);
            let data = {
                access_token,
                urlPost,
                method: "POST",
                formData,
            };
            let newAdd = await dispatch(postNewRefund(data));
            let { code } = newAdd?.payload?.status;
            let { message } = newAdd?.payload?.records;
            if (code === 200) {
                CustomToast(toast, message, successToase);
                setRefundRequest(initialState);
                setError(errorText);
                resetOrderIdRef.current.reset();
                resetProductNameRef.current.reset();
                resetQuantityRef.current.reset();
                resetReasonRef.current.reset("");
                props.navigation.goBack();
                await dispatch(getMyRefunds({ access_token, URL: UrlGet }));
            } else {
                CustomToast(toast, message, errorToase);
            }
        } else {
            handleValidationError();
        }
    };
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <View style={ProfileStyles.hrLine} />
            {orderLoading ? (
                <RequestRefundSkeleton />
            ) : myOrders?.length === 0 && !orderLoading && isArray(myOrders) ? (
                <View style={MyRefundStyle.noRefund}>
                    <Text style={MyRefundStyle.noRefundText}>
                        There Have No Products For Refund
                    </Text>
                </View>
            ) : (
                <>
                    <ScrollView>
                        <View style={refundStyle.container}>
                            <View style={refundStyle.inputCont}>
                                <Text style={refundStyle.label}>
                                    Select Order Number
                                </Text>

                                <SelectDropdown
                                    data={orders}
                                    ref={resetOrderIdRef}
                                    onSelect={(selectedItem) => {
                                        if (selectedItem?.order_key) {
                                            handleProduct(
                                                selectedItem?.id,
                                                setProducts,
                                                myOrders
                                            );
                                            setProducts([]);
                                            setNumberOfQuantity([]);
                                            handleRefundRequestInfo(
                                                "invoice_id",
                                                selectedItem.id
                                            );
                                            setError({
                                                ...error,
                                                invoice_id: false,
                                            });
                                        }
                                    }}
                                    defaultButtonText={"Choose option"}
                                    buttonTextAfterSelection={(
                                        selectedItem
                                    ) => {
                                        if (selectedItem?.order_key) {
                                            return selectedItem?.order_key;
                                        } else if (
                                            selectedItem?.quantity &&
                                            defaultButtonText ===
                                                "Choose option"
                                        ) {
                                            return selectedItem.quantity;
                                        } else {
                                            return selectedItem.name;
                                        }
                                    }}
                                    rowTextForSelection={(item) => {
                                        if (item?.order_key) {
                                            return item.order_key;
                                        } else if (
                                            item?.quantity &&
                                            defaultButtonText ===
                                                "Choose option"
                                        ) {
                                            return item.quantity;
                                        } else {
                                            return item.name;
                                        }
                                    }}
                                    buttonStyle={{
                                        ...refundStyle.dropdown1BtnStyle,
                                        borderColor: error.order_detail_id
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    }}
                                    buttonTextStyle={
                                        selectDropdownStyle.dropdown1BtnTxtStyle
                                    }
                                    renderDropdownIcon={(isOpened) => {
                                        return isOpened ? (
                                            <UpIcon />
                                        ) : (
                                            <DownIcon />
                                        );
                                    }}
                                    dropdownIconPosition={"right"}
                                    dropdownStyle={
                                        selectDropdownStyle.dropdown1DropdownStyle
                                    }
                                    rowStyle={
                                        selectDropdownStyle.dropdown1RowStyle
                                    }
                                    rowTextStyle={
                                        selectDropdownStyle.dropdown1RowTxtStyle
                                    }
                                />
                            </View>
                            <View style={refundStyle.inputCont}>
                                <Text style={refundStyle.label}>
                                    Select Product
                                </Text>

                                <SelectDropdown
                                    data={products}
                                    ref={resetProductNameRef}
                                    disabled={
                                        products.length === 0 ? true : false
                                    }
                                    onSelect={(selectedItem) => {
                                        handleProductQuantity(
                                            selectedItem.product_id
                                        );
                                        setNumberOfQuantity([]);

                                        handleRefundRequestInfo(
                                            "order_detail_id",
                                            selectedItem.id
                                        );
                                        setError({
                                            ...error,
                                            order_detail_id: false,
                                        });
                                    }}
                                    defaultButtonText={"Zoopie XL Sneakers"}
                                    buttonTextAfterSelection={(
                                        selectedItem
                                    ) => {
                                        return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item.name;
                                    }}
                                    buttonStyle={{
                                        ...refundStyle.dropdown1BtnStyle,
                                        borderColor: error.invoice_id
                                            ? "#E43147"
                                            : "#DFDFDF",
                                        backgroundColor:
                                            products.length === 0
                                                ? "#DFDFDF"
                                                : "#ffffff",
                                    }}
                                    buttonTextStyle={
                                        selectDropdownStyle.dropdown1BtnTxtStyle
                                    }
                                    renderDropdownIcon={(isOpened) => {
                                        return isOpened ? (
                                            <UpIcon />
                                        ) : (
                                            <DownIcon />
                                        );
                                    }}
                                    dropdownIconPosition={"right"}
                                    dropdownStyle={
                                        selectDropdownStyle.dropdown1DropdownStyle
                                    }
                                    rowStyle={
                                        selectDropdownStyle.dropdown1RowStyle
                                    }
                                    rowTextStyle={
                                        selectDropdownStyle.dropdown1RowTxtStyle
                                    }
                                />
                            </View>
                            <View style={refundStyle.inputCont}>
                                <Text style={refundStyle.label}>
                                    Select Quantity
                                </Text>
                                <SelectDropdown
                                    data={numberOfQuantity}
                                    ref={resetQuantityRef}
                                    disabled={
                                        numberOfQuantity.length === 0
                                            ? true
                                            : false
                                    }
                                    onSelect={(selectedItem) => {
                                        handleRefundRequestInfo(
                                            "quantity",
                                            selectedItem
                                        );
                                        setError({
                                            ...error,
                                            quantity: false,
                                        });
                                    }}
                                    defaultButtonText={"Choose option"}
                                    buttonTextAfterSelection={(
                                        selectedItem
                                    ) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item;
                                    }}
                                    buttonStyle={{
                                        ...refundStyle.dropdown1BtnStyle,
                                        borderColor: error.quantity
                                            ? "#E43147"
                                            : "#DFDFDF",
                                        backgroundColor:
                                            numberOfQuantity.length === 0
                                                ? "#DFDFDF"
                                                : "#ffffff",
                                    }}
                                    buttonTextStyle={
                                        selectDropdownStyle.dropdown1BtnTxtStyle
                                    }
                                    renderDropdownIcon={(isOpened) => {
                                        return isOpened ? (
                                            <UpIcon />
                                        ) : (
                                            <DownIcon />
                                        );
                                    }}
                                    dropdownIconPosition={"right"}
                                    dropdownStyle={
                                        selectDropdownStyle.dropdown1DropdownStyle
                                    }
                                    rowStyle={
                                        selectDropdownStyle.dropdown1RowStyle
                                    }
                                    rowTextStyle={
                                        selectDropdownStyle.dropdown1RowTxtStyle
                                    }
                                />
                            </View>
                            <View style={refundStyle.inputCont}>
                                <Text style={refundStyle.label}>
                                    Select Your Reason
                                </Text>

                                <SelectDropdown
                                    data={reasons}
                                    ref={resetReasonRef}
                                    onSelect={(selectedItem) => {
                                        handleRefundRequestInfo(
                                            "reason",
                                            selectedItem.id
                                        );
                                        setError({
                                            ...error,
                                            reason: false,
                                        });
                                    }}
                                    defaultButtonText={"e.g, damaged product"}
                                    buttonTextAfterSelection={(
                                        selectedItem
                                    ) => {
                                        return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item.name;
                                    }}
                                    buttonStyle={{
                                        ...refundStyle.dropdown1BtnStyle,
                                        borderColor: error.reason
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    }}
                                    buttonTextStyle={
                                        selectDropdownStyle.dropdown1BtnTxtStyle
                                    }
                                    renderDropdownIcon={(isOpened) => {
                                        return isOpened ? (
                                            <UpIcon />
                                        ) : (
                                            <DownIcon />
                                        );
                                    }}
                                    dropdownIconPosition={"right"}
                                    dropdownStyle={
                                        selectDropdownStyle.dropdown1DropdownStyle
                                    }
                                    rowStyle={
                                        selectDropdownStyle.dropdown1RowStyle
                                    }
                                    rowTextStyle={
                                        selectDropdownStyle.dropdown1RowTxtStyle
                                    }
                                />
                            </View>
                            <View style={refundStyle.inputCont}>
                                <Text
                                    style={[
                                        refundStyle.label,
                                        { textAlign: "center" },
                                    ]}
                                >
                                    Images of the Product
                                </Text>
                                {images && (
                                    <View style={refundStyle.imgContainer}>
                                        {images.map((img, i) => {
                                            return (
                                                <View key={i}>
                                                    <Image
                                                        style={
                                                            refundStyle.imgStyle
                                                        }
                                                        source={{
                                                            uri: img.uri,
                                                        }}
                                                    ></Image>
                                                </View>
                                            );
                                        })}
                                    </View>
                                )}
                                <TouchableOpacity
                                    style={refundStyle.imgUp}
                                    onPress={pickImage}
                                >
                                    <ImgUpload
                                        width={customPixel.h65}
                                        height={customPixel.h65}
                                    />
                                </TouchableOpacity>
                                <Text style={refundStyle.imgText}>
                                    Upload Images
                                </Text>

                                <Text
                                    style={[
                                        refundStyle.imgText,
                                        { marginTop: 2 },
                                    ]}
                                >
                                    One of the product and another of the
                                    receipt papers.
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View>
                        <TouchableOpacity
                            style={
                                loading
                                    ? MyRefundStyle.requestRefundLoading
                                    : MyRefundStyle.requestRefund
                            }
                            disabled={loading ? true : false}
                            onPress={handleRefundRequest}
                        >
                            {loading ? (
                                <CustomSpinner
                                    filePath={require("../../../../assets/lottie/loader2.json")}
                                    size={{
                                        width: customPixel.h60,
                                        height: customPixel.h40,
                                    }}
                                />
                            ) : (
                                <Text style={MyRefundStyle.requestText}>
                                    Send Request
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </>
    );
};

export default RefundRequest;
