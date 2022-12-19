import {
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React from "react";
import MenuNavigation from "../../Utilities/CustomHeader/MenuNavigation";
import { ProfileStyles } from "../ProfileStyle";
import { Wallet } from "../Profile";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
const { width, height } = Dimensions.get("window");
import UserIcon from "../../../assets/svgs/drawer/user.svg";
import { useNavigation } from "@react-navigation/native";
const ProfileLogout = (props) => {
    const navigation = useNavigation();
    return (
        <>
            <MenuNavigation
                navigationProps={props.navigation}
                routeName={props.route}
            />
            <View style={ProfileStyles.hrLine} />
            <ScrollView howsVerticalScrollIndicator={false}>
                <View style={ProfileStyles.profileContainer}>
                    <View style={style.proImageContainer}>
                        <View style={style.userIcon}>
                            <UserIcon
                                width={width * 0.09}
                                height={height * 0.04}
                            />
                        </View>
                        <View>
                            <View style={{ marginLeft: customPixel.h15 }}>
                                <Text style={style.accountText}>
                                    No Account
                                </Text>
                                <View style={style.proImageContainer}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.navigation.navigate(
                                                "registration"
                                            )
                                        }
                                    >
                                        <Text style={style.regisBtn}>
                                            Register
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={style.orText}>or</Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            props.navigation.navigate("login")
                                        }
                                    >
                                        <Text style={style.LoginBtn}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Wallet balence={0} />
                    <View style={ProfileStyles.quantityContainer}>
                        <View>
                            <Text style={ProfileStyles.quantityText}>
                                In Cart
                            </Text>
                            <Text style={ProfileStyles.quantity}>0</Text>
                        </View>
                        <View style={ProfileStyles.wishlistCont}>
                            <Text style={ProfileStyles.quantityText}>
                                Wishlist
                            </Text>
                            <Text style={ProfileStyles.quantity}>0</Text>
                        </View>
                        <View>
                            <Text style={ProfileStyles.quantityText}>
                                All Orders
                            </Text>
                            <Text style={ProfileStyles.quantity}>0</Text>
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
                                    navigation.navigate("track your order")
                                }
                            >
                                <Text style={ProfileStyles.info}>
                                    Track Order
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileStyles.infoBorder}>
                            <TouchableOpacity>
                                <Text style={ProfileStyles.info}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ProfileStyles.infoBorder}>
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate("login")
                                }
                            >
                                <Text style={[ProfileStyles.info]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default ProfileLogout;

const style = StyleSheet.create({
    proImageContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    regisBtn: {
        backgroundColor: "#2C2C2C",
        color: "#ffffff",
        paddingHorizontal: customPixel.h22,
        paddingVertical: customPixel.h7,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        borderRadius: 2,
    },
    LoginBtn: {
        backgroundColor: "#FCCA19",
        color: "#2C2C2C",
        paddingHorizontal: customPixel.h31,
        paddingVertical: customPixel.h7,
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        borderRadius: 2,
    },
    orText: {
        marginHorizontal: customPixel.h10,
        color: "#898989",
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
    },
    userIcon: {
        backgroundColor: "#F3F3F3",
        width: height * 0.12,
        height: height * 0.12,
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.031,
    },
    accountText: {
        color: "#898989",
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h18,
        marginBottom: customPixel.h10,
    },
});
