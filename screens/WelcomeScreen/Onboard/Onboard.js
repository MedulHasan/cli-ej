import {
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Text,
} from "react-native";
import React from "react";
import Onboard1 from "../Onboard1/Onboard1";
import Illustration1 from "../../../assets/svgs/Illustration 1.svg";
import Illustration2 from "../../../assets/svgs/Illustration 2.svg";
import Illustration3 from "../../../assets/svgs/Illustration 3.svg";
import { OnboardStyle } from "./OnboardStyle";
import { useState } from "react";
import { Onboard1Style } from "../Onboard1/Onboard1Style";
import NextButton from "../../../assets/svgs/refund/rightArrow.svg";
import { useRef } from "react";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";

const { height, width } = Dimensions.get("window");

const slider = [
    {
        key: 1,
        Image: Illustration1,
        title1: "Your",
        title2: "all-in-one",
        title3: "online shopping",
        title4: "solution",
        text1: "We provide everything that you desire",
        text2: "from an e-commerce",
    },
    {
        key: 2,
        Image: Illustration2,
        title1: "Fully",
        title2: "optimized",
        title3: "& secured for you",
        title4: "to shop at ease",
        text1: "We provide multiple payment methods",
        text2: "with powerful transaction security",
    },
    {
        key: 3,
        Image: Illustration3,
        title1: "Bringing you",
        title2: "the best shopping",
        title3: "experience",
        title4: "",
        text1: "Made with love by the best",
        text2: "designers & developers",
    },
];

const Onboard = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef(null);
    const Slide = ({ item }) => {
        return <Onboard1 item={item} currentSlideIndex={currentSlideIndex} />;
    };
    const Header = () => {
        return (
            <View style={OnboardStyle.indicatorContainer}>
                {slider.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            OnboardStyle.indicator,
                            currentSlideIndex === index && {
                                backgroundColor: "#FCCA19",
                                width: 55,
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };
    const Footer = () => {
        return (
            <View>
                {currentSlideIndex === slider.length - 1 ? (
                    <View
                        style={[
                            Onboard1Style.move,
                            {
                                justifyContent: "center",
                                paddingBottom:
                                    height > 533 && height < 781 ? 10 : 30,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.replace("show-always")}
                            style={OnboardStyle.getStart}
                        >
                            <Text style={OnboardStyle.getStartText}>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={Onboard1Style.move}>
                        <TouchableOpacity onPress={skipSlide}>
                            <Text style={Onboard1Style.skip}>Skip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={goNextSlide}
                            style={OnboardStyle.nextBtn}
                        >
                            <NextButton
                                height={customPixel.h15}
                                width={customPixel.h24}
                                fill={"#2C2C2C"}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex !== slider.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex);
        }
    };
    const skipSlide = () => {
        const lastSlideIndex = slider.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };
    return (
        <>
            <Header />
            <FlatList
                ref={ref}
                data={slider}
                horizontal
                renderItem={({ item }) => <Slide item={item} />}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={updateCurrentSlideIndex}
                scrollEnabled={false}
            />
            <Footer />
        </>
    );
};

export default Onboard;
