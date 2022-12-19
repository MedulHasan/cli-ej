import { View, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { bannerStyle } from "./homeBannerStyle";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import config from "../../../config";
import { fetchGetItem } from "../../../redux/slices/util/fetchGetItem";
import SkeletonElement from "../../../src/skeletons/SkeletonElement";
import ProgressiveImage from "../../../src/components/ProgressiveImage";

const { width, height } = Dimensions.get("window");

let flatList;

const RenderItem = ({ item }) => {
    return (
        <ProgressiveImage
            style={bannerStyle.image}
            source={{
                uri: item.image,
            }}
        />
    );
};

const HomeBanner = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        (async () => {
            if (banner?.length > 0) {
                const numberOfData = banner.length;
                let scrollValue = 0;
                let scrolled = 0;
                let isMounted = true;
                let interval = setInterval(() => {
                    scrolled++;
                    if (!isMounted) return;
                    setCurrentSlideIndex(scrolled);
                    if (scrolled < numberOfData) {
                        scrollValue = scrollValue + width - customPixel.w20 * 2;
                    } else {
                        scrollValue = 0;
                        setCurrentSlideIndex(0);
                        scrolled = 0;
                    }
                    flatList?.scrollToOffset({
                        animated: true,
                        offset: scrollValue,
                    });
                }, 4000);

                return () => {
                    clearInterval(interval);

                    isMounted = false;
                };
            }
        })();
    }, [banner]);
    useEffect(() => {
        (async () => {
            let isMLeck = true;
            if (banner?.length === 0 && isMLeck) {
                let URL = `${config.BASE_API_URL}/sliders`;
                let result = await fetchGetItem(URL);
                setBanner(result?.response?.records?.data[0]?.slide);
            }
            return () => {
                isMLeck = false;
            };
        })();
    }, [banner]);

    const updateCurrentSlideIndex = (e) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };
    return (
        <View style={{ paddingTop: 10 }}>
            {banner?.length === 0 ? (
                <SkeletonElement
                    wrapperStyle={{
                        width: width,
                        height: height * 0.2,
                        marginBottom: customPixel.h10,
                    }}
                />
            ) : (
                <>
                    <FlatList
                        ref={(flat) => {
                            flatList = flat;
                        }}
                        data={banner}
                        keyExtractor={(_, index) => "key" + index}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment='center'
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <RenderItem item={item} />}
                        onMomentumScrollEnd={updateCurrentSlideIndex}
                        overScrollMode='never'
                    />
                    <View style={bannerStyle.indicatorContainer}>
                        {banner.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    bannerStyle.indicator,
                                    currentSlideIndex === index && {
                                        backgroundColor: "#FCCA19",
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </>
            )}
        </View>
    );
};

export default HomeBanner;
