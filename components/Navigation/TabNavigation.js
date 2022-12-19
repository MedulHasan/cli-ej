import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeIcon from "../../assets/svgs/tabNaviagtion/homeIcon.svg";
import CategoryIcon from "../../assets/svgs/tabNaviagtion/catrgoryIcon.svg";
import CartIcon from "../../assets/svgs/tabNaviagtion/cartIcon.svg";
import ProfileIcon from "../../assets/svgs/tabNaviagtion/profileIcon.svg";
import NotificationsIcon from "../../assets/svgs/tabNaviagtion/notificationIcon.svg";
import Categories from "../../screens/Categories/Categories";
import Cart from "../../screens/ShoppingCart/ShoppingCart";
import Home from "../../screens/Home/Home";
import useAuth from "../../hooks/useAuth";
import Login from "../Authentication/Login/Login";
import Notification from "../../screens/Notification/Notification";
import Profile from "../../screens/Profile/Profile";
import { customPixel } from "../../screens/Utilities/CustomStyleAttribute/CustomPixel";
import ProfileLogout from "../../screens/Profile/ProfileLogout/ProfileLogout";

const { height, width } = Dimensions.get("window");

const tabIconHeight = customPixel.h24;
const tabIconWidth = width * 0.06;

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const { access_token } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 5,
                        height: 12,
                    },
                    shadowOpacity: 0.06,
                    elevation: 24,

                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    backgroundColor: "#FFFFFF",
                    height: height < 534 ? customPixel.h80 : customPixel.h65,
                },
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.singleTabContainer}>
                            <HomeIcon
                                width={tabIconWidth}
                                height={tabIconHeight}
                                fill={focused ? "#2C2C2C" : "#898989"}
                            />
                            <Text
                                style={[
                                    {
                                        color: focused ? "#2C2C2C" : "#898989",
                                        fontFamily: focused
                                            ? "DMSans_700Bold"
                                            : "DMSans_500Medium",
                                    },
                                    styles.tabBarLabel,
                                ]}
                            >
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Categories'
                component={Categories}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.singleTabContainer}>
                            <CategoryIcon
                                width={tabIconWidth}
                                height={tabIconHeight}
                                fill={focused ? "#2C2C2C" : "#898989"}
                            />
                            <Text
                                style={[
                                    {
                                        color: focused ? "#2C2C2C" : "#898989",
                                        fontFamily: focused
                                            ? "DMSans_700Bold"
                                            : "DMSans_500Medium",
                                    },
                                    styles.tabBarLabel,
                                ]}
                            >
                                Category
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='my cart'
                component={Cart}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.singleTabContainer}>
                            <CartIcon
                                width={tabIconWidth}
                                height={tabIconHeight}
                                fill={focused ? "#2C2C2C" : "#898989"}
                            />
                            <Text
                                style={[
                                    {
                                        color: focused ? "#2C2C2C" : "#898989",
                                        fontFamily: focused
                                            ? "DMSans_700Bold"
                                            : "DMSans_500Medium",
                                    },
                                    styles.tabBarLabel,
                                ]}
                            >
                                Cart
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='Notifications'
                component={access_token ? Notification : Login}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.singleTabContainer}>
                            <NotificationsIcon
                                width={tabIconWidth}
                                height={tabIconHeight}
                                fill={focused ? "#2C2C2C" : "#898989"}
                            />
                            <Text
                                style={[
                                    {
                                        color: focused ? "#2C2C2C" : "#898989",
                                        fontFamily: focused
                                            ? "DMSans_700Bold"
                                            : "DMSans_500Medium",
                                    },
                                    styles.tabBarLabel,
                                ]}
                            >
                                Notification
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name='MY ACCOUNT'
                component={access_token ? Profile : ProfileLogout}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.singleTabContainer}>
                            <ProfileIcon
                                width={tabIconWidth}
                                height={tabIconHeight}
                                fill={focused ? "#2C2C2C" : "#898989"}
                            />
                            <Text
                                style={[
                                    {
                                        color: focused ? "#2C2C2C" : "#898989",
                                        fontFamily: focused
                                            ? "DMSans_700Bold"
                                            : "DMSans_500Medium",
                                    },
                                    styles.tabBarLabel,
                                ]}
                            >
                                Profile
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    singleTabContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabBarLabel: {
        fontSize: customPixel.h12,
        textAlign: "center",
        marginTop: 7,
        flexShrink: 1,
    },
});

export default TabNavigation;
