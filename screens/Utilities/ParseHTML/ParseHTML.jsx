import React from "react";
import { Dimensions } from "react-native";
import RenderHtml from "react-native-render-html";

const ParseHTML = ({ description }) => {
    const { width } = Dimensions.get("screen");
    const source = {
        html: description,
    };
    return description && <RenderHtml contentWidth={width} source={source} />;
};

export default ParseHTML;
