import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboard from "../../screens/WelcomeScreen/Onboard/Onboard";
import DrawerStack from "./DrawerStack";
import EditProfile from "../../screens/Profile/EditProfile/EditProfile";
import Address from "../../screens/Profile/Address/Address";
import OrderHistory from "../../screens/Profile/OrderHistory/OrderHistory";
import AddNewAddress from "../../screens/Profile/Address/AddNewAddress/AddNewAddress";
import OrderDetails from "../../screens/Profile/OrderHistory/OrderDetails/OrderDetails";
import MyReviews from "../../screens/Profile/MyReviews/MyReviews";
import MyRefund from "../../screens/Profile/MyRefund/MyRefund";
import RefundRequest from "../../screens/Profile/MyRefund/RefundRequest/RefundRequest";
import RefundList from "../../screens/Profile/MyRefund/RefundList/RefundList";
import RefundDetails from "../../screens/Profile/MyRefund/RefundList/RefundDetails/RefundDetails";
import OrderSummary from "../../screens/ShoppingCart/OrderSummary/OrderSummary";
import BillingInformation from "../../screens/ShoppingCart/BillingInformation/BillingInformation";
import OrderConfirmed from "../../screens/ShoppingCart/OrderConfirmed/OrderConfirmed";
import ProductDetails from "../../screens/Home/FeaturedProducts/ProductDetails/ProductDetails";
import Reviews from "../../screens/Home/FeaturedProducts/ProductDetails/RatingAndReviews/Reviews/Reviews";
import Filters from "../../screens/Filter/Filters/Filters";
import FilterHome from "../../screens/Filter/FilterHome/FilterHome";
import WriteReviews from "../../screens/Home/FeaturedProducts/ProductDetails/RatingAndReviews/WriteReviews/WriteReviews";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registration/Registration";
import EditReview from "../../screens/Profile/EditReview/EditReview";
import TrackOrder from "../../screens/TrackOrder/TrackOrder";
import AccountCreated from "../Authentication/AccountCreated/AccountCreated";
import ForgetPassword from "../Authentication/ForgetPassword/ForgetPassword";
import ConfirmEmail from "../Authentication/ConfirmEmail/ConfirmEmail";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import PasswordChanged from "../Authentication/PasswordChanged/PasswordChanged";
import PaymentView from "../../screens/Payment/PaymentView";
import FeatureDisplay from "../../screens/Home/Feature/FeatureDisplay";

const Stack = createNativeStackNavigator();

const Welcome = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(async () => {
        let firstLaunch = await SecureStore.getItemAsync("alreadyLaunched");
        if (firstLaunch === null) {
            await SecureStore.setItemAsync("alreadyLaunched", "true");
            setIsFirstLaunch(true);
        } else {
            setIsFirstLaunch(false);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    if (isFirstLaunch === null) {
        return null;
    } else if (isFirstLaunch === true) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                {isFirstLaunch === true && (
                    <Stack.Screen name='onboarding' component={Onboard} />
                )}
                <Stack.Screen name='show-always' component={ShowAlways} />
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='show-always' component={ShowAlways} />
            </Stack.Navigator>
        );
    }
};

export default Welcome;

const ShowAlways = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name='DrawerStack' component={DrawerStack} />

            {/* product stack navigation */}
            <Stack.Screen name='Product Details' component={ProductDetails} />
            <Stack.Screen name='feature display' component={FeatureDisplay} />

            {/* profile stack navigation */}
            <Stack.Screen name='edit profile' component={EditProfile} />
            <Stack.Screen name='address book' component={Address} />
            <Stack.Screen name='add new address' component={AddNewAddress} />
            <Stack.Screen name='order history' component={OrderHistory} />
            <Stack.Screen name='order details' component={OrderDetails} />
            <Stack.Screen name='my reviews' component={MyReviews} />
            <Stack.Screen name='my refund' component={MyRefund} />
            <Stack.Screen name='refund' component={RefundRequest} />
            <Stack.Screen name='refund list' component={RefundList} />
            <Stack.Screen name='refund details' component={RefundDetails} />
            <Stack.Screen name='order summary' component={OrderSummary} />
            <Stack.Screen name='billing info' component={BillingInformation} />
            <Stack.Screen name='order done' component={OrderConfirmed} />
            <Stack.Screen name='reviews' component={Reviews} />
            <Stack.Screen name='payment webview' component={PaymentView} />
            <Stack.Screen
                options={{
                    animation: "none",
                }}
                name='filter home'
                component={FilterHome}
            />
            <Stack.Screen name='filters' component={Filters} />
            <Stack.Screen name='Write a Review' component={WriteReviews} />
            <Stack.Screen name='Edit Review' component={EditReview} />
            <Stack.Screen name='track order' component={TrackOrder} />
            {/*  */}
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='Forget Password' component={ForgetPassword} />
            <Stack.Screen name='Reset Password' component={ResetPassword} />
            <Stack.Screen
                name='Password Reset Done'
                component={PasswordChanged}
            />
            {/*  */}
            <Stack.Screen name='registration' component={Registration} />
            <Stack.Screen name='Confirm Email' component={ConfirmEmail} />
            <Stack.Screen name='Account Created' component={AccountCreated} />
        </Stack.Navigator>
    );
};
