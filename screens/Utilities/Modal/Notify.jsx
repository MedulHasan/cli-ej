import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";
import Modal from "react-native-modal";
import HeartIcon from "../../../assets/images/modal/heart.svg";
import { notify } from "./notify.style";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Notify = ({ isModalVisible, setIsModalVisible, nextPage, btnText }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isModalVisible?.show) {
            setTimeout(() => {
                dispatch(setIsModalVisible({ show: false, text: "" }));
            }, 2000);
        }
    }, [isModalVisible?.show]);
    return (
        <Modal
            isVisible={isModalVisible?.show}
            coverScreen={false}
            backdropOpacity={0}
            animationIn={"slideInRight"}
            animationOut={"slideOutRight"}
            onBackdropPress={() =>
                dispatch(setIsModalVisible({ show: false, text: "" }))
            }
            onSwipeComplete={() =>
                dispatch(setIsModalVisible({ show: false, text: "" }))
            }
            swipeDirection={"right"}
        >
            <View style={notify.container}>
                <View style={{ flexDirection: "row" }}>
                    <View style={notify.imgCont}>
                        <Image
                            source={require("../../../assets/images/modal/1.png")}
                            style={notify.img}
                        />
                    </View>
                    <View style={notify.subCont}>
                        <Text style={notify.text}>{isModalVisible?.text}</Text>
                        {/* <View style={notify.iconCont}>
                            <HeartIcon />
                        </View> */}
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate(nextPage)}
                >
                    <View style={notify.goToCart}>
                        <Text style={{ color: "red" }}>{btnText}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default Notify;
