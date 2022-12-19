import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Ellipse1 from "../../../assets/svgs/home/Ellipse/Ellipse1.svg";
import Ellipse2 from "../../../assets/svgs/home/Ellipse/Ellipse2.svg";
import Ellipse3 from "../../../assets/svgs/home/Ellipse/Ellipse3.svg";
import Ellipse4 from "../../../assets/svgs/home/Ellipse/Ellipse4.svg";
import Ellipse5 from "../../../assets/svgs/home/Ellipse/Ellipse5.svg";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const features = [
    {
        Ellipse: Ellipse2,
        text: "Brands",
        value: "brands",
    },
    {
        Ellipse: Ellipse3,
        text: "Best Seller",
        value: "bestSeller",
    },
    {
        Ellipse: Ellipse4,
        text: "Most Popular",
        value: "popularProducts",
    },
    {
        Ellipse: Ellipse5,
        text: "Flash Sales",
        value: "flashSales",
    },
];

const RenderItem = ({ item }) => {
    const navigation = useNavigation();
    const { Ellipse, text, value } = item;
    return (
        <View>
            <View>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate("feature display", {
                            text,
                            value,
                        })
                    }
                >
                    <View style={featureStyle.singleContainer}>
                        <View style={featureStyle.iconCont}>
                            <Ellipse
                                width={customPixel.h30}
                                height={customPixel.h30}
                            />
                        </View>
                        <Text numberOfLines={1} style={featureStyle.text}>
                            {text}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const Feature = () => {
    return (
        <View
            style={[
                featureStyle.container,
                {
                    flex: 1,
                    alignItems: "center",
                    width: customPixel.wF - customPixel.h40,
                },
            ]}
        >
            <FlatList
                data={features}
                keyExtractor={(_, i) => "key" + i}
                renderItem={({ item }) => <RenderItem item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const featureStyle = StyleSheet.create({
    container: {
        paddingTop: customPixel.h20,
    },
    singleContainer: {
        flexDirection: "column",
        alignItems: "center",
        width: customPixel.h90,
    },
    iconCont: {
        borderWidth: 1,
        borderColor: "#DFDFDF",
        height: width < 321 ? customPixel.h60 : customPixel.h54,
        width: width < 321 ? customPixel.h60 : customPixel.h54,
        borderRadius: 50,
        marginBottom: customPixel.h10,
        position: "relative",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "DMSans_500Medium",
        fontSize: width > 392 ? customPixel.h11 : customPixel.h14,
        color: "#898989",
        lineHeight: customPixel.h12,
        textAlign: "center",
        marginTop: customPixel.h5,
        lineHeight: customPixel.h14,
        alignSelf: "center",
    },
});

export default Feature;
