import config from "../../../config";
import * as SecureStore from "expo-secure-store";
import {
    CustomToast,
    successToase,
} from "../../../screens/Utilities/CustomToast/CustomToast";

export const signInUsingGoogle = async (promptAsync) => {
    try {
        const token = await promptAsync({ showInRecents: true });
        if (token?.type === "success") {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: {
                        Authorization: `Bearer ${token.authentication.accessToken}`,
                    },
                }
            );
            const data = await response.json();
            const { name, email, id, picture } = data;
            const uData = createData({
                name,
                email,
                id,
                picture,
                service: "google",
            });
            return uData;
        } else {
            return {
                status: "error",
            };
        }
    } catch (e) {}
};
export const signInUsingFacebook = async (promptAsync) => {
    try {
        const token = await promptAsync({ showInRecents: true });
        if (token?.type === "success") {
            const response2 = await fetch(
                `https://graph.facebook.com/me?access_token=${token.authentication.accessToken}&fields=id,name,email,picture`
            );
            const data = await response2.json();
            const {
                name,
                email,
                id,
                picture: {
                    data: { url },
                },
            } = data;
            const uData = createData({
                name,
                email,
                id,
                picture: url,
                service: "facebook",
            });
            return uData;
        } else {
            return {
                status: "error",
            };
        }
    } catch (e) {}
};

export const passwordGenarator = () => {
    const number = Math.floor(Math.random() * 1000);
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const symbol = "!@#$%&*";

    return `${randomValue(uppercase)}${randomValue(
        symbol
    )}${number}${randomValue(lowercase)}`;
};

const randomValue = (input) => {
    let x = "";
    for (let i = 0; i < 3; i++) {
        x = x + input.charAt(Math.floor(Math.random() * input.length));
    }
    return x;
};

export const createData = async (data) => {
    const password = passwordGenarator();
    const userInfo = {
        name: data.name,
        email: data.email,
        password,
        password_confirmation: password,
        status: "Active",
        id: data.id,
        avatar: data.picture,
        service: data.service,
    };
    const uInfo = await fetchApi(userInfo);
    return uInfo;
};

export const fetchApi = async (userInfo) => {
    const URL = `${config.BASE_API_URL}/user/login/sso`;
    const res = await fetch(URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
    });
    const data = await res.json();
    return data;
};

export const storeUserInfoInSecureStore = async (
    records,
    dispatch,
    toast,
    routeName,
    navigation,
    slug,
    thisRouteName
) => {
    await SecureStore.setItemAsync("isLoggedIn", JSON.stringify(records));
    dispatch({
        type: "SIGN_IN",
        token: records.access_token,
        userInfo: records.user,
        isLoading: false,
    });
    CustomToast(toast, `sign in as ${records?.user?.email}`, successToase);
    navigation.navigate(routeName, { slug, thisRouteName });
    // navigation.goBack();
};
