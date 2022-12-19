import { View, Text } from "react-native";
import React from "react";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";

export const errorToase = {
    color: "#E34659",
    bgColor: "#FFEEEE",
};
export const successToase = {
    color: "#009651",
    bgColor: "#EBF9F1",
};
export const infoToase = {
    color: "#FCCA19",
    bgColor: "#2C2C2C",
};

export const CustomToast = (toast, text, toastStatus) => {
    const { color, bgColor } = toastStatus;
    toast.show({
        render: () => {
            return (
                <View
                    style={{
                        height: customPixel.h45,
                        backgroundColor: bgColor,
                        borderWidth: 1,
                        borderColor: color,
                        borderRadius: 4,
                        paddingHorizontal: customPixel.h15,
                        paddingVertical: customPixel.h5,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        fontFamily: "Roboto_500Medium",
                        fontSize: customPixel.h13,
                        marginBottom: customPixel.h30,
                    }}
                >
                    <Text
                        style={{
                            color: color,
                        }}
                    >
                        {text}
                    </Text>
                </View>
            );
        },
    });
};
