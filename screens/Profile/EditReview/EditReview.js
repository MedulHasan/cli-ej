import { useToast } from "native-base";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
} from "react-native";
import { Rating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import PlusIcon from "../../../assets/svgs/cart/plus.svg";
import TimesIcon from "../../../assets/svgs/drawer/times.svg";
import DeleteIcon from "../../../assets/svgs/my wishlist/delete icon.svg";
import config from "../../../config";
import useAuth from "../../../hooks/useAuth";
import { getMyReviews } from "../../../redux/slices/user/myReviews/getMyReviews";
import { postNewReview } from "../../../redux/slices/user/myReviews/postUpdateReview";
import ProgressiveImage from "../../../src/components/ProgressiveImage";
import { writeReviewStyle } from "../../Home/FeaturedProducts/ProductDetails/RatingAndReviews/WriteReviews/WriteReviewsStyle";
import CommonStyles from "../../Utilities/CommonStyles/CommonStyles";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import CustomSpinner from "../../Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import {
    CustomToast,
    errorToase,
    successToase,
} from "../../Utilities/CustomToast/CustomToast";
import { uploadImages } from "../../Utilities/UploadImages/UploadImages";
const { height, width } = Dimensions.get("window");

let URL = `${config.BASE_API_URL}/user/reviews`;
const EditReview = (props) => {
    let maxLength = 500;
    const dispatch = useDispatch();
    const toast = useToast();
    const { access_token } = useAuth();
    const [enableUpdate, setEnableUpdate] = useState(false);
    const { loading } = useSelector((state) => state.postNewReview);

    const {
        comments,
        created_at,
        product_name,
        rating,
        image,
        id,
        product_image,
    } = props.route.params.item;
    const dropdownRef1 = props.route.params.dropdownRef1;
    const dropdownRef2 = props.route.params.dropdownRef2;
    const setDate = props.route.params.setDate;
    const setStatus = props.route.params.setStatus;

    const initialReview = {
        comments: comments,
        image: image,
    };
    const [stars, setStars] = useState(rating);
    const [review, setReview] = useState(initialReview);
    const [img, setImg] = useState({});
    const getImages = async () => {
        const images = await uploadImages(review.image);
        if (Object.keys(images).length > 0) {
            setImg(images);
            setReview({ ...review, image: [...review.image, images.uri] });
            setEnableUpdate(true);
        }
    };

    const ratingCompleted = (r) => {
        let ratingValue = r.toFixed(1);
        setStars(parseInt(ratingValue));
        setEnableUpdate(true);
    };

    const getComments = (newText) => {
        setReview({ ...review, comments: newText });
        setEnableUpdate(true);
    };

    const handleRemoveImage = async (i) => {
        const DELETEURL = `${config.BASE_API_URL}/user/review/delete-file`;
        if (!`${review.image[i]}`.startsWith("https")) {
            if (`${review.image[i]}` === img.uri) {
                setImg({});
            }
            let result = review.image.filter(
                (index) => index != `${review.image[i]}`
            );
            setReview({ ...review, image: result });
            result = [];
            alert("File removed successfully");
        } else {
            await fetch(DELETEURL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({ path: `${review.image[i]}` }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data?.response?.status?.code === 200) {
                        setEnableUpdate(true);
                        let r = review.image.filter(
                            (index) => index != `${review.image[i]}`
                        );
                        setReview({ ...review, image: r });
                        r = [];
                        alert(data.response.records.message);
                        return data.response;
                    } else {
                        alert("Something wrong");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleReviewUpdate = async (id) => {
        review.rating = stars;
        const updateRevUrl = `${config.BASE_API_URL}/user/review/update/${id}`;
        let formData = new FormData();
        formData.append("comments", review.comments);
        formData.append("rating", review.rating);
        img.uri ? formData.append("image", img) : "";
        let newReview = await dispatch(
            postNewReview({
                access_token,
                updateRevUrl,
                method: "POST",
                formData,
            })
        );
        let { code, message } = newReview?.payload?.status;

        if (code === 200) {
            CustomToast(toast, "Review updated successfully", successToase);
            dispatch(getMyReviews({ access_token, URL }));
            setStatus("");
            setDate("");
            dropdownRef1?.current?.reset();
            dropdownRef2?.current?.reset();
            props.navigation.navigate("my reviews");
        } else {
            CustomToast(toast, "Review updated failed", errorToase);
        }
    };

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <View
                style={{
                    position: "absolute",
                    right: customPixel.h20,
                    top: height < 534 ? customPixel.h20 : customPixel.h26,
                }}
            >
                <TouchableOpacity>
                    <DeleteIcon
                        height={customPixel.h19}
                        width={customPixel.h19}
                        fill={"#898989"}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView keyboardShouldPersistTaps='always'>
                <View style={CommonStyles.globalContainer}>
                    <View style={writeReviewStyle.imgRatingCon}>
                        <View style={writeReviewStyle.imgCon}>
                            <Image
                                source={{ uri: product_image }}
                                style={writeReviewStyle.productImg}
                            />
                        </View>
                        <View>
                            <Text style={writeReviewStyle.productName}>
                                {product_name}
                            </Text>
                            <View style={writeReviewStyle.ratingCon}>
                                <View>
                                    <Rating
                                        style={{
                                            marginLeft: customPixel.h14,
                                            marginRight: "auto",
                                        }}
                                        type='custom'
                                        ratingColor='#FCCA19'
                                        tintColor='#fff'
                                        ratingBackgroundColor='#C8C8C8'
                                        startingValue={parseInt(rating)}
                                        imageSize={customPixel.h17}
                                        readonly={true}
                                        fractions={10}
                                    />
                                </View>
                                <View>
                                    <Text style={writeReviewStyle.ratingCount}>
                                        {rating} (307)
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={editReviewStyle.reviewDateCon}>
                        <Text style={editReviewStyle.reviewText}>
                            Reviewed on
                        </Text>
                        <Text style={editReviewStyle.reviewText}>
                            {created_at}
                        </Text>
                    </View>
                    <View style={writeReviewStyle.addRatingsCon}>
                        <Text style={writeReviewStyle.addRatingText}>
                            Your Ratings
                        </Text>
                        <View style={writeReviewStyle.addRatingCon}>
                            <View>
                                <Rating
                                    type='custom'
                                    ratingColor='#FCCA19'
                                    tintColor='#fff'
                                    ratingBackgroundColor='#C8C8C8'
                                    startingValue={parseInt(rating)}
                                    imageSize={customPixel.h30}
                                    onFinishRating={ratingCompleted}
                                />
                            </View>
                            <View>
                                <Text style={writeReviewStyle.ratingText}>
                                    {stars} Stars
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={writeReviewStyle.addRatingsCon}>
                        <Text style={writeReviewStyle.addRatingText}>
                            Your Photos
                        </Text>
                        <View style={editReviewStyle.imgContainer}>
                            {review.image.map((img, i) => {
                                return (
                                    <View key={i}>
                                        <ProgressiveImage
                                            source={{ uri: img }}
                                            style={editReviewStyle.imgStyle}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleRemoveImage(i)}
                                            style={{
                                                backgroundColor: "#FCCA19",
                                                position: "absolute",
                                                bottom: customPixel.h54,
                                                right: customPixel.h7,
                                                borderRadius: customPixel.h10,
                                                padding: customPixel.h5,
                                            }}
                                        >
                                            <TimesIcon
                                                fill='#2c2c2c'
                                                width={height * 0.014}
                                                height={height * 0.014}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                            <TouchableOpacity onPress={getImages}>
                                <View style={editReviewStyle.addPhotosCon}>
                                    <PlusIcon
                                        height={customPixel.h16}
                                        width={customPixel.h16}
                                        fill={"#c4c4c4"}
                                    ></PlusIcon>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={writeReviewStyle.addRatingsCon}>
                        <Text style={writeReviewStyle.addRatingText}>
                            Your Experience
                        </Text>
                        <View>
                            <TextInput
                                style={writeReviewStyle.textInputStyle}
                                multiline
                                numberOfLines={8}
                                maxLength={maxLength}
                                onChangeText={getComments}
                                defaultValue={comments}
                                onSubmitEditing={Keyboard.dismiss}
                            ></TextInput>
                        </View>
                        <Text style={writeReviewStyle.remainingChar}>
                            {maxLength - review?.comments?.length} characters
                            remaining
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                disabled={enableUpdate ? false : true}
                onPress={!loading ? () => handleReviewUpdate(id) : null}
            >
                <View style={writeReviewStyle.submitReview}>
                    <View
                        style={[
                            writeReviewStyle.submitReviewCon,
                            {
                                backgroundColor: enableUpdate
                                    ? "#FCCA19"
                                    : "#F3F3F3",
                            },
                        ]}
                    >
                        {enableUpdate && loading ? (
                            <CustomSpinner
                                filePath={require("../../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h50,
                                }}
                            />
                        ) : (
                            <Text
                                style={[
                                    writeReviewStyle.submitReviewText,
                                    {
                                        color: enableUpdate
                                            ? "#2c2c2c"
                                            : "#898989",
                                    },
                                ]}
                            >
                                Update Review
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default EditReview;

export const editReviewStyle = StyleSheet.create({
    reviewDateCon: {
        marginTop: customPixel.h20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    reviewText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h14,
        color: "#898989",
    },
    imgContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imgStyle: {
        height: customPixel.h56,
        width: customPixel.h56,
        borderRadius: 4,
        marginRight: customPixel.h12,
        marginBottom: customPixel.h12,
        position: "relative",
    },
    addPhotosCon: {
        backgroundColor: "#F3F3F3",
        height: customPixel.h56,
        width: customPixel.h56,
        borderRadius: 4,
        borderStyle: "dashed",
        borderColor: "#898989",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
