import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import LeftIcon from "../../../../../assets/svgs/product details/leftIcon.svg";
import RightIcon from "../../../../../assets/svgs/product details/rightIcon.svg";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { itemCarouselStyle } from "./ItemCarouselStyle";
import ProgressiveImage from "../../../../../src/components/ProgressiveImage";

const { width } = Dimensions.get("screen");

const moveHeight = customPixel.h15;
const moveWidth = customPixel.h10;

const RenderItem = ({ item }) => {
    return (
        <View style={itemCarouselStyle.singleImgCont}>
            <ProgressiveImage
                source={{
                    uri: item,
                }}
                style={itemCarouselStyle.imageSize}
            />
        </View>
    );
};
let scrollValue = 0;
let scrolled = 0;
let flatList;
const ItemCarousel = ({ images }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const moveBack = () => {
        if (scrolled === 0) {
            return;
        } else {
            scrolled--;
            setCurrentSlideIndex(scrolled);
            scrollValue = scrollValue - customPixel.wF;
        }
        flatList?.scrollToOffset({
            animated: true,
            offset: scrollValue,
        });
    };
    const moveNext = () => {
        if (scrolled === images?.length - 1) {
            return;
        } else {
            scrolled++;
            setCurrentSlideIndex(scrolled);
            if (scrolled < images?.length) {
                scrollValue = scrollValue + customPixel.wF;
            }
            flatList?.scrollToOffset({
                animated: true,
                offset: scrollValue,
            });
        }
    };
    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        scrollValue = contentOffsetX;
        const currentIndex = Math.round(scrollValue / width);
        scrolled = currentIndex;
        setCurrentSlideIndex(currentIndex);
    };
    return (
        <View>
            <TouchableOpacity
                style={itemCarouselStyle.leftIcon}
                onPress={moveBack}
            >
                <LeftIcon
                    height={moveHeight}
                    width={moveWidth}
                    fill={currentSlideIndex === 0 ? "#DFDFDF" : "#898989"}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={itemCarouselStyle.rightIcon}
                onPress={moveNext}
            >
                <RightIcon
                    height={moveHeight}
                    width={moveWidth}
                    fill={
                        currentSlideIndex === images?.length - 1
                            ? "#DFDFDF"
                            : "#898989"
                    }
                />
            </TouchableOpacity>
            <FlatList
                ref={(flat) => {
                    flatList = flat;
                }}
                data={images}
                keyExtractor={(_, index) => "key" + index}
                listKey={(_, i) => `list-a${i}`}
                renderItem={({ item }) => <RenderItem item={item} />}
                horizontal
                pagingEnabled
                scrollEnabled={true}
                snapToAlignment='center'
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                overScrollMode='never'
            />
            <View style={itemCarouselStyle.indidatorCont}>
                {images.map((_, index) => (
                    <View
                        key={`key${index}`}
                        style={[
                            itemCarouselStyle.indicator,
                            currentSlideIndex === index && {
                                backgroundColor: "#FCCA19",
                                width: customPixel.h30,
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

export default ItemCarousel;
