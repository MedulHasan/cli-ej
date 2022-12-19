import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigation from "./TabNavigation";
import MyWishlist from "../../screens/MyWishlist/MyWishlist";
import DrawerContainer from "./DrawerContainer/DrawerContainer";
import TrackOrderInput from "../../screens/TrackOrder/TrackOrderInput";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props) => <DrawerContainer {...props} />}
        >
            <Drawer.Screen name='HomeScreen' component={TabNavigation} />
            <Drawer.Screen name='my wishlist' component={MyWishlist} />
            <Drawer.Screen
                name='track your order'
                component={TrackOrderInput}
            />
        </Drawer.Navigator>
    );
};
export default DrawerStack;
