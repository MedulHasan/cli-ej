import { View, Text } from "react-native";
import React from "react";
import DeliveryOptionStyle from "./DeliveryOptionStyle";
import EditIcon from "../../../../../assets/svgs/profile/edit profile.svg";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";

const DeliveryOptions = () => {
    return (
        <View style={DeliveryOptionStyle.container}>
            <View style={DeliveryOptionStyle.subCont}>
                <View style={DeliveryOptionStyle.title}>
                    <Text style={DeliveryOptionStyle.textTitle}>
                        Delivery Options
                    </Text>
                    <EditIcon />
                </View>
                <Text style={DeliveryOptionStyle.address}>
                    House-D/1, Sukrabad, Dhanmondi-32, Dhaka-North, Dhaka-1207,
                    Bangladesh
                </Text>
                <View style={DeliveryOptionStyle.delivery}>
                    <Text style={DeliveryOptionStyle.deliveryText}>
                        Home Delivery
                    </Text>
                    <Text style={DeliveryOptionStyle.deliveryInfo}>
                        $20 (2-8 Days)
                    </Text>
                </View>
                <View style={DeliveryOptionStyle.delivery}>
                    <Text style={DeliveryOptionStyle.deliveryText}>
                        Warranty
                    </Text>
                    <View>
                        <Text style={DeliveryOptionStyle.deliveryInfo}>
                            12 months
                        </Text>
                        <Text
                            style={{
                                ...DeliveryOptionStyle.deliveryInfo,
                                color: "#898989",
                                marginVertical: customPixel.h7,
                            }}
                        >
                            7 Days Return
                        </Text>
                        <Text
                            style={{
                                ...DeliveryOptionStyle.deliveryInfo,
                                color: "#898989",
                            }}
                        >
                            Change of mind is not applicable
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DeliveryOptions;
