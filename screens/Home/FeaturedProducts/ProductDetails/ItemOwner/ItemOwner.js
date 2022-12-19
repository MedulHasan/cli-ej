import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { customPixel } from "../../../../Utilities/CustomStyleAttribute/CustomPixel";
import { Rating } from "react-native-ratings";
import ProgressiveImage from "../../../../../src/components/ProgressiveImage";

const ItemOwner = ({ vendor = {} }) => {
    const { name, rating, total_review, image } = vendor;
    return (
        <View style={[styles.container]}>
            <View
                style={{
                    borderTopWidth: 1,
                    borderColor: "#DFDFDF",
                }}
            >
                <View style={styles.subCont}>
                    <View>
                        <Text style={styles.soldBy}>Sold By</Text>
                        <Text style={styles.ownerName}>{name}</Text>
                        <View style={styles.ratingCont}>
                            <Rating
                                style={{
                                    marginRight: "auto",
                                }}
                                type='custom'
                                ratingColor='#FCCA19'
                                tintColor='#2C2C2C'
                                ratingBackgroundColor='#C8C8C8'
                                startingValue={
                                    rating == null ? 0 : parseInt(rating)
                                }
                                imageSize={customPixel.h17}
                                readonly={true}
                                fractions={10}
                            />
                            <View style={styles.ratingCont}>
                                <Text style={styles.ratingText}>
                                    {rating == null ? 0 : parseInt(rating)}
                                </Text>
                                <Text style={styles.soldBy}>
                                    (
                                    {total_review == 1
                                        ? `${total_review} Review`
                                        : `${total_review} Reviews`}
                                    )
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <ProgressiveImage
                            source={{ uri: image }}
                            style={styles.img}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ItemOwner;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: customPixel.h20,
        paddingBottom: customPixel.h20,
    },
    subCont: {
        backgroundColor: "#2C2C2C",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 6,
        padding: customPixel.h18,
        marginTop: customPixel.h15,
    },
    img: {
        height: customPixel.h80,
        width: customPixel.h80,
    },
    soldBy: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        color: "#898989",
    },
    ownerName: {
        fontFamily: "DMSans_700Bold",
        fontSize: customPixel.h20,
        color: "#FFFFFF",
        marginVertical: customPixel.h6,
    },
    ratingCont: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h16,
        color: "#FFFFFF",
        marginLeft: customPixel.h8,
        marginRight: customPixel.h5,
    },
});
