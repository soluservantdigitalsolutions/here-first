import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/color";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity}>
        <Text style={styles.button}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity onPress={increaseQuantity}>
        <Text style={styles.button}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
  button: {
    fontSize: 20,
    marginHorizontal: 10,
    color: COLORS.SECONDARY,
  },
  quantity: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 5,
    width: "",
  },
});

export default QuantitySelector;
