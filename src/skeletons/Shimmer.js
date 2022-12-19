import { View, Animated } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { skeletonStyle } from "./skeletonStyle";

const shimmeringAnimatedValue = new Animated.Value(0);
const ShimmringAnimation = Animated.loop(
    Animated.timing(shimmeringAnimatedValue, {
        useNativeDriver: false,
        delay: 500,
        duration: 450,
        toValue: 1,
    })
);

const Shimmer = ({ wrapperStyle }) => {
    const [viewWidth, setViewWidth] = useState(-1);
    let animation = ShimmringAnimation;
    const startAnimation = () => {
        animation.start();
    };

    const _onLayoutChange = (event) => {
        setViewWidth(event.nativeEvent.layout.width);
        startAnimation();
    };

    const _getLeftValue = () => {
        return shimmeringAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-viewWidth, viewWidth],
        });
    };
    return (
        <View
            style={{
                width: wrapperStyle?.width,
                height: wrapperStyle?.height,
            }}
        >
            <View
                style={[skeletonStyle.shimmer, wrapperStyle]}
                onLayout={(event) => _onLayoutChange(event)}
            >
                <Animated.View style={[{ flex: 1, left: _getLeftValue() }]}>
                    <LinearGradient
                        colors={["#ebebeb", "#fafafa"]}
                        start={{ x: 0.1, y: 0.1 }}
                        end={{ x: 0.9, y: 0.9 }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default Shimmer;
