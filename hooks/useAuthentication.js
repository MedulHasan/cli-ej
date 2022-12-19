import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import config from "../config";

export const initialState = {
    isLoading: false,
    userToken: null,
    userInfo: null,
};

const error = {
    response: {
        records: [],
        status: {
            code: 501,
            message: "Something Wrong! Please Try Later.",
        },
    },
};

export const reducer = (prevState, action) => {
    switch (action.type) {
        case "RESTORE_TOKEN":
            return {
                ...prevState,
                userToken: action.token,
                userInfo: action.userInfo,
                isLoading: false,
            };
        case "SIGN_IN":
            return {
                ...prevState,
                userToken: action.token,
                userInfo: action.userInfo,
                isLoading: action.isLoading,
            };
        case "SIGN_OUT":
            return {
                ...prevState,
                userToken: null,
                userInfo: null,
                isLoading: action.isLoading,
            };
        case "SIGN_UP":
            return {
                ...prevState,
                isLoading: action.isLoading,
            };
    }
};

const useAuthentication = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    let userToken;
    useEffect(async () => {
        let isMounted = true;
        try {
            userToken = await SecureStore.getItemAsync("isLoggedIn");
            userToken = JSON.parse(userToken);
        } catch (e) {}
        if (isMounted && userToken) {
            dispatch({
                type: "RESTORE_TOKEN",
                token: userToken.access_token,
                userInfo: userToken.user,
            });
        }
        return () => {
            isMounted = false;
        };
    }, [userToken]);

    const signUpUsingEmailAndPassword = async (userInfo) => {
        dispatch({
            type: "SIGN_UP",
            isLoading: true,
        });
        try {
            const res = await fetch(
                `${config.BASE_API_URL}/user/registration`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                }
            );
            const userDetails = await res.json();
            return userDetails;
        } catch (err) {
            dispatch({
                type: "SIGN_UP",
                isLoading: false,
            });
        }
    };

    const signInUsingEmailAndPassword = async (userInfo) => {
        dispatch({
            type: "SIGN_IN",
            isLoading: true,
        });

        try {
            const res = await fetch(`${config.BASE_API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userInfo),
            });

            const userDetails = await res.json();
            return userDetails;
        } catch (err) {
            dispatch({
                type: "SIGN_IN",
                isLoading: false,
            });
            return error;
        }
    };

    const signOut = async (navigation) => {
        await SecureStore.deleteItemAsync("isLoggedIn");
        dispatch({
            type: "SIGN_OUT",
            isLoading: false,
        });
        navigation.navigate("Home");

        fetch(`${config.BASE_API_URL}/user/logout`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                // Authorization: `Bearer ${state?.userToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: "SIGN_OUT",
                    isLoading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return {
        state,
        dispatch,
        access_token: state?.userToken,
        user: state?.userInfo,
        signUpUsingEmailAndPassword,
        signInUsingEmailAndPassword,
        signOut,
    };
};

export default useAuthentication;
