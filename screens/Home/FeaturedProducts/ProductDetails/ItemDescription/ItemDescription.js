import { View, Text, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { itemDescriptionStyle } from "./ItemDescriptionStyle";
import Description from "./pages/Description";
import Specification from "./pages/Specification";
import Videos from "./pages/Videos";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { useRef } from "react";
import { ratingAndReviewsStyle } from "../RatingAndReviews/RatingAndReviewsStyle";

const ItemDescription = ({ productDetails }) => {
    const { description, attributes, attribute_values, videos } =
        productDetails?.data;

    const [showMore, setShowMore] = useState(false);
    const showMoreRef = useRef(true);

    let specification = {};
    for (let key in attributes) {
        if (attributes[key].visibility == 1) {
            if (attributes[key].attribute_id) {
                specification[key] = [];
                for (let item of attributes[key].value) {
                    for (let k in attribute_values[key]) {
                        if (attribute_values[key][k].id == item) {
                            specification[key].push(
                                attribute_values[key][k].value
                            );
                        }
                    }
                }
            } else if (attributes[key].attribute_id === "") {
                specification[key] = attributes[key].value;
            }
        }
    }

    const [navigation, setNavigation] = useState({
        description: description ? true : false,
        specification:
            !description && Object.keys(specification).length > 0
                ? true
                : false,
        videos:
            Object.keys(specification).length === 0 && videos.length > 0
                ? true
                : false,
    });

    const handleDescription = () => {
        setNavigation({
            description: true,
            specification: false,
            videos: false,
        });
    };
    const handleSpecification = () => {
        setNavigation({
            description: false,
            specification: true,
            videos: false,
        });
    };
    const handleVideos = () => {
        setNavigation({
            description: false,
            specification: false,
            videos: true,
        });
    };

    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        if (parseInt(height) > 200) {
            setShowMore(true);
            showMoreRef.current = false;
        }
    };
    const handleShowMore = () => {
        setShowMore(!showMore);
    };
    return (
        <>
            {(description ||
                Object.keys(specification).length > 0 ||
                videos.length > 0) && (
                <View style={ratingAndReviewsStyle.subCont}>
                    <View style={itemDescriptionStyle.container}>
                        <TouchableWithoutFeedback onPress={handleDescription}>
                            <View>
                                {description && (
                                    <View>
                                        <Text
                                            style={
                                                itemDescriptionStyle.headerText
                                            }
                                        >
                                            Description
                                        </Text>
                                        {navigation.description && (
                                            <Indicator />
                                        )}
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleSpecification}>
                            <View>
                                {Object.keys(specification).length > 0 && (
                                    <View>
                                        <Text
                                            style={
                                                itemDescriptionStyle.headerText
                                            }
                                        >
                                            Specification
                                        </Text>
                                        {navigation.specification && (
                                            <Indicator />
                                        )}
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={handleVideos}>
                            <View>
                                {videos.length > 0 && (
                                    <View>
                                        <Text
                                            style={
                                                itemDescriptionStyle.headerText
                                            }
                                        >
                                            Videos
                                        </Text>
                                        {navigation.videos && <Indicator />}
                                    </View>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginHorizontal: -customPixel.h20 }}>
                        {description && navigation.description && (
                            <View>
                                <View
                                    onLayout={
                                        showMoreRef.current && handleLayout
                                    }
                                >
                                    {showMore ? (
                                        <View
                                            style={{
                                                height: customPixel.h250,
                                            }}
                                        >
                                            <Description
                                                description={description}
                                            />
                                        </View>
                                    ) : (
                                        <Description
                                            description={description}
                                        />
                                    )}
                                </View>
                                <View>
                                    {!showMoreRef.current && (
                                        <SeeMore
                                            showMore={showMore}
                                            handleShowMore={handleShowMore}
                                        />
                                    )}
                                </View>
                            </View>
                        )}
                        {Object.keys(specification).length > 0 &&
                            navigation.specification && (
                                <Specification specification={specification} />
                            )}
                        {videos.length > 0 && navigation.videos && <Videos />}
                    </View>
                </View>
            )}
        </>
    );
};

export default ItemDescription;

function Indicator() {
    return (
        <View style={{ position: "relative" }}>
            <View
                style={{
                    borderBottomWidth: 3,
                    borderColor: "#FCCA19",
                    top: 10,
                }}
            />
        </View>
    );
}

function SeeMore({ showMore, handleShowMore }) {
    return (
        <TouchableWithoutFeedback onPress={handleShowMore}>
            <View
                style={{
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "DMSans_500Medium",
                        fontSize: customPixel.h14,
                        color: "#898989",
                        marginVertical: customPixel.h20,
                    }}
                >
                    <Text>{showMore ? "See More" : "See Less"}</Text>
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}
