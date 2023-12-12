import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import FoodItem from "./FoodItem";
import PendingFoodOrder from "./PendingFoodOrder";

const PendingOrders = () => {
    const data = [
      {
        id: "1",
        name: "Food 1",
        price: "10",
        image: require("../assets/background.jpg"),
        preferences: ["Extra cheese", "No onions"],
        quantity: 2,
        total: "20",
        status: "Pending",
      },
      {
        id: "2",
        name: "Food 2",
        price: "15",
        image: require("../assets/background.jpg"),
        preferences: ["Spicy"],
        quantity: 1,
        total: "15",
        status: "Pending",
      },
      // add more items here
    ];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <PendingFoodOrder item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default PendingOrders;
