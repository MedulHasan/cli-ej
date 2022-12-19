import { useToast } from "native-base";
import { useState } from "react";
import { useEffect } from "react";
import {
    Image,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isArray } from "underscore";

import RightArrowIcon from "../../../assets/svgs/refund/rightArrow.svg";
import config from "../../../config";
import useAuth from "../../../hooks/useAuth";
import { getMyRefunds } from "../../../redux/slices/user/myRefund/getMyRefunds";
import { getUserInfo } from "../../../redux/slices/user/util/fetchUserInfo";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import MyRefundSkeleton from "../../../src/skeletons/screens/profile/refund/MyRefundSkeleton";
import CustomerSupport from "../../Utilities/CustomerSupport/CustomerSupport";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { Wallet } from "../Profile";
import { ProfileStyles } from "../ProfileStyle";
import { MyRefundStyle } from "./MyRefundStyle";

const MyRefund = (props) => {
    const { myRefunds, loading: isLoading } = useSelector(
        (state) => state.getMyRefunds
    );
    const { myRefundsWallet } = useSelector((state) => state.getMyRefundWallet);
    const { allPreferences } =
        useSelector((state) => state.getPreferences) || {};
    const last_refund = myRefunds[myRefunds?.length - 1];
    const { access_token } = useAuth();
    const UrlGet = `${config.BASE_API_URL}/user/refunds`;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyRefunds({ access_token, URL: UrlGet }));
    }, [dispatch]);

    return (
        <View>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={MyRefundStyle.container}>
                <Wallet
                    balance={
                        myRefundsWallet?.length
                            ? myRefundsWallet[0]?.balance
                            : 0
                    }
                />
                {isLoading ? (
                    <MyRefundSkeleton />
                ) : !isArray(myRefunds) && !isLoading ? (
                    <View style={MyRefundStyle.noRefund}>
                        <Text style={MyRefundStyle.noRefundText}>
                            You Have No Refund Requests Yet
                        </Text>
                    </View>
                ) : myRefunds?.length === 0 ? (
                    <View style={MyRefundStyle.noRefund}>
                        <Text style={MyRefundStyle.noRefundText}>
                            You Have No Refund Requests Yet
                        </Text>
                    </View>
                ) : (
                    <View>
                        <View style={MyRefundStyle.lastRefund}>
                            <View>
                                <Text style={MyRefundStyle.title}>
                                    Last Refund
                                </Text>
                                <Text style={MyRefundStyle.text1}>
                                    {last_refund?.line_items?.category}
                                </Text>
                                <Text style={MyRefundStyle.text2}>
                                    {`${last_refund?.line_items?.name}`.length >
                                    30
                                        ? `${last_refund?.line_items?.name}`.slice(
                                              0,
                                              30
                                          ) + ` . . .`
                                        : `${last_refund?.line_items?.name}`}
                                </Text>
                                <Text style={MyRefundStyle.attribute}>
                                    Qty: {last_refund?.quantity_sent}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={[
                                        MyRefundStyle.title,
                                        { marginLeft: "auto" },
                                    ]}
                                >
                                    $ {last_refund?.line_items?.price}
                                </Text>
                                <View style={MyRefundStyle.imgCont}>
                                    <ProgressiveImage
                                        source={{
                                            uri: last_refund?.product_image_url,
                                        }}
                                        style={MyRefundStyle.img}
                                    />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={MyRefundStyle.refundList}
                            onPress={() =>
                                props.navigation.navigate("refund list")
                            }
                        >
                            <Text style={MyRefundStyle.listText}>
                                See Refund Lists
                            </Text>
                            <RightArrowIcon
                                width={customPixel.h16}
                                height={customPixel.h10}
                                fill={"#898989"}
                            />
                        </TouchableOpacity>
                        <CustomerSupport
                            number={allPreferences?.company?.company_phone}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={MyRefundStyle.requestRefund}
                    onPress={() => props.navigation.navigate("refund")}
                >
                    <Text style={MyRefundStyle.requestText}>
                        Request A Refund
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MyRefund;
