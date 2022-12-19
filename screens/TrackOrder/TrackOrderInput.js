import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React from "react";
import MenuNavigation from "../Utilities/CustomHeader/MenuNavigation";
import { ProfileStyles } from "../Profile/ProfileStyle";
import CommonStyles from "../Utilities/CommonStyles/CommonStyles";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
import Rocket from "../../assets/svgs/trackOrder/rocket.svg";
import { trackOrderStyle } from "./trackOrderStyle";

import { useState } from "react";
import { CustomToast, errorToase } from "../Utilities/CustomToast/CustomToast";
import { useToast } from "native-base";
import config from "../../config";
import CustomSpinner from "../Utilities/CustomSpinner/CustomSpinner";
import { useDispatch } from "react-redux";
import { getTrackOrders } from "../../redux/slices/trackOrder/getTrackOrder";
import { getAllOrderStatus } from "../../redux/slices/trackOrder/getAllStatus";
import { useSelector } from "react-redux";

const TrackOrderInput = (props) => {
    const toast = useToast();
    const [trackValue, setTrackValue] = useState("");
    const [error, setError] = useState("");
    const { loading: trackOrdersLoading } =
        useSelector((state) => state.getTrackOrder) || {};
    const { loading: allStatusLoading } =
        useSelector((state) => state.getAllOrderStatus) || {};
    const dispatch = useDispatch();
    const handleTrackOrder = async () => {
        if (trackValue) {
            setError(false);
            const TrackURL = `${config.BASE_API_URL}/user/track-order/${trackValue}`;
            const StatusURL = `${config.BASE_API_URL}/user/orders/statuses`;
            const trackOrder = await dispatch(
                getTrackOrders({ URL: TrackURL })
            );

            const status = await dispatch(
                getAllOrderStatus({ URL: StatusURL })
            );
            const {
                status: returnTrackOrderStatus,
                records: returnTrackOrderData,
            } = trackOrder?.payload;
            const {
                status: returnAllPossibleStatus,
                records: returnStatusData,
            } = status?.payload;
            if (
                returnTrackOrderStatus?.code === 200 &&
                returnAllPossibleStatus?.code === 200
            ) {
                setError(false);
                setTrackValue("");
                props.navigation.navigate("track order", {
                    myTrackOrders: returnTrackOrderData?.data,
                    allStatus: returnStatusData?.data,
                });
            } else {
                setError(true);

                CustomToast(toast, returnTrackOrderStatus?.message, errorToase);
            }
        } else {
            setError(true);

            CustomToast(toast, "Please Input Valid Track Id", errorToase);
        }
    };
    return (
        <View>
            <MenuNavigation
                navigationProps={props.navigation}
                routeName={props.route}
            />
            <View style={ProfileStyles.hrLine} />
            <ScrollView
                keyboardShouldPersistTaps='always'
                style={[
                    CommonStyles.globalContainer,
                    { marginBottom: customPixel.h100 },
                ]}
            >
                <View
                    style={[
                        trackOrderStyle.orderRocketSvg,
                        {
                            marginTop: customPixel.h42,
                            marginBottom: customPixel.h31,
                        },
                    ]}
                >
                    <Rocket />
                </View>
                <View>
                    <Text style={trackOrderStyle.orderHeader}>
                        Have An Order?
                    </Text>
                    <Text style={trackOrderStyle.orderDesc}>
                        Enter the invoice number of your order below and know
                        the progress of your order delivery{" "}
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={{
                            ...trackOrderStyle.textInput,
                            borderColor: error ? "#E43147" : "#DFDFDF",
                        }}
                        value={trackValue}
                        onChangeText={setTrackValue}
                        placeholder='e.g. INV-2231'
                        keyboardType='default'
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={trackOrderStyle.trackOrderButton}
                        onPress={handleTrackOrder}
                        disabled={trackOrdersLoading || allStatusLoading}
                    >
                        {trackOrdersLoading || allStatusLoading ? (
                            <CustomSpinner
                                filePath={require("../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h60,
                                }}
                            />
                        ) : (
                            <Text style={trackOrderStyle.trackOrderButtonText}>
                                Track Now
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default TrackOrderInput;
