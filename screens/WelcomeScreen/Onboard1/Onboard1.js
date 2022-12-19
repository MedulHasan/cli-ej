import { View, Text, Dimensions } from "react-native";
import React from "react";
import { Onboard1Style } from "./Onboard1Style";
const { width, height } = Dimensions.get("window");

const imageHeight = height * 0.6;
const imaegWidth = width * 0.6;

const Onboard1 = ({ item, currentSlideIndex }) => {
    const { Image, title1, title2, title3, title4, text1, text2 } = item;
    return (
        <View style={Onboard1Style.container}>
            {currentSlideIndex === 0 && (
                <>
                    {
                        <Image
                            height={imageHeight}
                            width={imaegWidth}
                            style={Onboard1Style.illustration1}
                        />
                    }
                    <View style={Onboard1Style.titleContainer}>
                        <Text style={Onboard1Style.title}>{title1}</Text>
                        <Text style={Onboard1Style.title}>{title2}</Text>
                        <Text style={Onboard1Style.title}>{title3}</Text>
                        <Text style={Onboard1Style.title}>{title4}</Text>
                    </View>
                    <View style={Onboard1Style.textContainet}>
                        <Text style={Onboard1Style.text}>{text1}</Text>
                        <Text style={Onboard1Style.text}>{text2}</Text>
                    </View>
                </>
            )}
            {currentSlideIndex === 1 && (
                <>
                    <Image
                        height={imageHeight + height * 0.04}
                        width={imaegWidth + height * 0.04}
                        style={Onboard1Style.illustration2}
                    />
                    <View style={Onboard1Style.titleContainer2}>
                        <Text style={Onboard1Style.title2}>{title1}</Text>
                        <Text style={Onboard1Style.title2}>{title2}</Text>
                        <Text style={Onboard1Style.title2}>{title3}</Text>
                        <Text style={Onboard1Style.title2}>{title4}</Text>
                    </View>
                    <View style={Onboard1Style.textContainet2}>
                        <Text style={Onboard1Style.text2}>{text1}</Text>
                        <Text style={Onboard1Style.text2}>{text2}</Text>
                    </View>
                </>
            )}
            {currentSlideIndex === 2 && (
                <View style={{}}>
                    <Image
                        height={imageHeight + 65}
                        width={imaegWidth + 65}
                        style={Onboard1Style.illustration3}
                    />
                    <View style={Onboard1Style.titleContainer3}>
                        <Text style={Onboard1Style.title3}>{title1}</Text>
                        <Text style={Onboard1Style.title3}>{title2}</Text>
                        <Text style={Onboard1Style.title3}>{title3}</Text>
                        <Text style={Onboard1Style.title3}>{title4}</Text>
                    </View>
                    <View style={Onboard1Style.textContainet3}>
                        <Text style={Onboard1Style.text3}>{text1}</Text>
                        <Text style={Onboard1Style.text3}>{text2}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Onboard1;
