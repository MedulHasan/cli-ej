import Checkbox from "expo-checkbox";
import { Button, useToast } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    LogBox,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { RadioButton } from "react-native-radio-buttons-group";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch, useSelector } from "react-redux";
import DownIcon from "../../../../assets/svgs/dropdown/down.svg";
import UpIcon from "../../../../assets/svgs/dropdown/up.svg";
import ErrorIcon from "../../../../assets/svgs/errorIcon.svg";
import DeleteIcon from "../../../../assets/svgs/my wishlist/delete icon.svg";
import config from "../../../../config";
import useAuth from "../../../../hooks/useAuth";
import {
    getMyAddress,
    getMyAddressWithoutLoading,
} from "../../../../redux/slices/user/address/getMyAddress";
import { postNewAddress } from "../../../../redux/slices/user/address/postNewAddress";
import { getUserInfo } from "../../../../redux/slices/user/util/fetchUserInfo";
import BackNavigation from "../../../Utilities/CustomHeader/BackNavigation";
import { selectDropdownStyle } from "../../../Utilities/CustomSelectDropdown/CustomSelectDropdown";
import CustomSpinner from "../../../Utilities/CustomSpinner/CustomSpinner";
import { customPixel } from "../../../Utilities/CustomStyleAttribute/CustomPixel";
import {
    CustomToast,
    successToase,
} from "../../../Utilities/CustomToast/CustomToast";
import { EditProfileStyle } from "../../EditProfile/StyleEditProfile";
import { ProfileStyles } from "../../ProfileStyle";
import { addNewAddressStyle } from "./AddNewAddressStyle";

let emailReg =
    /^$|^[A-Za-z0-9]+((\.[_A-Za-z0-9-]+)|(\_[.A-Za-z0-9-]+)|(\-[.A-Za-z0-9_]+))*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
let phoneReg = /^[+]?[0-9]{1,45}$/;
let zipReg = /^[0-9]*$/;

const initialState = {
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    address_1: "",
    address_2: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    type_of_place: "",
    is_default: 0,
};

const errorText = {
    first_name: false,
    last_name: false,
    phone: false,
    address_1: false,
    city: false,
    state: false,
    country: false,
    type_of_place: false,
    email: false,
    zip: false,
};

const URLGET = `${config.BASE_API_URL}/user/addresses`;
const urlPost = `${config.BASE_API_URL}/user/address/store`;
const urlPut = `${config.BASE_API_URL}/user/address/update`;
const AddNewAddress = (props) => {
    LogBox.ignoreLogs([
        "Non-serializable values were found in the navigation state",
    ]);
    const { isUpdate, item, index = {} } = props.route.params || {};

    const toast = useToast();
    const dispatch = useDispatch();
    const { access_token } = useAuth();
    const { loading } = useSelector((state) => state.postNewAddress);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [address, setAddress] = useState(initialState);
    const [error, setError] = useState(errorText);
    const [countrys, setCountrys] = useState([]);
    const resetPhoneRef = useRef({});
    const resetCountryRef = useRef({});
    const resetStateRef = useRef({});
    const resetCityRef = useRef({});
    const firstNameRef = useRef(false);
    const lastNameRef = useRef(false);
    const phoneRef = useRef(false);
    const address1Ref = useRef(false);
    const cityRef = useRef(false);
    const stateRef = useRef(false);
    const countryRef = useRef(false);
    const placeRef = useRef(false);
    const [getState, setGetState] = useState(null);
    const [getCity, setGetCity] = useState(null);
    const [allCity, setAllCity] = useState([]);
    const [allState, setAllState] = useState([]);

    const {
        first_name,
        last_name,
        phone,
        address_1,
        city,
        state,
        country,
        type_of_place,
    } = address;

    useEffect(() => {
        let isMounted = true;

        fetch(`${config.BASE_API_URL}/countries`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then((res) => res.json())
            .then((countrys) => {
                let allCountry = [];
                for (let country of countrys?.response?.records?.data) {
                    allCountry.push(country);
                }
                setCountrys(allCountry);
            });
        if (isMounted && isUpdate) {
            const newItem = { ...item, is_default: item?.is_default ? 1 : 0 };
            setAddress(newItem);
        }
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setAllState([]);
        setAllCity([]);
        setError({
            ...error,
            city: cityRef.current,
            state: stateRef.current,
        });
        if (getState) {
            fetch(`${config.BASE_API_URL}/countries/${getState}/states`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            })
                .then((res) => res.json())
                .then((states) => {
                    let allState = [];
                    for (let state of states?.response?.records?.data) {
                        allState.push(state);
                    }
                    setAllState(allState);
                    setAddress({ ...address, city: "" });
                });
        }
    }, [getState]);
    useEffect(() => {
        setAllCity([]);
        setError({
            ...error,
            city: cityRef.current,
        });
        if (getCity && getState) {
            fetch(
                `${config.BASE_API_URL}/countries/${getState}/states/${getCity}/cities`,
                {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((cities) => {
                    let allCity = [];
                    for (let city of cities?.response?.records?.data) {
                        allCity.push(city);
                    }
                    setAllCity(allCity);
                });
        }
    }, [getCity]);

    const handleValidationError = () => {
        firstNameRef.current = first_name === "" ? true : false;
        lastNameRef.current = last_name === "" ? true : false;
        phoneRef.current =
            phone === "" || phoneReg.test(address?.phone) === false
                ? true
                : false;
        address1Ref.current = address_1 === "" ? true : false;
        cityRef.current = city === "" ? true : false;
        countryRef.current = country === "" ? true : false;
        stateRef.current = state === "" ? true : false;
        placeRef.current = type_of_place === "" ? true : false;
        setError({
            ...error,
            first_name: firstNameRef.current,
            last_name: lastNameRef.current,
            phone: phoneRef.current,
            address_1: address1Ref.current,
            city: cityRef.current,
            state: stateRef.current,
            country: countryRef.current,
            type_of_place: placeRef.current,
        });
    };

    const handleAddressInfo = (name, text) => {
        if (name === "email" && emailReg.test(text) === false) {
            setError({
                ...error,
                [name]: "Enter a valid email address",
            });
        } else if (name === "phone" && phoneReg.test(text) === false) {
            setError({
                ...error,
                [name]: "Phone number max 45 char long",
            });
        } else if (name === "zip" && zipReg.test(text) === false) {
            setError({
                ...error,
                [name]: "Postcode only Number",
            });
        } else {
            setError({
                ...error,
                [name]: false,
            });
        }
        if (name === "country") {
            setAddress({ ...address, [name]: text, state: "", city: "" });
        } else if (name === "state") {
            setAddress({ ...address, [name]: text, city: "" });
        } else {
            setAddress({
                ...address,
                [name]: text,
            });
        }
    };

    const handleAddNewAddress = async () => {
        let URL = isUpdate ? urlPut : urlPost;
        address.is_default = address?.is_default ? 1 : 0;

        if (
            first_name &&
            last_name &&
            phone &&
            address_1 &&
            city &&
            state &&
            country &&
            type_of_place &&
            !error.email &&
            !error.phone &&
            !error.zip
        ) {
            let newAdd = await dispatch(
                postNewAddress({
                    access_token,
                    URL,
                    method: "POST",
                    address,
                })
            );
            let { code, message } = newAdd?.payload?.status;
            if (code) {
                CustomToast(toast, message, successToase);

                setAddress(initialState);
                setError(errorText);
                resetCountryRef.current.reset();
                resetStateRef.current.reset();
                resetCityRef.current.reset();
                resetPhoneRef.current?.setState({ number: "" });
                props.navigation.goBack();
                dispatch(getMyAddress(access_token));
            }
        } else {
            handleValidationError();
        }
    };

    const handleDeleteAddress = (id) => {
        const DELETEURL = `${config.BASE_API_URL}/user/address/delete/${id}`;
        Alert.alert("Delete Address?", "Are you sure delete this address", [
            {
                text: "Yes",
                onPress: () => {
                    setDeleteLoading(true);
                    fetch(DELETEURL, {
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${access_token}`,
                        },
                    })
                        .then((res) => res.json())
                        .then(async (data) => {
                            if (data.response.records.length === 0) {
                                let data = await getUserInfo(
                                    access_token,
                                    URLGET
                                );
                                dispatch(getMyAddressWithoutLoading(data));
                                setDeleteLoading(false);
                                props.navigation.goBack();
                                CustomToast(
                                    toast,
                                    `Address ${index + 1} has been deleted`,
                                    successToase
                                );
                            } else {
                            }
                        });
                },
            },
            {
                text: "No",
                onPress: () => {},
            },
        ]);
    };
    const [addPhoneNumber, setAddPhoneNumber] = useState([1]);
    const handleAddPhoneNumber = () => {
        const random = (min, max) =>
            Math.floor(Math.random() * (max - min)) + min;
        if (!addPhoneNumber.includes(random)) {
            setAddPhoneNumber([...addPhoneNumber, random(1, 999)]);
        }
    };
    const handleDeletePhoneNumber = (index) => {
        let result = addPhoneNumber.filter((item) => item !== index);
        setAddPhoneNumber(result);
    };
    let increment = 0;

    return (
        <>
            <BackNavigation
                navigationProps={props.navigation}
                routeName={isUpdate ? `Address ${index + 1}` : props.route.name}
                capitalize={true}
            />
            <View style={ProfileStyles.hrLine} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={addNewAddressStyle.container}>
                    <View style={EditProfileStyle.nameCont}>
                        <View style={EditProfileStyle.nameInput}>
                            <Text style={EditProfileStyle.label}>
                                First Name *
                            </Text>
                            <TextInput
                                style={[
                                    EditProfileStyle.textInput,
                                    {
                                        borderColor: error.first_name
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    },
                                ]}
                                value={address?.first_name}
                                onChangeText={(text) =>
                                    handleAddressInfo("first_name", text)
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
                                Last Name *
                            </Text>
                            <TextInput
                                style={[
                                    EditProfileStyle.textInput,
                                    {
                                        borderColor: error.last_name
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    },
                                ]}
                                value={address?.last_name}
                                onChangeText={(text) =>
                                    handleAddressInfo("last_name", text)
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={EditProfileStyle.label}>
                            Company Name (Optional)
                        </Text>
                        <TextInput
                            style={[EditProfileStyle.textInput]}
                            value={address?.company_name}
                            onChangeText={(text) =>
                                handleAddressInfo("company_name", text)
                            }
                        />
                    </View>
                    <View>
                        <Text style={EditProfileStyle.label}>
                            Email Address
                        </Text>
                        <TextInput
                            style={[
                                EditProfileStyle.textInput,
                                {
                                    borderColor: error.email
                                        ? "#E43147"
                                        : "#DFDFDF",
                                },
                            ]}
                            value={address?.email}
                            onChangeText={(text) =>
                                handleAddressInfo("email", text)
                            }
                        />
                    </View>
                    <View>
                        <Text style={EditProfileStyle.label}>
                            Phone Number *
                        </Text>
                        <View
                            style={[
                                EditProfileStyle.phone,
                                {
                                    borderColor: error.phone
                                        ? "#E43147"
                                        : "#DFDFDF",
                                    marginTop: customPixel.h10,
                                    flexDirection: "row",
                                    alignItems: "center",
                                },
                            ]}
                        >
                            <PhoneInput
                                value={item?.phone}
                                ref={resetPhoneRef}
                                onChangeText={(text) =>
                                    handleAddressInfo(`phone`, text)
                                }
                                defaultCode='BD'
                                containerStyle={{
                                    height: customPixel.h50,
                                }}
                                textContainerStyle={{
                                    backgroundColor: "#fff",
                                    paddingLeft: 0,
                                }}
                                textInputStyle={{
                                    borderColor: "#DFDFDF",
                                    borderLeftWidth: 2,
                                    paddingLeft: 10,
                                    fontSize: customPixel.h13,
                                }}
                                codeTextStyle={{
                                    fontSize: customPixel.h13,
                                }}
                            />
                            {addPhoneNumber?.length > 1 && (
                                <TouchableOpacity
                                    onPress={() =>
                                        handleDeletePhoneNumber(index)
                                    }
                                >
                                    <DeleteIcon
                                        height={customPixel.h14}
                                        width={customPixel.h13}
                                        fill={"#898989"}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {/* {addPhoneNumber?.length > 0 &&
                            addPhoneNumber?.map((index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            EditProfileStyle.phone,
                                            {
                                                borderColor: error.phone[
                                                    increment++
                                                ]
                                                    ? "#E43147"
                                                    : "#DFDFDF",
                                                marginTop: customPixel.h10,
                                                flexDirection: "row",
                                                alignItems: "center",
                                            },
                                        ]}
                                    >
                                        <PhoneInput
                                            value={item?.phone}
                                            ref={resetPhoneRef}
                                            onChangeText={(text) =>
                                                handleAddressInfo(
                                                    `phone ${index}`,
                                                    text
                                                )
                                            }
                                            defaultCode='BD'
                                            containerStyle={{
                                                height: customPixel.h50,
                                            }}
                                            textContainerStyle={{
                                                backgroundColor: "#fff",
                                                paddingLeft: 0,
                                            }}
                                            textInputStyle={{
                                                borderColor: "#DFDFDF",
                                                borderLeftWidth: 2,
                                                paddingLeft: 10,
                                                fontSize: customPixel.h13,
                                            }}
                                            codeTextStyle={{
                                                fontSize: customPixel.h13,
                                            }}
                                        />
                                        {addPhoneNumber?.length > 1 && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleDeletePhoneNumber(
                                                        index
                                                    )
                                                }
                                            >
                                                <DeleteIcon
                                                    height={customPixel.h14}
                                                    width={customPixel.h13}
                                                    fill={"#898989"}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                );
                            })}
                        {addPhoneNumber?.length <= 2 && (
                            <TouchableOpacity
                                onPress={() => handleAddPhoneNumber()}
                            >
                                <Text style={EditProfileStyle.label}>
                                    + Add another phone Number
                                </Text>
                            </TouchableOpacity>
                        )} */}
                    </View>
                    <View>
                        <Text style={EditProfileStyle.label}>
                            Street Address *
                        </Text>
                        <TextInput
                            style={[
                                EditProfileStyle.textInput,
                                {
                                    borderColor: error.address_1
                                        ? "#E43147"
                                        : "#DFDFDF",
                                },
                            ]}
                            value={address.address_1}
                            onChangeText={(text) =>
                                handleAddressInfo("address_1", text)
                            }
                        />
                    </View>

                    <View style={EditProfileStyle.nameCont}>
                        <View style={EditProfileStyle.nameInput}>
                            <Text style={EditProfileStyle.label}>
                                Country *
                            </Text>
                            <View>
                                <SelectDropdown
                                    data={countrys}
                                    ref={resetCountryRef}
                                    onSelect={(selectedItem) => {
                                        handleAddressInfo(
                                            "country",
                                            selectedItem.name
                                        );
                                    }}
                                    defaultButtonText={address.country}
                                    buttonTextAfterSelection={(
                                        selectedItem
                                    ) => {
                                        setGetState(selectedItem.id);
                                        return selectedItem.name;
                                    }}
                                    rowTextForSelection={(item) => {
                                        return item.name;
                                    }}
                                    buttonStyle={{
                                        ...addNewAddressStyle.dropdown1BtnStyle,
                                        borderColor: error.country
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    }}
                                    buttonTextStyle={
                                        addNewAddressStyle.dropdown1BtnTextStyle
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
                                        addNewAddressStyle.dropdown1BtnTextStyle
                                    }
                                />
                            </View>
                        </View>
                        <View
                            style={[
                                EditProfileStyle.nameInput,
                                { marginLeft: 15 },
                            ]}
                        >
                            <Text style={EditProfileStyle.label}>
                                State / Province
                            </Text>
                            <SelectDropdown
                                data={allState}
                                disabled={getState === null ? true : false}
                                ref={resetStateRef}
                                onSelect={(selectedItem) => {
                                    handleAddressInfo(
                                        "state",
                                        selectedItem.name
                                    );
                                }}
                                defaultButtonText={address.state}
                                buttonTextAfterSelection={(selectedItem) => {
                                    setGetCity(selectedItem.id);
                                    return selectedItem.name;
                                }}
                                rowTextForSelection={(item) => {
                                    return item.name;
                                }}
                                buttonStyle={{
                                    ...addNewAddressStyle.dropdown1BtnStyle,
                                    borderColor: error.state
                                        ? "#E43147"
                                        : "#DFDFDF",
                                    backgroundColor: isUpdate
                                        ? "#DFDFDF"
                                        : "#ffffff",
                                    backgroundColor:
                                        getState === null
                                            ? "#DFDFDF"
                                            : "#ffffff",
                                }}
                                buttonTextStyle={
                                    addNewAddressStyle.dropdown1BtnTextStyle
                                }
                                renderDropdownIcon={(isOpened) => {
                                    return isOpened ? <UpIcon /> : <DownIcon />;
                                }}
                                dropdownIconPosition={"right"}
                                dropdownStyle={
                                    selectDropdownStyle.dropdown1DropdownStyle
                                }
                                rowStyle={selectDropdownStyle.dropdown1RowStyle}
                                rowTextStyle={
                                    addNewAddressStyle.dropdown1BtnTextStyle
                                }
                            />
                        </View>
                    </View>
                    <View style={EditProfileStyle.nameCont}>
                        <View style={EditProfileStyle.nameInput}>
                            <Text style={EditProfileStyle.label}>City *</Text>

                            <SelectDropdown
                                data={allCity}
                                disabled={getCity === null ? true : false}
                                ref={resetCityRef}
                                onSelect={(selectedItem) => {
                                    handleAddressInfo(
                                        "city",
                                        selectedItem.name
                                    );
                                }}
                                defaultButtonText={address.city}
                                buttonTextAfterSelection={(selectedItem) => {
                                    return selectedItem.name;
                                }}
                                rowTextForSelection={(item) => {
                                    return item.name;
                                }}
                                buttonStyle={{
                                    ...addNewAddressStyle.dropdown1BtnStyle,
                                    borderColor: error.city
                                        ? "#E43147"
                                        : "#DFDFDF",
                                    backgroundColor: isUpdate
                                        ? "#DFDFDF"
                                        : "#ffffff",
                                    backgroundColor:
                                        getCity === null
                                            ? "#DFDFDF"
                                            : "#ffffff",
                                }}
                                buttonTextStyle={
                                    addNewAddressStyle.dropdown1BtnTextStyle
                                }
                                renderDropdownIcon={(isOpened) => {
                                    return isOpened ? <UpIcon /> : <DownIcon />;
                                }}
                                dropdownIconPosition={"right"}
                                dropdownStyle={
                                    selectDropdownStyle.dropdown1DropdownStyle
                                }
                                rowStyle={selectDropdownStyle.dropdown1RowStyle}
                                rowTextStyle={
                                    addNewAddressStyle.dropdown1BtnTextStyle
                                }
                            />
                        </View>
                        <View
                            style={[
                                EditProfileStyle.nameInput,
                                { marginLeft: 15 },
                            ]}
                        >
                            <Text style={EditProfileStyle.label}>Postcode</Text>
                            <TextInput
                                style={[
                                    EditProfileStyle.textInput,
                                    {
                                        borderColor: error.zip
                                            ? "#E43147"
                                            : "#DFDFDF",
                                    },
                                ]}
                                value={address.zip}
                                onChangeText={(text) =>
                                    handleAddressInfo("zip", text)
                                }
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={EditProfileStyle.label}>
                            Type of Place *
                        </Text>
                        <View style={EditProfileStyle.radioCont}>
                            <RadioButton
                                id='home'
                                label='Home'
                                size={16}
                                selected={
                                    address.type_of_place === "home"
                                        ? true
                                        : false
                                }
                                color={
                                    address.type_of_place === "home"
                                        ? "#2C2C2C"
                                        : "#DFDFDF"
                                }
                                containerStyle={[
                                    EditProfileStyle.radioButton,
                                    {
                                        borderColor: error?.type_of_place
                                            ? "#E43147"
                                            : address?.type_of_place === "home"
                                            ? "#2C2C2C"
                                            : "#DFDFDF",
                                    },
                                    ,
                                ]}
                                labelStyle={[
                                    EditProfileStyle.radioText,
                                    {
                                        color:
                                            address.type_of_place === "home"
                                                ? "#2C2C2C"
                                                : "#898989",
                                    },
                                ]}
                                onPress={(value) =>
                                    handleAddressInfo("type_of_place", value)
                                }
                            />
                            <RadioButton
                                id='office'
                                label='Office'
                                size={16}
                                selected={
                                    address?.type_of_place === "office"
                                        ? true
                                        : false
                                }
                                color={
                                    address?.type_of_place === "office"
                                        ? "#2C2C2C"
                                        : "#DFDFDF"
                                }
                                containerStyle={[
                                    EditProfileStyle.radioButton,
                                    {
                                        borderColor: error.type_of_place
                                            ? "#E43147"
                                            : address.type_of_place === "office"
                                            ? "#2C2C2C"
                                            : "#DFDFDF",
                                    },
                                    ,
                                ]}
                                labelStyle={[
                                    EditProfileStyle.radioText,
                                    {
                                        color:
                                            address.type_of_place === "office"
                                                ? "#2C2C2C"
                                                : "#898989",
                                    },
                                ]}
                                onPress={(value) =>
                                    handleAddressInfo("type_of_place", value)
                                }
                            />
                        </View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() =>
                            handleAddressInfo(
                                "is_default",
                                !address?.is_default ? true : false
                            )
                        }
                    >
                        <View style={addNewAddressStyle.default}>
                            <Checkbox
                                style={addNewAddressStyle.defaultIcon}
                                value={
                                    address?.is_default === 1 ||
                                    address?.is_default === true
                                        ? true
                                        : false
                                }
                                onValueChange={() => {
                                    handleAddressInfo(
                                        "is_default",
                                        !address.is_default ? true : false
                                    );
                                }}
                            />
                            <Text style={addNewAddressStyle.defaultText}>
                                Use as default Address in the future
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {isUpdate && (
                        <View>
                            <Button
                                onPress={() => {
                                    return deleteLoading
                                        ? {}
                                        : handleDeleteAddress(address?.id);
                                }}
                                style={addNewAddressStyle.deleteAddress}
                                isDisabled={item?.is_default}
                            >
                                {deleteLoading ? (
                                    <CustomSpinner
                                        filePath={require("../../../../assets/lottie/loader.json")}
                                        size={{
                                            width: customPixel.h60,
                                            height: customPixel.h50,
                                        }}
                                    />
                                ) : (
                                    <View
                                        style={
                                            addNewAddressStyle.deleteAddressBtnCont
                                        }
                                    >
                                        <DeleteIcon
                                            height={customPixel.h16}
                                            width={customPixel.h18}
                                            fill={"#FFFFFF"}
                                        />
                                        <Text
                                            style={
                                                addNewAddressStyle.deleteAddressBtnText
                                            }
                                        >
                                            Delete this Address
                                        </Text>
                                    </View>
                                )}
                            </Button>
                        </View>
                    )}
                </View>
            </ScrollView>
            <View>
                {error.first_name ||
                error.last_name ||
                error.phone ||
                error.address_1 ||
                error.city ||
                error.country ||
                error.email ||
                error.type_of_place ? (
                    <View style={EditProfileStyle.errorCont}>
                        <ErrorIcon />
                        <Text style={EditProfileStyle.errorText}>
                            {error.email ||
                                error.phone ||
                                error.zip ||
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
                    onPress={() => (loading ? {} : handleAddNewAddress())}
                >
                    <View style={addNewAddressStyle.saveAddressCont}>
                        {loading ? (
                            <CustomSpinner
                                filePath={require("../../../../assets/lottie/loader2.json")}
                                size={{
                                    width: customPixel.h60,
                                    height: customPixel.h50,
                                }}
                            />
                        ) : (
                            <Text style={addNewAddressStyle.saveAddressBtn}>
                                Save Address
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default AddNewAddress;
