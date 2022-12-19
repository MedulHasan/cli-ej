import { View, Text, Image, LogBox, YellowBox } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import _ from "lodash";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { refundDetailsStyle } from "./refundDetailsStyle";
import moment from "moment";
import momentTz from "moment-timezone";
const RenderMessage = ({ item, timeZone }) => {
    let [updateMessageData, setUpdateMessageData] = useState(item);
    let array0 = item?.created_at?.split(" ");

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            let currentTimeTzFormat = momentTz()
                .tz(timeZone)
                .format("YYYY-MM-DD HH:mm:ss a");
            let currentTime = `${moment(
                currentTimeTzFormat,
                "YYYY-MM-DD HH:mm a"
            ).format("DD/MM/YYYY HH:mm:ss a")}`;

            let createdTime = `${moment(item?.created_at, "DD/MM/YYYY").format(
                "DD/MM/YYYY"
            )} ${moment(array0[1] + array0[2], "HH:mm a").format("HH:mm a")}`;
            let diffTime = moment(currentTime, "DD/MM/YYYY HH:mm:ss a").diff(
                moment(createdTime, "DD/MM/YYYY HH:mm:ss a")
            );

            let timeDuration = moment.duration(diffTime);

            const handleTime = (text, time) => {
                let newTime = null;
                let createTime = moment(
                    array0[1] + array0[2],
                    "hh:mm a"
                ).format("hh:mm a");
                let createDate = moment(item?.created_at, "DD/MM/YYYY").format(
                    "DD-MMM-YYYY"
                );
                if (text === "minutes" && time < (`0:12:60:0` || `0:0:60:0`)) {
                    let arrayOfTime = time.split(":");

                    if (
                        arrayOfTime[3] < 60 &&
                        (arrayOfTime[2] == -1 || arrayOfTime[2] == 0)
                    ) {
                        newTime = "a few seconds ago";
                        item = { ...item, updateTime: newTime };
                        setUpdateMessageData(item);
                    } else {
                        newTime = `${arrayOfTime[2]} minutes ago`;
                        item = { ...item, updateTime: newTime };
                        setUpdateMessageData(item);
                    }
                } else if (text === "days" && time < `7:0:0:0`) {
                    if (time < `0:24:0:0` && text === "days") {
                        newTime = `Today, ${createTime}`;
                        item = { ...item, updateTime: newTime };
                        setUpdateMessageData(item);
                    } else if (time <= `1:0:0:0` && text === "days") {
                        newTime = `Yesterday, ${createTime}`;
                        item = { ...item, updateTime: newTime };
                        setUpdateMessageData(item);
                    } else {
                        let arrayOfTime = time.split(":");
                        newTime = `${
                            parseInt(arrayOfTime[0]) + 1
                        } days ago, ${createTime}`;
                        item = { ...item, updateTime: newTime };
                        setUpdateMessageData(item);
                    }
                } else if (text === "days" && time > `7:0:0:0`) {
                    newTime = `${createDate} ${createTime}`;
                    item = { ...item, updateTime: newTime };
                    setUpdateMessageData(item);
                }
            };
            let totalTime =
                timeDuration.days() +
                ":" +
                timeDuration.hours() +
                ":" +
                timeDuration.minutes() +
                ":" +
                timeDuration.seconds();
            handleTime("days", totalTime);
            handleTime("minutes", totalTime);
            handleTime("seconds", totalTime);
            handleTime("hours", totalTime);
        }
        return () => {
            isMounted = false;
        };
    }, [item, timeZone]);
    return (
        <View
            style={{
                ...refundDetailsStyle.message,
                justifyContent:
                    updateMessageData?.user_type === "You"
                        ? "flex-end"
                        : "flex-end",
                flexDirection:
                    updateMessageData?.user_type === "You"
                        ? "row"
                        : "row-reverse",
            }}
        >
            <View
                style={{
                    paddingLeft:
                        updateMessageData?.user_type !== "You"
                            ? customPixel.h8
                            : 0,
                    paddingRight:
                        updateMessageData?.user_type === "You"
                            ? customPixel.h8
                            : 0,
                }}
            >
                <View style={refundDetailsStyle.messageTextBg}>
                    <Text
                        style={{
                            ...refundDetailsStyle.messageText,
                            textAlign:
                                updateMessageData?.user_type === "You"
                                    ? "right"
                                    : "left",
                        }}
                    >
                        {updateMessageData?.message}
                    </Text>
                </View>
                <View>
                    <Text
                        style={{
                            ...refundDetailsStyle.messageTime,
                            textAlign:
                                updateMessageData?.user_type === "You"
                                    ? "right"
                                    : "left",
                        }}
                    >
                        {updateMessageData?.updateTime}
                    </Text>
                </View>
            </View>
            {updateMessageData?.user_type === "You" ? (
                <View>
                    <Image
                        source={{
                            uri: `${updateMessageData?.image}`,
                        }}
                        style={refundDetailsStyle.userImage}
                    />
                </View>
            ) : (
                <View>
                    <Image
                        source={{
                            uri: `${updateMessageData?.image}`,
                        }}
                        style={refundDetailsStyle.userImage}
                    />
                </View>
            )}
        </View>
    );
};

export default RenderMessage;
