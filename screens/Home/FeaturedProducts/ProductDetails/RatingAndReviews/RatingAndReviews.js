import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ratingAndReviewsStyle } from "./RatingAndReviewsStyle";
import TopIcon from "../../../../../assets/svgs/dropdown/up.svg";
import Rightcon from "../../../../../assets/svgs/product details/rightIcon.svg";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { Rating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../../../../hooks/useAuth";
import { getReviews } from "../../../../../redux/slices/featureProducts/reviews/getReviews";
import config from "../../../../../config";
import { useEffect } from "react";
import { reviewStyle } from "./Reviews/reviewStyle";
import SignatureIcon from "../../../../../assets/svgs/product details/signature 1.svg";
const revireImg = [
    require("../../../../../assets/images/productDetails/reviewImh1.png"),
    require("../../../../../assets/images/productDetails/reviewImh2.png"),
];

const iconHeight = customPixel.h16;
const iconWidth = customPixel.h12;

const RatingAndReviews = ({ productDetails }) => {
    const { id } = productDetails?.data;
    let rating,
        avgRating,
        cumRating = [],
        imgCon = [],
        customerGallery;

    const URL = `${config.BASE_API_URL}/user/reviews/${id}`;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { Reviews, loading, isRefresh } = useSelector(
        (state) => state.getReviews
    );

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            dispatch(getReviews(URL));
        }
        return () => {
            isMounted = false;
        };
    }, []);

    if (Reviews?.length) {
        imgCon = Reviews.map((review) => review.image.length);
        customerGallery = imgCon.reduce((partialSum, a) => partialSum + a, 0);

        rating = Reviews.map((review) => parseInt(review.rating));
        cumRating = rating.reduce((partialSum, a) => partialSum + a, 0);
        avgRating = cumRating / Reviews?.length;
    }
    return (
        <>
            <View style={ratingAndReviewsStyle.subCont}>
                {Reviews?.length ? (
                    <View style={ratingAndReviewsStyle.container}>
                        <View style={ratingAndReviewsStyle.titleCont}>
                            <Text style={ratingAndReviewsStyle.title}>
                                Rating & Reviews: {avgRating.toFixed(2)} (
                                {Reviews.length})
                            </Text>
                            <TopIcon width={iconWidth} height={iconHeight} />
                        </View>
                        <View>
                            <View style={ratingAndReviewsStyle.userCont}>
                                <View style={ratingAndReviewsStyle.userSubCont}>
                                    <Image
                                        source={{ uri: Reviews[0].user_image }}
                                        style={ratingAndReviewsStyle.userImg}
                                    />
                                    <View>
                                        <Text
                                            style={
                                                ratingAndReviewsStyle.userName
                                            }
                                        >
                                            {Reviews[0].user_name}
                                        </Text>
                                        <Text
                                            style={ratingAndReviewsStyle.time}
                                        >
                                            {Reviews[0].created_at}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Rating
                                        style={{
                                            marginRight: "auto",
                                        }}
                                        type='custom'
                                        ratingColor='#FCCA19'
                                        tintColor='#fff'
                                        ratingBackgroundColor='#C8C8C8'
                                        startingValue={parseInt(
                                            Reviews[0].rating
                                        )}
                                        imageSize={customPixel.h17}
                                        readonly={true}
                                        fractions={10}
                                    />
                                </View>
                            </View>
                            <Text style={ratingAndReviewsStyle.text}>
                                {Reviews[0].comments}
                            </Text>
                            <View style={ratingAndReviewsStyle.reviewImgCont}>
                                {Reviews[0].image.map((img, i) => (
                                    <View key={`key-${i}`}>
                                        <Image
                                            source={{ uri: img }}
                                            style={
                                                ratingAndReviewsStyle.revireImg
                                            }
                                        />
                                    </View>
                                ))}
                            </View>
                            <View style={ratingAndReviewsStyle.seeAllBorder}>
                                <TouchableOpacity
                                    style={ratingAndReviewsStyle.seeAllCont}
                                    onPress={() =>
                                        navigation.navigate("reviews", {
                                            avgRating: avgRating,
                                            id: id,
                                            productDetails:
                                                productDetails?.data,
                                            customerGallery: customerGallery,
                                        })
                                    }
                                >
                                    <Text
                                        style={ratingAndReviewsStyle.seeAlltext}
                                    >
                                        See All
                                    </Text>
                                    <Rightcon
                                        width={customPixel.h11}
                                        height={customPixel.h11}
                                        fill={"#898989"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View style={style.noRevContainer}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: "#DFDFDF",
                                borderRadius: customPixel.h6,
                                paddingVertical: customPixel.h20,
                            }}
                        >
                            <View>
                                <Rating
                                    type='custom'
                                    ratingColor='#FCCA19'
                                    tintColor='#fff'
                                    ratingBackgroundColor='#C8C8C8'
                                    startingValue={parseInt(0)}
                                    imageSize={customPixel.h17}
                                    readonly={true}
                                />
                            </View>
                            <View style={{ paddingVertical: customPixel.h12 }}>
                                <Text style={style.noRevText}>
                                    No Reviews Yet
                                </Text>
                                <Text
                                    style={[
                                        style.noRevText,
                                        style.firstRevtext,
                                    ]}
                                >
                                    Be the first to review this item
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    reviewStyle.writeReview,
                                    style.writeRevCon,
                                ]}
                                onPress={() =>
                                    navigation.navigate("Write a Review", {
                                        reviews: Reviews,
                                        productDetails: productDetails?.data,
                                        avgRating: avgRating,
                                        customerGallery: customerGallery,
                                    })
                                }
                            >
                                <SignatureIcon
                                    height={customPixel.h24}
                                    width={customPixel.h24}
                                />
                                <Text style={reviewStyle.writeText}>
                                    Write a Review
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        </>
    );
};

export default RatingAndReviews;

const style = StyleSheet.create({
    noRevContainer: {
        backgroundColor: "white",
        // paddingHorizontal: customPixel.h20,
        paddingVertical: customPixel.h20,
    },
    noRevText: {
        fontSize: customPixel.h16,
        color: "#898989",
        fontFamily: "DMSans_500Medium",
        textAlign: "center",
    },
    firstRevtext: {
        color: "#2c2c2c",
        paddingTop: customPixel.h20,
        fontSize: customPixel.h14,
    },
    writeRevCon: {
        backgroundColor: "#F3F3F3",
        paddingVertical: customPixel.h13,
        marginHorizontal: customPixel.h40,
        borderRadius: customPixel.h6,
    },
});
