import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { COLORS } from "../constants/color";
import QuantitySelector from "./QuantitySelector";
import foodImg from "../assets/background.jpg";

const FoodItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={foodImg} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={{ fontWeight: "900", fontSize: 24 }}>{item.foodName}</Text>
        <Text>{item.restaurantName}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text
            style={{ fontWeight: "900", fontSize: 16, color: COLORS.PRIMARY }}
          >
            {item.price}
          </Text>
          <QuantitySelector />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit:"cover"
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  priceQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FoodItem;
