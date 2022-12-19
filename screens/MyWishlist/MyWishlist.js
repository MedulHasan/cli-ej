import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    TouchableHighlight,
    Image,
    Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { myWishlistStyles } from "./MyWishlistStyle";
import useAuth from "../../hooks/useAuth";
import config from "../../config";
import { useSelector, useDispatch } from "react-redux";
import CustomSpinner from "../Utilities/CustomSpinner/CustomSpinner";
import BackNavigation from "../Utilities/CustomHeader/BackNavigation";
import DeleteIcon from "../../assets/svgs/my wishlist/delete icon.svg";
import { ProfileStyles } from "../Profile/ProfileStyle";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import { EditProfileStyle } from "../Profile/EditProfile/StyleEditProfile";
import {
    fetchWishlistStart,
    getMyAllWishlist,
    getMyWishlist,
} from "../../redux/slices/user/myWishlist/getMyWishlist";
import { refresh } from "../../redux/slices/user/util/refresh";
import {
    getUserInfo,
    postUserInfoWithFormData,
} from "../../redux/slices/user/util/fetchUserInfo";
import CategoriesSkeleton from "../../src/skeletons/screens/Categories/CategoriesSkeleton";
import EmptyContent from "../Utilities/EmptyContent/EmptyContent";
import NoWishlistIcon from "../../assets/svgs/empty content/noWishlist";
import { addNewAddressStyle } from "../Profile/Address/AddNewAddress/AddNewAddressStyle";
import ProgressiveImage from "../../src/components/ProgressiveImage";
import { itemDetailsStyles } from "../Home/FeaturedProducts/ProductDetails/ItemDetails/ItemDetailsStyle";

const { width } = Dimensions.get("window");

const MyWishlist = (props) => {
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const URL = `${config.BASE_API_URL}/user/wishlists`;
    const { myWishlist, loading, isRefresh } = useSelector(
        (state) => state.getMyWishlistSlice
    );
    const [wishListProductVariations, setWishListProductVariations] = useState(
        []
    );
    const [isUndoPopup, setIsUndoPopup] = useState(false);
    const [undo, setUndo] = useState(false);
    const [undoData, setUndoData] = useState({});
    const hitDB = useRef(true);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getMyWishlist({ access_token, URL }));
        }
        return () => {
            isMounted = false;
        };
    }, []);
    useEffect(() => {
        let variations = [];
        for (let products of myWishlist) {
            const { code, type, variation_id } = products?.line_items;
            let findVariation = {
                code: "",
                variation_id: "",
                qty: "",
            };
            if (type === "Simple Product") {
                findVariation.code = code;
                findVariation.variation_id = null;
                findVariation.qty = 1;
                variations.push(findVariation);
            } else if (type === "Variable Product") {
            }
        }
        setWishListProductVariations(variations);
    }, [myWishlist]);
    useEffect(() => {
        if (undo) {
            dispatch(getMyAllWishlist([...myWishlist, undoData]));
            setIsUndoPopup(false);
            setUndo(false);
            setUndoData({});
            hitDB.current = false;
        }
    }, [undo]);

    const onRefresh = () => {
        refresh(
            access_token,
            URL,
            dispatch,
            fetchWishlistStart,
            getUserInfo,
            getMyAllWishlist
        );
    };

    const handleWishlistDelete = (id) => {
        const undoData = myWishlist.find((item) => item.id === id);
        setUndoData(undoData);
        const restWishlist = myWishlist.filter(
            (wishlist) => wishlist.id !== id
        );
        dispatch(getMyAllWishlist(restWishlist));
        postUserInfoWithFormData();
        setIsUndoPopup(true);

        setTimeout(() => {
            setIsUndoPopup(false);
            if (hitDB.current) {
                try {
                    fetch(`${config.BASE_API_URL}/user/wishlist/delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${access_token}`,
                        },
                    }).then((res) => res.json());
                } catch (e) {
                    console.log(e);
                }
            } else {
                hitDB.current = true;
            }
        }, 4000);
    };

    const handleRemoveAllWishlist = () => {
        const restWishlist = [];
        dispatch(getMyAllWishlist(restWishlist));
        let allIds = "?";
        if (myWishlist?.length > 0) {
            myWishlist.forEach((wishlist) => {
                allIds = allIds + `ids[]=${wishlist.id}&`;
            });
        }

        try {
            fetch(
                `${config.BASE_API_URL}/user/wishlist/delete${allIds.slice(
                    0,
                    -1
                )}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            ).then((res) => res.json());
        } catch (e) {
            console.log(e);
        }
    };
    const addAllToCart = async () => {};
    const renderItem = ({ item = {} }) => {
        const {
            line_items: {
                name,
                regular_price_formatted,
                sale_price_formatted,
                featured_image,
                slug,
            } = {},
            id = {},
        } = item;
        return (
            <View style={[myWishlistStyles.singleWishlistContainer]}>
                <Pressable
                    style={myWishlistStyles.wishlistDetails}
                    onPress={() =>
                        props.navigation.navigate("Product Details", {
                            slug,
                        })
                    }
                >
                    <View style={myWishlistStyles.imageCont}>
                        <ProgressiveImage
                            source={{ uri: featured_image }}
                            style={myWishlistStyles.image}
                        />
                    </View>
                    <View style={{ width: customPixel.w230 }}>
                        <Text style={myWishlistStyles.text}>
                            {`${name}`.length > 20
                                ? `${name}`.slice(0, 20) + ` . . .`
                                : `${name}`}
                        </Text>

                        <View
                            style={{
                                ...itemDetailsStyles.priceCont,
                                paddingVertical: customPixel.h0,
                            }}
                        >
                            {(sale_price_formatted ||
                                regular_price_formatted) && (
                                <Text
                                    style={{
                                        ...itemDetailsStyles.price,
                                        fontSize: customPixel.h16,
                                        color: "#2C2C2C",
                                    }}
                                >
                                    {sale_price_formatted ||
                                        regular_price_formatted}
                                </Text>
                            )}
                            {sale_price_formatted &&
                                regular_price_formatted && (
                                    <Text style={itemDetailsStyles.discount}>
                                        {regular_price_formatted}
                                    </Text>
                                )}
                        </View>
                    </View>
                </Pressable>
                <TouchableOpacity onPress={() => handleWishlistDelete(id)}>
                    <DeleteIcon
                        height={width < 321 ? customPixel.h22 : customPixel.h18}
                        width={width < 321 ? customPixel.h22 : customPixel.h18}
                        fill={"#898989"}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            {loading ? (
                <CategoriesSkeleton />
            ) : (
                <>
                    <View style={myWishlistStyles.container}>
                        {myWishlist?.length > 0 ? (
                            <FlatList
                                data={myWishlist}
                                renderItem={renderItem}
                                keyExtractor={(item) => item?.id}
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
                                        Icon={NoWishlistIcon}
                                        text={"No Items Saved For Later"}
                                    />
                                )}
                            />
                        )}
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                        }}
                    >
                        {isUndoPopup && (
                            <View style={myWishlistStyles.undoContainer}>
                                <Text style={myWishlistStyles.undoText}>
                                    Item has been removed.
                                </Text>
                                <TouchableHighlight
                                    onPress={() => {
                                        setUndo(true);
                                    }}
                                >
                                    <Text style={myWishlistStyles.undoBtn}>
                                        Undo
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        )}
                        <View style={EditProfileStyle.changeInfo}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleRemoveAllWishlist();
                                }}
                            >
                                <Text style={EditProfileStyle.cancel}>
                                    Clear All
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    addAllToCart();
                                }}
                                style={addNewAddressStyle.saveAddressCont}
                            >
                                {loading ? (
                                    <CustomSpinner
                                        filePath={require("../../assets/lottie/loader2.json")}
                                        size={{
                                            width: customPixel.h60,
                                            height: customPixel.h50,
                                        }}
                                    />
                                ) : (
                                    <Text
                                        style={
                                            addNewAddressStyle.saveAddressBtn
                                        }
                                    >
                                        Add all to Cart
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </>
    );
};

export default MyWishlist;
