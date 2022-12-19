import { View, StatusBar, StyleSheet } from "react-native";
import React from "react";

const MyStatusBar = ({ backgroundColor, batStyle = "light-content" }) => {
    return (
        <View style={styles.statusBar}>
            <StatusBar backgroundColor={backgroundColor} barStyle={batStyle} />
        </View>
    );
};

const styles = StyleSheet.create({
    statusBar: {},
});

export default MyStatusBar;
