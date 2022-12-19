import React from "react";
import { refundDetailsStyle } from "./refundDetailsStyle";
import ProgressiveImage from "../../../../../src/components/ProgressiveImage";

const RenderImage = ({ item }) => {
    return (
        <ProgressiveImage
            source={{ uri: item }}
            style={refundDetailsStyle.uploadPic}
        />
    );
};

export default RenderImage;
