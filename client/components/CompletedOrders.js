import React from "react";
import { View, FlatList } from "react-native";
import CompletedFoodOrder from "../components/CompletedFoodOrder";

// replace this with your actual data
const data = [
  {
    id: "1",
    name: "Food 1",
    price: "10",
    image: require("../assets/background.jpg"),
    preferences: ["Extra cheese", "No onions"],
    quantity: 2,
    total: "20",
    status: "Completed",
  },
  {
    id: "2",
    name: "Food 2",
    price: "15",
    image: require("../assets/background.jpg"),
    preferences: ["Spicy"],
    quantity: 1,
    total: "15",
    status: "Completed",
  },
  // add more items here
];

const CompletedOrders = () => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <CompletedFoodOrder item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CompletedOrders;
