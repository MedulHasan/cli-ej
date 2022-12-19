import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { useToast } from "native-base";
import React, { useState } from "react";
import BackNavigation from "../../../../../Utilities/CustomHeader/BackNavigation";
import { writeReviewStyle } from "./WriteReviewsStyle";
import CommonStyles from "../../../../../Utilities/CommonStyles/CommonStyles";
import { Rating } from "react-native-ratings";
import { customPixel } from "../../../../../Utilities/CustomStyleAttribute/CustomPixel";
import UploadIcon from "../../../../../../assets/svgs/reviews/upload-photo-icon.svg";
import * as ImagePicker from "expo-image-picker";
import { editReviewStyle } from "../../../../../Profile/EditReview/EditReview";
import PlusIcon from "../../../../../../assets/svgs/cart/plus.svg";
import config from "../../../../../../config";
import useAuth from "../../../../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../../../../../redux/slices/featureProducts/reviews/postReviews";
import {
    CustomToast,
    errorToase,
    successToase,
} from "../../../../../Utilities/CustomToast/CustomToast";
import { getReviews } from "../../../../../../redux/slices/featureProducts/reviews/getReviews";
import CustomSpinner from "../../../../../Utilities/CustomSpinner/CustomSpinner";

let URL = `${config.BASE_API_URL}/user/review/store`;
const WriteReviews = (props) => {
    const { access_token } = useAuth();
    const dispatch = useDispatch();
    const toast = useToast();
    const { reviews, productDetails, avgRating } = props?.route?.params;
    let { loading } = useSelector((state) => state.postReview);
    const { id } = productDetails;
    const url = `${config.BASE_API_URL}/user/reviews/${id}`;
    let maxLength = 500;

    const [text, setText] = useState("");
    const [stars, setStars] = useState(0);
    const [images, setImages] = useState([]);
    const [img, setImg] = useState({});
    const reviewData = {};
    const uploadImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });
        if (!result.cancelled) {
            let filename = result.uri.split("/").pop();
            let imageType = filename.split(".")[1];
            const fileInfo = {
                uri:
                    Platform.OS === "android"
                        ? result.uri
                        : result.uri.replace("file://", ""),
                type: `${result.type}/${imageType}`,
                name: filename,
            };

            setImages([...images, result.uri]);
            setImg(fileInfo);
        }
    };

    const ratingCompleted = (rating) => {
        let ratingValue = rating.toFixed(1);
        setStars(parseInt(ratingValue));
    };
    const storeReviewData = async () => {
        reviewData.rating = stars;
        reviewData.images = images;
        reviewData.comments = text;
        let formData = new FormData();
        formData.append("product_id", id);
        formData.append("comments", reviewData.comments);
        formData.append("rating", reviewData.rating);
        img.uri ? formData.append("image", img) : "";

        let newReview = await dispatch(
            postReview({
                access_token,
                URL,
                method: "POST",
                formData,
            })
        );
        let { code } = newReview?.payload?.status;
        let { message } = newReview?.payload?.records;

        if (code === 200) {
            CustomToast(toast, "Review updated successfully", successToase);
            dispatch(getReviews(url));
            props.navigation.goBack();
            loading = false;
        } else {
            CustomToast(toast, message, errorToase);
            loading = false;
        }
    };

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={true}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={CommonStyles.globalContainer}>
                    <View style={writeReviewStyle.imgRatingCon}>
                        <View style={writeReviewStyle.imgCon}>
                            <Image
                                source={{ uri: productDetails?.featured_image }}
                                style={writeReviewStyle.productImg}
                            />
                        </View>
                        <View>
                            <Text style={writeReviewStyle.productName}>
                                {productDetails?.name}
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
                                        startingValue={
                                            avgRating ? parseInt(avgRating) : 0
                                        }
                                        imageSize={customPixel.h17}
                                        readonly={true}
                                        fractions={10}
                                    />
                                </View>
                                <View>
                                    <Text style={writeReviewStyle.ratingCount}>
                                        {avgRating ? avgRating.toFixed(2) : 0} (
                                        {reviews?.length ? reviews?.length : 0})
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={writeReviewStyle.addRatingsCon}>
                        <Text style={writeReviewStyle.addRatingText}>
                            Add Your Ratings
                        </Text>
                        <View style={writeReviewStyle.addRatingCon}>
                            <View>
                                <Rating
                                    type='custom'
                                    ratingColor='#FCCA19'
                                    tintColor='#fff'
                                    ratingBackgroundColor='#C8C8C8'
                                    startingValue={parseInt(0)}
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
                            Add Photos
                        </Text>

                        <View>
                            <View>
                                {!images.length ? (
                                    <TouchableOpacity
                                        style={writeReviewStyle.uploadPhotos}
                                        onPress={uploadImages}
                                    >
                                        <View>
                                            <UploadIcon
                                                width={customPixel.h35}
                                                height={customPixel.h31}
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                style={
                                                    writeReviewStyle.uploadText
                                                }
                                            >
                                                Click here to upload photos
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={editReviewStyle.imgContainer}>
                                        {images.map((img, i) => {
                                            return (
                                                <View key={i}>
                                                    <Image
                                                        style={
                                                            editReviewStyle.imgStyle
                                                        }
                                                        source={{ uri: img }}
                                                    ></Image>
                                                </View>
                                            );
                                        })}
                                        <TouchableOpacity
                                            onPress={uploadImages}
                                        >
                                            <View
                                                style={
                                                    editReviewStyle.addPhotosCon
                                                }
                                            >
                                                <PlusIcon
                                                    height={customPixel.h16}
                                                    width={customPixel.h16}
                                                    fill={"#c4c4c4"}
                                                ></PlusIcon>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={writeReviewStyle.addRatingsCon}>
                        <Text style={writeReviewStyle.addRatingText}>
                            Write Your Experience
                        </Text>
                        <View>
                            <TextInput
                                style={writeReviewStyle.textInputStyle}
                                multiline
                                numberOfLines={8}
                                maxLength={maxLength}
                                onChangeText={(newText) => setText(newText)}
                                placeholder='What would you like to write about your experience with this product?'
                            ></TextInput>
                        </View>
                        <Text style={writeReviewStyle.remainingChar}>
                            {maxLength - text.length} characters remaining
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={!loading ? storeReviewData : null}>
                <View style={writeReviewStyle.submitReview}>
                    <View style={writeReviewStyle.submitReviewCon}>
                        {loading ? (
                            <CustomSpinner
                                filePath={require("../../../../../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h50,
                                }}
                            />
                        ) : (
                            <Text style={writeReviewStyle.submitReviewText}>
                                Submit Review
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

export default WriteReviews;
