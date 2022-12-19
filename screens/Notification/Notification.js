import { View, Text } from "react-native";
import React from "react";
import MenuNavigation from "../Utilities/CustomHeader/MenuNavigation";
import { ProfileStyles } from "../Profile/ProfileStyle";
import { notificationStyle } from "./NotificationStyle";
import NotificationIcon from "../../assets/svgs/notification/Bell_fill.svg";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";

const iconHW = customPixel.h15;

const Notification = (props) => {
    return (
        <View>
            <MenuNavigation
                navigationProps={props.navigation}
                routeName={props.route}
            />
            <View style={ProfileStyles.hrLine} />
            <View style={notificationStyle.container}>
                <Text style={notificationStyle.title}>TODAY</Text>
                <View style={{ backgroundColor: "#F3F3F3" }}>
                    <View
                        style={[
                            notificationStyle.notiCont,
                            { borderBottomWidth: 1 },
                        ]}
                    >
                        <View style={notificationStyle.icon}>
                            <NotificationIcon
                                height={iconHW}
                                width={iconHW}
                                fill={"#898989"}
                            />
                        </View>
                        <View style={notificationStyle.textCont}>
                            <Text style={notificationStyle.heading}>
                                NEW UPDATE! We are really excited to announce
                                that our app version of multi-vendor will be
                                launched on 1 Feb, 2022. Stay tuned.
                            </Text>
                            <Text style={notificationStyle.time}>Just Now</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Notification;
