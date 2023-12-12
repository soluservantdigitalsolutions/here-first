import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./generalScreens/Login/Login";
import Register from "./generalScreens/Register/Register.js";
import Welcome from "./generalScreens/Welcome/Welcome.js";
import Home from "./generalScreens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "./generalScreens/User/User";
import TabNavigator from "./components/TabNavigator/TabNavigator";
import { AuthContext } from "./context/AuthContext.js";
import { getData } from "./utils/Storage/storage.js";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RestaurantForm from "./generalScreens/ResturantForm/ResturantForm";
import RestaurantProfile from "./generalScreens/RestaurantProfile/RestaurantProfile";
import FoodDetailsScreen from "./generalScreens/FoodDetails/FoodDetails";
import OrderCart from "./generalScreens/OrderCart/OrderCart";
import ThanksForOrdering from "./generalScreens/ThanksForOrdering/ThanksForOrdering";
import Wallet from "./generalScreens/Wallet/Wallet";
import VerifyEmail from "./generalScreens/VerifyEmail/VerifyEmail";
import UploadFood from "./generalScreens/UploadFood/UploadFood";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = await getData("user");
      if (user) {
        setIsSignedIn(true);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, changeAuthStatus: setIsSignedIn }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {isSignedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RestaurantForm"
                component={RestaurantForm}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RestaurantProfile"
                component={RestaurantProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FoodDetails"
                component={FoodDetailsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="OrderCart"
                component={OrderCart}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ThanksForOrdering"
                component={ThanksForOrdering}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="User"
                component={User}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Wallet"
                component={Wallet}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="UploadFood"
                component={UploadFood}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
