import React from "react";
import {
    View,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Text } from "native-base";
import useAuth from "../../../hooks/useAuth";
import LogoIcon from "../../../assets/svgs/drawer/logo.svg";
import TimesIcon from "../../../assets/svgs/drawer/times.svg";
import { drawerStyle } from "./DrawerContainerStyle";
import UserIcon from "../../../assets/svgs/drawer/user.svg";
import LoginIcon from "../../../assets/svgs/drawer/login.svg";
import LogoutIcon from "../../../assets/svgs/drawer/logout.svg";
import TrackOrderIcon from "../../../assets/svgs/drawer/track_order.svg";
import PolicyIcon from "../../../assets/svgs/drawer/policy.svg";
import SettingsIcon from "../../../assets/svgs/drawer/settings.svg";
import HomeIcon from "../../../assets/svgs/drawer/home.svg";
import WishlistIcon from "../../../assets/svgs/drawer/wishlist.svg";
import RefundIcon from "../../../assets/svgs/drawer/refund.svg";

const { width, height } = Dimensions.get("window");

const iconSize = height * 0.018;

const DrawerContainer = (props) => {
    const { signOut, access_token, user } = useAuth();
    const navigation = useNavigation();
    return (
        <View style={drawerStyle.container}>
            <DrawerContentScrollView
                {...props}
                showsVerticalScrollIndicator={false}
            >
                <View style={drawerStyle.header}>
                    <LogoIcon width={width * 0.45} height={height * 0.05} />
                    <TouchableWithoutFeedback
                        onPress={props.navigation.closeDrawer}
                    >
                        <View style={drawerStyle.closeIconCont}>
                            <TimesIcon
                                width={width * 0.04}
                                height={height * 0.05}
                                fill={"#FFFFFF"}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TouchableOpacity
                    style={drawerStyle.user}
                    onPress={() =>
                        navigation.navigate(
                            access_token ? "MY ACCOUNT" : "login"
                        )
                    }
                >
                    <View style={drawerStyle.userIcoin}>
                        {access_token ? (
                            <Avatar
                                source={{
                                    uri: user?.image || user?.picture_url,
                                }}
                                style={drawerStyle.userImage}
                            />
                        ) : (
                            <UserIcon
                                width={width * 0.045}
                                height={height * 0.024}
                            />
                        )}
                    </View>
                    <View>
                        <Text style={drawerStyle.noAccount}>
                            {access_token ? user?.name : "No Account"}
                        </Text>
                        <Text style={drawerStyle.createAccount}>
                            {access_token ? (
                                user?.email
                            ) : (
                                <Text>Create or login now</Text>
                            )}
                        </Text>
                    </View>
                </TouchableOpacity>
                <DrawerItem
                    style={drawerStyle.drawerItem}
                    label={() => {
                        return (
                            <View style={drawerStyle.itemContainer}>
                                <HomeIcon width={iconSize} height={iconSize} />
                                <Text style={drawerStyle.itemText}>Home</Text>
                            </View>
                        );
                    }}
                    onPress={() => navigation.navigate("Home")}
                />
                <DrawerItem
                    style={drawerStyle.drawerItem}
                    label={() => {
                        return (
                            <View style={drawerStyle.itemContainer}>
                                <TrackOrderIcon
                                    width={iconSize}
                                    height={iconSize}
                                />
                                <Text style={drawerStyle.itemText}>
                                    Track Order
                                </Text>
                            </View>
                        );
                    }}
                    onPress={() => navigation.navigate("track your order")}
                />
                <DrawerItem
                    style={drawerStyle.drawerItem}
                    label={() => {
                        return (
                            <View style={drawerStyle.itemContainer}>
                                <PolicyIcon
                                    width={iconSize}
                                    height={iconSize}
                                />
                                <Text style={drawerStyle.itemText}>Policy</Text>
                            </View>
                        );
                    }}
                    // onPress={() => navigation.navigate("")}
                />
                {access_token && (
                    <>
                        <DrawerItem
                            style={drawerStyle.drawerItem}
                            label={() => {
                                return (
                                    <View style={drawerStyle.itemContainer}>
                                        <WishlistIcon
                                            width={iconSize}
                                            height={iconSize}
                                        />
                                        <Text style={drawerStyle.itemText}>
                                            My Wishlist
                                        </Text>
                                    </View>
                                );
                            }}
                            onPress={() => navigation.navigate("my wishlist")}
                        />
                        <DrawerItem
                            style={drawerStyle.drawerItem}
                            label={() => {
                                return (
                                    <View style={drawerStyle.itemContainer}>
                                        <RefundIcon
                                            width={iconSize}
                                            height={iconSize}
                                        />
                                        <Text style={drawerStyle.itemText}>
                                            Refund
                                        </Text>
                                    </View>
                                );
                            }}
                            onPress={() => navigation.navigate("my refund")}
                        />
                    </>
                )}
                <DrawerItem
                    style={drawerStyle.drawerItem}
                    label={() => {
                        return (
                            <View style={drawerStyle.itemContainer}>
                                <SettingsIcon
                                    width={iconSize}
                                    height={iconSize}
                                />
                                <Text style={drawerStyle.itemText}>
                                    Settings
                                </Text>
                            </View>
                        );
                    }}
                    // onPress={() => navigation.navigate("")}
                />
                <View style={drawerStyle.hrLine} />
                {access_token ? (
                    <View>
                        <DrawerItem
                            style={drawerStyle.drawerItem}
                            label={() => {
                                return (
                                    <View style={drawerStyle.itemContainer}>
                                        <LogoutIcon
                                            width={iconSize}
                                            height={iconSize}
                                        />
                                        <Text style={drawerStyle.itemText}>
                                            Logout
                                        </Text>
                                    </View>
                                );
                            }}
                            onPress={() => signOut(navigation)}
                        />
                    </View>
                ) : (
                    <View>
                        <DrawerItem
                            style={drawerStyle.drawerItem}
                            label={() => {
                                return (
                                    <View style={drawerStyle.itemContainer}>
                                        <LoginIcon
                                            width={iconSize}
                                            height={iconSize}
                                        />
                                        <Text style={drawerStyle.itemText}>
                                            Login
                                        </Text>
                                    </View>
                                );
                            }}
                            onPress={() => navigation.navigate("login")}
                        />
                    </View>
                )}
            </DrawerContentScrollView>
        </View>
    );
};

export default DrawerContainer;
