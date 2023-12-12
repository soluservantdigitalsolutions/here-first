import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { COLORS } from "../constants/color";
import { getFoodsByRestaurant, getUser } from "../utils/API/api";
import { getData } from "../utils/Storage/storage";
import FoodList from "./FoodList";

const FoodListings = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      const user = await getData("user");
      const userDetails = await getUser(user.user._id);
      setRestaurantId(userDetails.data.restaurantId);

      const response = await getFoodsByRestaurant(restaurantId); // replace with actual restaurantId
      setData(response.data);
    };

    fetchFoods();
  }, [restaurantId]);
  // add more items here
  return (
    <View>
      <Button
        title="Upload New Food Listing"
        buttonStyle={{
          backgroundColor: COLORS.PRIMARY,
          margin: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate("UploadFood");
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <FoodList key={data._id} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default FoodListings;
