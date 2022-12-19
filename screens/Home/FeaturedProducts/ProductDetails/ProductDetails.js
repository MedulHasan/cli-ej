import { View, ScrollView, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState, useEffect } from "react";
import { productDetailsStyle } from "./ProductDetailsStyle";
import BackNavigation from "../../../Utilities/CustomHeader/BackNavigation";
import ItemCarousel from "./ItemCarousel/ItemCarousel";
import ItemDetails from "./ItemDetails/ItemDetails";
import RatingAndReviews from "../ProductDetails/RatingAndReviews/RatingAndReviews";
import ItemOwner from "./ItemOwner/ItemOwner";
import { EditProfileStyle } from "../../../Profile/EditProfile/StyleEditProfile";
import AddToCart from "../../../../assets/svgs/product details/addtocart.svg";
import CustomSpinner from "../../../Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";
import RelatedItem from "./RelatedItem/RelatedItem";
import ItemQuantity from "./ItemQuantity/ItemQuantity";
import ShareNwishlist from "./ShareNwishlist/ShareNwishlist";
import { useDispatch, useSelector } from "react-redux";
import { dataProcessing, matchVariation } from "./utils/dataProcess";
import { setIsItemModalVisible } from "../../../../redux/slices/featureProducts/items/toastModal";
import Notify from "../../../Utilities/Modal/Notify";
import config from "../../../../config";
import { fetchGetItem } from "../../../../redux/slices/util/fetchGetItem";
import ProductDetailsSkeleton from "../../../../src/skeletons/screens/home/ProductDetailsSkeleton";
import ItemDescription from "./ItemDescription/ItemDescription";
import DeliveryOptions from "./DeliveryOptions/DeliveryOptions";
import { storeItemInCart } from "../../../../redux/slices/cart/storeItemInCart";
import useAuth from "../../../../hooks/useAuth";
import { getProductDetails } from "../../../../redux/slices/user/util/fetchUserInfo";

const ProductDetails = (props) => {
    const { route: { params: { slug } = {} } = {} } = props;
    const productDetailsUrl = `${config.BASE_API_URL}/user/product/${slug}`;
    const previousRouteName = props.route.params?.thisRouteName || "";
    const storeItemInCartUrl = `${config.BASE_API_URL}/user/cart/store`;
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const routeName = props?.route?.name;
    const variationData = useSelector((state) => state.itemVariationReducer);
    const { isItemModalVisible } = useSelector(
        (state) => state.toastModalReducer
    );
    const { cartLoading, totalProduct } = useSelector(
        (state) => state.storeItemInCartSlice
    );
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState({
        regularPrice: null,
        salePrice: null,
    });
    const [findVariation, setFindVariation] = useState({
        code: "",
        variation_id: "",
    });
    const [loading, setLoading] = useState(true);
    const [isValue, setIsValue] = useState(false);
    const [variations, setVariation] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [vendor, setVendor] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const {
        data: {
            id,
            code,
            type,
            reviews_allowed,
            vendor_id,
            related_ids,
            stock_quantity,
            manage_stocks,
            stock_status,
            backorders,
            is_wishlisted,
        } = {},
    } = productDetails;

    const [bgColor, setBGColor] = useState(false);
    useEffect(() => {
        if (type == "Simple Product") {
            x();
        } else if (type == "Variable Product") {
            if (isValue) {
                x();
            } else if (!isValue) {
                setBGColor(false);
            }
        }
        function x() {
            if (manage_stocks == 1) {
                if (backorders == 0) {
                    if (stock_quantity > 0) {
                        setBGColor(true);
                    } else if (stock_quantity == 0) {
                        setBGColor(false);
                    }
                } else if (backorders == 1) {
                    setBGColor(true);
                }
            } else if (manage_stocks == 0) {
                if (stock_status != "Out Of Stock") {
                    setBGColor(true);
                } else if (stock_status == "Out Of Stock") {
                    setBGColor(false);
                }
            }
        }
    }, [isValue, productDetails?.data?.id]);

    useEffect(async () => {
        let isMounted = true;
        if (vendor_id && isMounted) {
            let URL = `${config.BASE_API_URL}/vendor/${vendor_id}`;
            let result = await fetchGetItem(URL);
            if (result?.response?.status?.code == 200) {
                setVendor(result?.response?.records?.data);
            }
        }
        return () => {
            isMounted = false;
        };
    }, [vendor_id]);
    useEffect(async () => {
        let isMounted = true;
        if (isMounted) {
            if (related_ids?.length > 0) {
                let relatedAllIds = "?product_ids=";

                related_ids.forEach((id) => {
                    relatedAllIds = relatedAllIds + `${id},`;
                });
                let URL = `${
                    config.BASE_API_URL
                }/user/products${relatedAllIds.slice(0, -1)}`;
                const result = await fetchGetItem(URL);
                setRelatedProducts(result?.response?.records?.data);
            }
            return () => {
                isMounted = false;
            };
        }
    }, [related_ids]);
    useEffect(() => {
        (async () => {
            let isMounted = true;
            if (isMounted) {
                if (access_token) {
                    const singleItem = await getProductDetails(
                        access_token,
                        productDetailsUrl
                    );

                    setProductDetails(singleItem);
                } else {
                    const singleItem = await fetchGetItem(productDetailsUrl);
                    setProductDetails(singleItem);
                }
            }
            return () => {
                isMounted = false;
            };
        })();
    }, []);

    useEffect(() => {
        if (Object.keys(productDetails).length) {
            setPrice({
                regularPrice: productDetails?.data?.regular_price_formatted,
                salePrice: productDetails?.data?.sale_price_formatted,
            });
            if (type === "Simple Product") {
                setFindVariation({
                    code: code,
                    variation_id: null,
                });
            } else if (type === "Variable Product") {
                let dataObj = dataProcessing(productDetails, variationData);
                setVariation(dataObj);
                let matchItem = matchVariation(productDetails, variationData);
                if (matchItem.success) {
                    setPrice({
                        regularPrice: matchItem?.value?.regular_price_formatted,
                        salePrice: matchItem?.value?.sale_price_formatted,
                    });
                    setFindVariation({
                        code: code,
                        variation_id: matchItem?.value?.id,
                    });
                }
            }
            if (Object.keys(variationData).length) {
                let value = Object.keys(variationData).every(
                    (k) => variationData[k] != ""
                );
                setIsValue(value);
            }
            setLoading(false);
        }
    }, [variationData, productDetails?.data?.id]);

    const handleAddToCart = async () => {
        const cartData = {
            ...findVariation,
            qty: quantity,
        };
        const res = await dispatch(
            storeItemInCart({ access_token, storeItemInCartUrl, cartData })
        );
        dispatch(
            setIsItemModalVisible({
                show: true,
                text: res.payload.message,
            })
        );
    };

    return (
        <>
            {loading ? (
                <>
                    <BackNavigation
                        navigationProps={props.navigation}
                        routeName={""}
                        capitalize={false}
                    />
                    <ProductDetailsSkeleton />
                </>
            ) : (
                <>
                    <BackNavigation
                        navigationProps={props.navigation}
                        routeName={""}
                        capitalize={false}
                    />
                    <ShareNwishlist
                        productId={id}
                        routeName={routeName}
                        slug={slug}
                        previousRouteName={previousRouteName}
                        is_wishlisted={is_wishlisted}
                    />
                    <ScrollView
                        style={{
                            minHeight: -1,
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <ItemCarousel images={productDetails?.data?.images} />
                        <ItemDetails
                            price={price}
                            variations={variations}
                            productDetails={productDetails}
                        />
                        <ItemDescription productDetails={productDetails} />
                        <DeliveryOptions />
                        {reviews_allowed == 1 && (
                            <RatingAndReviews productDetails={productDetails} />
                        )}
                        {Object.keys(vendor)?.length > 0 && (
                            <ItemOwner vendor={vendor} />
                        )}
                        {relatedProducts?.length > 0 && (
                            <View
                                style={{
                                    backgroundColor: "#fff",
                                    paddingHorizontal: customPixel.h20,
                                }}
                            >
                                <RelatedItem
                                    headerText={"Related Items"}
                                    renderData={relatedProducts}
                                />
                            </View>
                        )}
                    </ScrollView>
                    <View style={EditProfileStyle.changeInfo}>
                        <ItemQuantity
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                        <TouchableWithoutFeedback
                            disabled={bgColor == true ? false : true}
                            onPress={() =>
                                cartLoading ? {} : handleAddToCart()
                            }
                        >
                            <View
                                style={[
                                    productDetailsStyle.addToCartContainer,
                                    {
                                        backgroundColor:
                                            bgColor == true
                                                ? "#FCCA19"
                                                : "#F3F3F3",
                                    },
                                ]}
                            >
                                {cartLoading ? (
                                    <CustomSpinner
                                        filePath={require("../../../../assets/lottie/loader2.json")}
                                        size={{
                                            width: customPixel.h60,
                                            height: customPixel.h50,
                                        }}
                                    />
                                ) : (
                                    <View style={productDetailsStyle.addToCart}>
                                        <AddToCart
                                            height={customPixel.h22}
                                            width={customPixel.h18}
                                        />
                                        <Text
                                            style={[
                                                productDetailsStyle.cartBtnText,
                                            ]}
                                        >
                                            Add to Cart
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Notify
                        isModalVisible={isItemModalVisible}
                        setIsModalVisible={setIsItemModalVisible}
                        nextPage={"my cart"}
                        btnText={"Go To Cart"}
                    />
                </>
            )}
        </>
    );
};

export default ProductDetails;
