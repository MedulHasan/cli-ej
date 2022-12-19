import * as ImagePicker from "expo-image-picker";
import { useToast } from "native-base";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { RadioButton } from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import DownIcon from "../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../assets/svgs/dropdown/up.svg";
import ErrorIcon from "../../../assets/svgs/errorIcon.svg";
import useAuth from "../../../hooks/useAuth";
import { updateUserProfile } from "../../../redux/slices/user/updateProfile/getUpdateProfile";
import { postUpdateUserProfile } from "../../../redux/slices/user/updateProfile/postUpdateProfile";
import BackNavigation from "../../Utilities/CustomHeader/BackNavigation";
import { selectDropdownStyle } from "../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import CustomSpinner from "../../Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../Utilities/CustomStyleAttribute/CustomPixel";
import {
    CustomToast,
    errorToase,
    successToase,
} from "../../Utilities/CustomToast/CustomToast";
import { addNewAddressStyle } from "../Address/AddNewAddress/AddNewAddressStyle";
import { ProfileStyles } from "../ProfileStyle";
import {
    appendFormData,
    confirmGender,
    convertMonth,
    dateCount,
    editFormValidation,
    monthCount,
    yearCount,
} from "./extraFunction";
import { EditProfileStyle } from "./StyleEditProfile";

const { height } = Dimensions.get("screen");

const EditProfile = (props) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.updateUserProfile);
    const { loading } = useSelector((state) => state.postUpdateUserProfile);
    const { access_token, user } = useAuth();
    const { name, email, gender, phone, address, birthday } = userInfo;
    const nameArray = name.split(" ");
    const firstname = nameArray.shift();
    const dateOfBirth = birthday?.split("-");
    const monthName = dateOfBirth && convertMonth(dateOfBirth[1]);
    const userData = {
        firstName: firstname,
        lastName: nameArray.join(" "),
        email: email,
        gender: gender,
        phone: phone ?? "",
        address: address ?? "",
        day: dateOfBirth ? dateOfBirth[2] : "",
        month: monthName ?? "",
        year: dateOfBirth ? dateOfBirth[0] : "",
        attachment: "",
    };
    const initialGender = { male: "", female: "" };
    if (gender === "Male") {
        initialGender.male = gender;
    } else {
        initialGender.female = gender;
    }

    const [image, setImage] = useState(null);
    const [genderObj, setGender] = useState(initialGender);
    const [error, setError] = useState({});
    const [updateData, setUpdateData] = useState(userData);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
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

            setImage(result.uri);
            setUpdateData({
                ...updateData,
                attachment: fileInfo,
            });
        }
    };

    const handleGender = (name, value) => {
        confirmGender(value, setGender);
        setError({
            ...error,
            gender: false,
        });
        setUpdateData({
            ...updateData,
            [name]: value,
        });
    };

    const handleUpdateData = (name, text) => {
        setUpdateData({
            ...updateData,
            [name]: text,
        });
    };

    const handleProfileUpdate = async () => {
        const error = editFormValidation(updateData);
        if (Object.keys(error).length > 0) {
            setError(error);
        } else {
            setError({});
            const formData = appendFormData(updateData);
            let data = await dispatch(
                postUpdateUserProfile({ formData, access_token })
            );
            if (data?.payload?.records?.length === 0) {
                CustomToast(
                    toast,
                    data?.payload?.status?.message,
                    successToase
                );
                dispatch(updateUserProfile(access_token));
                setUpdateData({});
                setGender({});
                props.navigation.navigate("MY ACCOUNT");
            } else {
                CustomToast(toast, "Something Wrong!", errorToase);
            }
        }
    };

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={props.route.name}
                capitalize={false}
            />
            <View style={ProfileStyles.hrLine} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : ""}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View
                        style={[
                            ProfileStyles.profileContainer,
                            { marginBottom: 0 },
                        ]}
                    >
                        <Text style={EditProfileStyle.title}>
                            Profile Display
                        </Text>
                        <View style={EditProfileStyle.profileDisplay}>
                            <Image
                                source={{ uri: image || userInfo?.picture_url }}
                                style={EditProfileStyle.image}
                            />
                            <View>
                                <View style={EditProfileStyle.changephotoCont}>
                                    <TouchableOpacity
                                        style={EditProfileStyle.changePhoto}
                                        onPress={pickImage}
                                    >
                                        <Text
                                            style={
                                                EditProfileStyle.changePhotoText
                                            }
                                        >
                                            Change Photo
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity>
                                    <Text style={EditProfileStyle.remove}>
                                        Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={EditProfileStyle.personalInfoCont}>
                            <Text style={EditProfileStyle.title}>
                                Personal Information
                            </Text>
                            <View style={EditProfileStyle.nameCont}>
                                <View style={EditProfileStyle.nameInput}>
                                    <Text style={EditProfileStyle.label}>
                                        First Name *
                                    </Text>
                                    <TextInput
                                        value={updateData.firstName}
                                        placeholder='First Name'
                                        style={[
                                            EditProfileStyle.textInput,
                                            {
                                                borderColor: error.name
                                                    ? "#E43147"
                                                    : "#DFDFDF",
                                            },
                                        ]}
                                        onChangeText={(text) =>
                                            handleUpdateData("firstName", text)
                                        }
                                    />
                                </View>
                                <View
                                    style={[
                                        EditProfileStyle.nameInput,
                                        { marginLeft: 15 },
                                    ]}
                                >
                                    <Text style={EditProfileStyle.label}>
                                        Last Name
                                    </Text>
                                    <TextInput
                                        value={updateData.lastName}
                                        placeholder='Last Name'
                                        style={EditProfileStyle.textInput}
                                        onChangeText={(text) =>
                                            handleUpdateData("lastName", text)
                                        }
                                    />
                                </View>
                            </View>
                            <View>
                                <View style={EditProfileStyle.gendeErrorCont}>
                                    <Text style={EditProfileStyle.label}>
                                        Gender *
                                    </Text>
                                </View>
                                <View style={EditProfileStyle.radioCont}>
                                    <RadioButton
                                        id='Male'
                                        label='Male'
                                        size={16}
                                        selected={genderObj.male ? true : false}
                                        color={
                                            genderObj.male
                                                ? "#2DADD6"
                                                : "#2C2C2C"
                                        }
                                        containerStyle={[
                                            EditProfileStyle.radioButton,
                                            {
                                                borderColor: error.gender
                                                    ? "#E43147"
                                                    : genderObj.male
                                                    ? "#2DADD6"
                                                    : "#DFDFDF",
                                            },
                                        ]}
                                        labelStyle={EditProfileStyle.radioText}
                                        onPress={(value) =>
                                            handleGender("gender", value)
                                        }
                                    />
                                    <RadioButton
                                        id='Female'
                                        label='Female'
                                        size={16}
                                        selected={
                                            genderObj.female ? true : false
                                        }
                                        color={
                                            genderObj.female
                                                ? "#E35C96"
                                                : "#2C2C2C"
                                        }
                                        containerStyle={[
                                            EditProfileStyle.radioButton,
                                            {
                                                borderColor: error.gender
                                                    ? "#E43147"
                                                    : genderObj.female
                                                    ? "#E35C96"
                                                    : "#DFDFDF",
                                            },
                                        ]}
                                        labelStyle={EditProfileStyle.radioText}
                                        onPress={(value) =>
                                            handleGender("gender", value)
                                        }
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={EditProfileStyle.label}>
                                    Date of Birth
                                </Text>
                                <View style={EditProfileStyle.radioCont}>
                                    <View>
                                        <SelectDropdown
                                            data={dateCount}
                                            onSelect={(selectedItem, index) => {
                                                handleUpdateData(
                                                    "day",
                                                    selectedItem
                                                );
                                            }}
                                            defaultButtonText={
                                                updateData.day || "Date"
                                            }
                                            buttonTextAfterSelection={(
                                                selectedItem
                                            ) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(item) => {
                                                return item;
                                            }}
                                            buttonStyle={
                                                EditProfileStyle.dropdown1BtnStyle
                                            }
                                            buttonTextStyle={
                                                selectDropdownStyle.dropdown1BtnTxtStyle
                                            }
                                            renderDropdownIcon={(isOpened) => {
                                                return isOpened ? (
                                                    <UpIcon />
                                                ) : (
                                                    <DownIcon />
                                                );
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={
                                                selectDropdownStyle.dropdown1DropdownStyle
                                            }
                                            rowStyle={
                                                selectDropdownStyle.dropdown1RowStyle
                                            }
                                            rowTextStyle={
                                                selectDropdownStyle.dropdown1RowTxtStyle
                                            }
                                        />
                                    </View>
                                    <View
                                        style={[
                                            {
                                                marginHorizontal:
                                                    customPixel.h15,
                                            },
                                        ]}
                                    >
                                        <SelectDropdown
                                            data={monthCount}
                                            onSelect={(selectedItem, index) => {
                                                handleUpdateData(
                                                    "month",
                                                    index + 1
                                                );
                                            }}
                                            defaultButtonText={
                                                updateData.month || "Month"
                                            }
                                            buttonTextAfterSelection={(
                                                selectedItem,
                                                index
                                            ) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(
                                                item,
                                                index
                                            ) => {
                                                return item;
                                            }}
                                            buttonStyle={
                                                EditProfileStyle.dropdown1BtnStyle
                                            }
                                            buttonTextStyle={
                                                selectDropdownStyle.dropdown1BtnTxtStyle
                                            }
                                            renderDropdownIcon={(isOpened) => {
                                                return isOpened ? (
                                                    <UpIcon />
                                                ) : (
                                                    <DownIcon />
                                                );
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={
                                                selectDropdownStyle.dropdown1DropdownStyle
                                            }
                                            rowStyle={
                                                selectDropdownStyle.dropdown1RowStyle
                                            }
                                            rowTextStyle={
                                                selectDropdownStyle.dropdown1RowTxtStyle
                                            }
                                        />
                                    </View>
                                    <View>
                                        <SelectDropdown
                                            data={yearCount}
                                            onSelect={(selectedItem, index) => {
                                                handleUpdateData(
                                                    "year",
                                                    selectedItem
                                                );
                                            }}
                                            defaultButtonText={
                                                updateData.year || "Year"
                                            }
                                            buttonTextAfterSelection={(
                                                selectedItem,
                                                index
                                            ) => {
                                                return selectedItem;
                                            }}
                                            rowTextForSelection={(
                                                item,
                                                index
                                            ) => {
                                                return item;
                                            }}
                                            buttonStyle={
                                                EditProfileStyle.dropdown1BtnStyle
                                            }
                                            buttonTextStyle={
                                                selectDropdownStyle.dropdown1BtnTxtStyle
                                            }
                                            renderDropdownIcon={(isOpened) => {
                                                return isOpened ? (
                                                    <UpIcon />
                                                ) : (
                                                    <DownIcon />
                                                );
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={
                                                selectDropdownStyle.dropdown1DropdownStyle
                                            }
                                            rowStyle={
                                                selectDropdownStyle.dropdown1RowStyle
                                            }
                                            rowTextStyle={
                                                selectDropdownStyle.dropdown1RowTxtStyle
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Text style={EditProfileStyle.label}>
                                    Email Address *
                                </Text>
                                <TextInput
                                    editable={false}
                                    value={user.email}
                                    placeholder='Email Address'
                                    style={[
                                        EditProfileStyle.textInput,
                                        { backgroundColor: "#F3F3F3" },
                                    ]}
                                />
                            </View>
                            <View>
                                <Text style={EditProfileStyle.label}>
                                    Phone Number
                                </Text>
                                <View
                                    style={[
                                        EditProfileStyle.phone,
                                        {
                                            borderColor: error?.phone
                                                ? "#E43147"
                                                : "#DFDFDF",
                                        },
                                    ]}
                                >
                                    <PhoneInput
                                        value={updateData.phone}
                                        onChangeText={(text) =>
                                            handleUpdateData("phone", text)
                                        }
                                        defaultCode='BD'
                                        containerStyle={{
                                            height: height * 0.063,
                                        }}
                                        textContainerStyle={{
                                            backgroundColor: "#fff",
                                            paddingLeft: 0,
                                        }}
                                        textInputStyle={{
                                            borderColor: "#DFDFDF",
                                            borderLeftWidth: 2,
                                            paddingLeft: 10,
                                            fontSize: height * 0.017,
                                        }}
                                        codeTextStyle={{
                                            fontSize: height * 0.017,
                                        }}
                                        flagButtonStyle={{}}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={EditProfileStyle.label}>
                                    Address
                                </Text>
                                <TextInput
                                    value={updateData.address}
                                    placeholder='Address'
                                    style={EditProfileStyle.textInput}
                                    onChangeText={(text) =>
                                        handleUpdateData("address", text)
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View>
                <View>
                    {error.name || error.gender || error.phone ? (
                        <View style={EditProfileStyle.errorCont}>
                            <ErrorIcon />
                            <Text style={EditProfileStyle.errorText}>
                                {error.phone ||
                                    "Please fill in all the required fields *"}
                            </Text>
                        </View>
                    ) : null}
                </View>
                <View style={EditProfileStyle.changeInfo}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Text style={EditProfileStyle.cancel}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => (loading ? {} : handleProfileUpdate())}
                    >
                        <View style={addNewAddressStyle.saveAddressCont}>
                            {loading ? (
                                <CustomSpinner
                                    filePath={require("../../../assets/lottie/loader2.json")}
                                    size={{
                                        width: customPixel.h60,
                                        height: customPixel.h50,
                                    }}
                                />
                            ) : (
                                <Text style={addNewAddressStyle.saveAddressBtn}>
                                    Save Changes
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default EditProfile;
