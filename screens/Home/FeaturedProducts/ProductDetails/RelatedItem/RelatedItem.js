import {
    View,
    Text,
    Image,
    FlatList,
    TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { relatedItemStyle } from "./relatedItemStyle";
import ProgressiveImage from "../../../../../src/components/ProgressiveImage";
import { ProductsStyle } from "../../featureProductsStyle";
import { useNavigation } from "@react-navigation/native";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const RenderItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <View style={relatedItemStyle.imgCont}>
            {!item?.featured_image ? (
                <View>
                    <Image
                        source={require("../../../../../assets/images/productDetails/reviewImh2.png")}
                        style={relatedItemStyle.img}
                    />
                </View>
            ) : (
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.push("Product Details", {
                            slug: item?.slug,
                        })
                    }
                >
                    <View>
                        <ProgressiveImage
                            source={{ uri: item?.featured_image }}
                            style={ProductsStyle.img}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const RelatedItem = ({ headerText, renderData }) => {
    return (
        <View style={relatedItemStyle.container}>
            <Text style={relatedItemStyle.title}>{headerText}</Text>
            <FlatList
                data={renderData?.length ? renderData : data}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={(_, i) => "key" + i}
                listKey={(_, i) => `listKey-b${i}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default RelatedItem;
