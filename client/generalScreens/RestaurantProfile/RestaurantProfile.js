import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/color";
import { Icon } from "react-native-elements";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FoodListings from "../../components/FoodListings";
import PendingOrders from "../../components/PendingOrders";
import CompletedOrders from "../../components/CompletedOrders";
import { useRoute } from "@react-navigation/native";
import { getRestaurant } from "../../utils/API/api";

function RestaurantProfile() {
  const { params } = useRoute();
  const { userId } = params; // get userId from route parameters
  console.log(userId);
  const [restaurant, setRestaurant] = useState(null);
  console.log("Restaurant,", restaurant);
  React.useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getRestaurant(userId);
        setRestaurant(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurant();
  }, [userId]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "foodListings", title: "Food Listings" },
    { key: "pendingOrders", title: "Pending Orders" },
    { key: "completedOrders", title: "Completed Orders" },
  ]);
  const renderScene = SceneMap({
    foodListings: FoodListings,
    pendingOrders: PendingOrders,
    completedOrders: CompletedOrders,
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.upperView}>
          <ImageBackground
            source={{ uri: restaurant?.coverPicture }} // replace with the path to your logo image
            style={styles.imageBackground}
          ></ImageBackground>
        </View>
        <View style={styles.restaurantDetails}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: restaurant?.profilePicture }} // replace with the path to your logo image
              style={styles.logo}
            />
          </View>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          <Text style={styles.restaurantDescription}>
            {restaurant?.description}
          </Text>
          <Text style={styles.restaurantAddress}>{restaurant?.address}</Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: "100%" }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: COLORS.PRIMARY }}
              activeColor={COLORS.PRIMARY}
              inactiveColor="gray"
              style={{ backgroundColor: "white" }}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 0.3,
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    overflow: "hidden",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(46, 204, 64, 0.2)",
  },
  lowerView: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  IconBg: {
    backgroundColor: COLORS.SECONDARY,
    padding: 10,
    borderRadius: 9999,
    width: 45,
    height: 45,
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: -50, // half of the logo's height
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, // half of the logo's width and height
    borderWidth: 2, // adjust this value as needed
    borderColor: COLORS.SECONDARY, // adjust this value as needed
  },
  restaurantDetails: {
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.PRIMARY,
    paddingTop: 75,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.SECONDARY,
    textAlign: "center",
  },
  restaurantDescription: {
    fontSize: 16,
    fontWeight: "300",
    color: COLORS.SECONDARY,
    textAlign: "center",
  },
  restaurantAddress: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.SECONDARY,
    textAlign: "center",
  },
});

export default RestaurantProfile;
