import * as React from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const Videos = () => {
    const video = useRef(null);
    const [status, setStatus] = useState({});

    useEffect(async () => {}, [status.isPlaying]);

    return (
        <View style={styles.container}>
            <Video
                ref={video}
                usePoster
                // posterSource={require("../../../../../../assets/icons/logo.png")}
                style={styles.video}
                source={{
                    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                useNativeControls
                resizeMode='contain'
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <Button
                style={styles.buttons}
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={() =>
                    status.isPlaying
                        ? video.current.pauseAsync()
                        : video.current.playAsync()
                }
            />
        </View>
    );
};

export default Videos;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    video: {
        alignSelf: "center",
        width: customPixel.wF,
        height: 200,
        marginTop: 20,
    },
    buttons: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
});
