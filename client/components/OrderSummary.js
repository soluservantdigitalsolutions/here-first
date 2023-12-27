import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderSummary = ({ items }) => {
  const totalPrice = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={{ color: "gray", fontWeight: "700" }}>{item?.name}</Text>
          <Text style={{ fontWeight: "900" }}>${item?.price}</Text>
        </View>
      ))}
      <View style={styles.line} />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontWeight: "900",
    color: "green",
  },
  totalPrice: {
    fontWeight: "900",
    color: "green",
  },
});

export default OrderSummary;
