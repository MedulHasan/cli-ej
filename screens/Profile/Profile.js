import React from "react";
import { useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { ProfileStyles } from "./ProfileStyle";
import MenuNavigation from "../Utilities/CustomHeader/MenuNavigation";
import EditProfileIcon from "../../assets/svgs/profile/edit profile.svg";
import ProfileSkeleton from "../../src/skeletons/screens/profile/ProfileSkeleton";
import { updateUserProfile } from "../../redux/slices/user/updateProfile/getUpdateProfile";
import config from "../../config";
import ProgressiveImage from "../../src/components/ProgressiveImage";
import { getMyRefundWallet } from "../../redux/slices/user/myRefund/refundWallet/getMyRefundWallet";

const URL = `${config.BASE_API_URL}/user/profile`;
const urlGet = `${config.BASE_API_URL}/user/wallet`;
const { width, height } = Dimensions.get("window");

const Profile = (props) => {
    const dispatch1 = useDispatch();
    const { access_token, signOut, dispatch } = useAuth();
    const { userInfo, loading, isRefresh } = useSelector(
        (state) => state.updateUserProfile
    );
    const { myRefundsWallet, loading: isLoading } = useSelector(
        (state) => state.getMyRefundWallet
    );

    const { myWishlist } = useSelector((state) => state.getMyWishlistSlice);
    const { myOrders } = useSelector((state) => state.getMyOrdersSlice);
    const { cartDataLength } = useSelector((state) => state.cartProductSlice);
    const { totalProduct } = useSelector((state) => state.storeItemInCartSlice);
    useEffect(() => {
        if (userInfo !== null) {
            dispatch({
                type: "SIGN_IN",
                token: access_token,
                userInfo: userInfo,
                isLoading: false,
            });
        }
    }, [userInfo?.name, userInfo?.image || userInfo?.picture_url]);
    useEffect(async () => {
        let isMounted = true;
        if (isMounted) {
            dispatch1(updateUserProfile(access_token));
        }
        return () => {
            isMounted = false;
        };
    }, [access_token]);

    useEffect(async () => {
        let isMounted = true;
        if (isMounted) {
            await dispatch1(getMyRefundWallet({ access_token, URL: urlGet }));
        }
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <>
            <MenuNavigation
                navigationProps={props.navigation}
                routeName={props.route}
            />
            <View style={ProfileStyles.hrLine} />
            {
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ProfileStyles.profileContainer}>
                        {loading ? (
                            <ProfileSkeleton />
                        ) : (
                            <View style={ProfileStyles.profileImageCont}>
                                <ProgressiveImage
                                    source={{ uri: userInfo?.picture_url }}
                                    style={ProfileStyles.image}
                                />
                                <View>
                                    <View>
                                        <Text style={ProfileStyles.name}>
                                            {userInfo?.name}
                                        </Text>
                                        <Text style={ProfileStyles.email}>
                                            {userInfo?.email}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.navigation.navigate(
                                                "edit profile"
                                            )
                                        }
                                    >
                                        <View style={ProfileStyles.editProfile}>
                                            <EditProfileIcon
                                                width={width * 0.037}
                                                height={height * 0.03}
                                            />
                                            <Text
                                                style={ProfileStyles.editText}
                                            >
                                                edit profile
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        <Wallet
                            balance={
                                myRefundsWallet?.length
                                    ? myRefundsWallet[0]?.balance
                                    : 0
                            }
                        />
                        <View style={ProfileStyles.quantityContainer}>
                            <View>
                                <Text style={ProfileStyles.quantityText}>
                                    In Cart
                                </Text>
                                <Text style={ProfileStyles.quantity}>
                                    {cartDataLength || totalProduct}
                                </Text>
                            </View>
                            <View style={ProfileStyles.wishlistCont}>
                                <Text style={ProfileStyles.quantityText}>
                                    Wishlist
                                </Text>
                                <Text style={ProfileStyles.quantity}>
                                    {myWishlist?.length}
                                </Text>
                            </View>
                            <View>
                                <Text style={ProfileStyles.quantityText}>
                                    All Orders
                                </Text>
                                <Text style={ProfileStyles.quantity}>
                                    {myOrders?.length}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View
                                style={[
                                    ProfileStyles.infoBorder,
                                    { paddingTop: height * 0.031 },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate(
                                            "address book"
                                        )
                                    }
                                >
                                    <Text style={ProfileStyles.info}>
                                        My Address
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.infoBorder}>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate(
                                            "order history"
                                        )
                                    }
                                >
                                    <Text style={ProfileStyles.info}>
                                        Order History
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.infoBorder}>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("my reviews")
                                    }
                                >
                                    <Text style={ProfileStyles.info}>
                                        My Reviews
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.infoBorder}>
                                <TouchableOpacity>
                                    <Text style={ProfileStyles.info}>
                                        My Wallet
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.infoBorder}>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.navigation.navigate("my refund")
                                    }
                                >
                                    <Text style={ProfileStyles.info}>
                                        Refund Requests
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={ProfileStyles.infoBorder}>
                                <TouchableOpacity>
                                    <Text style={ProfileStyles.info}>
                                        Settings
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => signOut(props.navigation)}
                            >
                                <Text
                                    style={[
                                        ProfileStyles.info,
                                        {
                                            paddingBottom: 0,
                                        },
                                    ]}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            }
        </>
    );
};

export default Profile;

export const Wallet = ({ balance }) => {
    return (
        <View style={ProfileStyles.walletContainer}>
            <View>
                <Text style={ProfileStyles.walletText}>My Refund</Text>
                <Text style={ProfileStyles.wallet}>WALLET</Text>
            </View>
            <View>
                <Text style={ProfileStyles.walletText}>Current Amount</Text>
                <Text style={ProfileStyles.amount}>${balance}</Text>
            </View>
        </View>
    );
};
