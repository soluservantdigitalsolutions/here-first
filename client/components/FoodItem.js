import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { COLORS } from "../constants/color";
import QuantitySelector from "./QuantitySelector";
import foodImg from "../assets/background.jpg";
import { Button } from "react-native-elements";
import { CartContext } from "../context/CartContext";

const FoodItem = ({ item, removeItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={{ fontWeight: "900", fontSize: 24 }}>{item.name}</Text>
        <Text>{item.restaurantName}</Text>
        <Text
          style={{
            fontWeight: "900",
          }}
        >
          Preferences:{" "}
        </Text>
        <Text>{item.preferences.join(", ")}</Text>
        <Button
          title="Remove"
          onPress={removeItem}
          containerStyle={{
            marginVertical: 10,
          }}
          buttonStyle={{
            backgroundColor: "red",
          }}
        />
        <View style={styles.priceQuantityContainer}>
          <Text
            style={{ fontWeight: "900", fontSize: 16, color: COLORS.PRIMARY }}
          >
            ${item.price}
          </Text>
          <QuantitySelector
            quantity={item.quantity}
            setQuantity={(newQuantity) => {
              const newCart = [...cart];
              const itemIndex = newCart.findIndex(
                (cartItem) => cartItem.id === item.id
              );
              newCart[itemIndex].quantity = newQuantity;
              setCart(newCart);
            }}
          />
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
    objectFit: "cover",
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
