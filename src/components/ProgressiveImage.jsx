import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { useState } from "react";

const ProgressiveImage = ({ source, style }) => {
    const [loading, setLoading] = useState(true);
    return (
        <View style={styles.container}>
            <Image
                source={source}
                onLoadStart={() => {
                    setLoading(true);
                }}
                onLoadEnd={() => {
                    setLoading(false);
                }}
                style={style}
            />
            {loading && (
                <View style={styles.imageOverlay}>
                    <Image
                        source={require("../../assets/images/image-loader-icon.png")}
                        style={style}
                    />
                </View>
            )}
        </View>
    );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
    },
    imageOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#1F1F1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
});
