import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import BackNavigation from "../../../../../Utilities/CustomHeader/BackNavigation";
import CommonStyles from "../../../../../Utilities/CommonStyles/CommonStyles";
import { Rating } from "react-native-ratings";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { reviewStyle } from "./reviewStyle";
import { Box, Progress } from "native-base";
import { ratingAndReviewsStyle } from "../RatingAndReviewsStyle";
import SignatureIcon from "../../../../../../assets/svgs/product details/signature 1.svg";
import config from "../../../../../../config";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../../../../../../redux/slices/featureProducts/reviews/getReviews";

const ratingBar = [
    {
        rating: 5.0,
        value: 90,
    },
    {
        rating: 4.0,
        value: 40,
    },
    {
        rating: 3.0,
        value: 20,
    },
    {
        rating: 2.0,
        value: 0,
    },
    {
        rating: 1.0,
        value: 0,
    },
];
const revireImg = [
    require("../../../../../../assets/images/productDetails/reviewImh1.png"),
    require("../../../../../../assets/images/productDetails/reviewImh2.png"),
];

const Reviews = (props) => {
    const { customerGallery, avgRating, id, productDetails } =
        props.route.params;
    const URL = `${config.BASE_API_URL}/user/reviews/${id}`;

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
    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <ScrollView>
                {Reviews?.length ? (
                    <View style={CommonStyles.globalContainer}>
                        <View style={reviewStyle.titleCont}>
                            <Text style={reviewStyle.reviewCount}>
                                {avgRating.toFixed(2)}
                            </Text>
                            <Rating
                                type='custom'
                                ratingColor='#FCCA19'
                                tintColor='#fff'
                                ratingBackgroundColor='#C8C8C8'
                                startingValue={avgRating}
                                imageSize={customPixel.h25}
                                readonly={true}
                                fractions={10}
                            />
                            <Text style={reviewStyle.reviewAverage}>
                                Average of {Reviews?.length} reviews
                            </Text>
                        </View>
                        <View style={reviewStyle.reviewBarCont}>
                            {ratingBar.map((item, index) => (
                                <View
                                    key={`key${index}`}
                                    style={reviewStyle.reviewProgressCont}
                                >
                                    <Text style={reviewStyle.ratingText}>
                                        {item.rating.toFixed(1)}
                                    </Text>
                                    <Progress
                                        bg='coolGray.200'
                                        _filledTrack={{
                                            bg: "yellow.400",
                                        }}
                                        value={item.value}
                                        style={reviewStyle.ratingBar}
                                    />
                                </View>
                            ))}
                        </View>
                        <View>
                            <View style={reviewStyle.CGCont}>
                                <Text style={reviewStyle.CGText}>
                                    Customers Gallery
                                </Text>
                                <Text style={reviewStyle.CGText}>
                                    ({customerGallery})
                                </Text>
                            </View>
                        </View>
                        <>
                            <View style={reviewStyle.CGCont}>
                                <Text style={reviewStyle.CGText}>
                                    Feedbacks
                                </Text>
                                <Text style={reviewStyle.CGText}>
                                    ({Reviews?.length})
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingBottom: customPixel.h20,
                                }}
                            >
                                {Reviews.map((item, index) => (
                                    <View
                                        key={`key${index}`}
                                        style={{
                                            paddingBottom:
                                                index + 1 === Reviews?.length
                                                    ? 0
                                                    : 20,
                                            borderBottomWidth:
                                                index + 1 === Reviews?.length
                                                    ? 0
                                                    : 1,
                                            borderBottomColor: "#DFDFDF",
                                        }}
                                    >
                                        <View
                                            style={
                                                ratingAndReviewsStyle.userCont
                                            }
                                        >
                                            <View
                                                style={
                                                    ratingAndReviewsStyle.userSubCont
                                                }
                                            >
                                                <Image
                                                    source={{
                                                        uri: item.user_image,
                                                    }}
                                                    style={
                                                        ratingAndReviewsStyle.userImg
                                                    }
                                                />
                                                <View>
                                                    <Text
                                                        style={
                                                            ratingAndReviewsStyle.userName
                                                        }
                                                    >
                                                        {item.user_name}
                                                    </Text>
                                                    <Text
                                                        style={
                                                            ratingAndReviewsStyle.time
                                                        }
                                                    >
                                                        {item?.created_at}
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
                                                        item?.rating
                                                    )}
                                                    imageSize={customPixel.h17}
                                                    readonly={true}
                                                    fractions={10}
                                                />
                                            </View>
                                        </View>
                                        <Text
                                            style={ratingAndReviewsStyle.text}
                                        >
                                            {item?.comments}
                                        </Text>
                                        <View
                                            style={
                                                ratingAndReviewsStyle.reviewImgCont
                                            }
                                        >
                                            {item.image.map((item, i) => (
                                                <View key={`key-${i}`}>
                                                    <Image
                                                        source={{ uri: item }}
                                                        style={
                                                            ratingAndReviewsStyle.revireImg
                                                        }
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    </View>
                ) : (
                    <View>
                        <Text>Loading</Text>
                    </View>
                )}
            </ScrollView>
            <View style={reviewStyle.writeReviewCont}>
                <TouchableOpacity
                    style={reviewStyle.writeReview}
                    onPress={() =>
                        props.navigation.navigate("Write a Review", {
                            reviews: Reviews,
                            productDetails: productDetails,
                            avgRating: avgRating,
                        })
                    }
                >
                    <SignatureIcon
                        height={customPixel.h24}
                        width={customPixel.h24}
                    />
                    <Text style={reviewStyle.writeText}>Write a Review</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Reviews;
