import {
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Share,
} from "react-native";
import React from "react";
import { productDetailsStyle } from "../ProductDetailsStyle";
import { useState, useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import ShareIcon from "../../../../../assets/svgs/product details/share.svg";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import {
    postUserInfo,
    postUserInfoWithFormData,
} from "../../../../../redux/slices/user/util/fetchUserInfo";
import useAuth from "../../../../../hooks/useAuth";
import config from "../../../../../config";
import { useNavigation } from "@react-navigation/native";

const iconSize = customPixel.h35;

const ShareNwishlist = ({
    productId,
    routeName,
    slug,
    previousRouteName,
    is_wishlisted,
}) => {
    //wishlist animation
    const [wishlist, setWishlist] = useState(is_wishlisted);
    const wishlistRef = useRef(null);
    const isFirstRun = useRef(true);
    const { access_token, user } = useAuth();
    const navigation = useNavigation();
    useEffect(() => {
        if (isFirstRun.current) {
            if (wishlist) wishlistRef.current.play(66, 66);
            else wishlistRef.current.play(23, 23);
            isFirstRun.current = false;
        } else if (wishlist) wishlistRef.current.play(27, 50);
        else wishlistRef.current.play(0, 23);
    }, [wishlist]);
    //wishlist handler

    const handleWishlist = async () => {
        if (!user) {
            navigation.navigate("login", { name: routeName, slug: slug });
        } else if (user && wishlist) {
            setWishlist(!wishlist);
            const URL = `${config.BASE_API_URL}/user/wishlist/${productId}`;

            await postUserInfo(access_token, URL, "DELETE");
        } else if (user && !wishlist) {
            setWishlist(!wishlist);
            const URL = `${config.BASE_API_URL}/user/wishlist/${productId}`;
            let formData = new FormData();
            formData.append("product_id", productId);
            await postUserInfoWithFormData(access_token, URL, "POST", formData);
        }
    };
    useEffect(() => {
        (async () => {
            if (previousRouteName === "login") {
                setWishlist(!wishlist);
                const URL = `${config.BASE_API_URL}/user/wishlist`;
                let formData = new FormData();
                formData.append("product_id", productId);
                await postUserInfoWithFormData(
                    access_token,
                    URL,
                    "POST",
                    formData
                );
            }
        })();
    }, [previousRouteName, user]);
    const handleShare = async () => {
        const b64 =
            "https://img.freepik.com/free-photo/beautiful-shot-crystal-clear-lake-snowy-mountain-base-during-sunny-day_181624-5459.jpg?size=626&ext=jpg&uid=P63617510&ga=GA1.2.380107731.1655873284";
        const content = {
            message: "Product Name",
            url: b64,
            title: b64,
        };
        const option = {};
        const result = await Share.share(content);
    };
    return (
        <View style={productDetailsStyle.header}>
            <TouchableWithoutFeedback onPress={() => handleWishlist()}>
                <View style={productDetailsStyle.wishlistContainer}>
                    <View>
                        <LottieView
                            ref={wishlistRef}
                            source={require("../../../../../assets/lottie/wishlist.json")}
                            autoPlay={false}
                            loop={false}
                            style={{
                                height: customPixel.h50,
                                width: customPixel.h30,
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={handleShare}>
                <ShareIcon height={iconSize} width={iconSize} />
            </TouchableOpacity>
        </View>
    );
};

export default ShareNwishlist;
