import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/color";
import { CartContext } from "../context/CartContext";
import FoodItem from "./FoodItem";
import OrderSummary from "./OrderSummary";
import { getData } from "../utils/Storage/storage";
import { createOrder } from "../utils/API/api";

const ConfirmProduct = ({ setIndex }) => {
  const [cart, setCart] = useContext(CartContext);
  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (item) => {
    setCart((currentCart) =>
      currentCart.filter((cartItem) => cartItem.name !== item.name)
    );
  };
  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>You have nothing in the Cart</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      {cart.map((item, index) => (
        <FoodItem
          key={index}
          item={item}
          removeItem={() => removeFromCart(item)}
        />
      ))}
      <OrderSummary items={cart} />
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          type="outline"
          buttonStyle={styles.cancelButton}
          titleStyle={{ color: "gray" }}
          onPress={clearCart}
        />
        <Button
          title="Confirm Product"
          buttonStyle={styles.confirmButton}
          containerStyle={{ width: "70%" }}
          onPress={() => setIndex(1)} // switch to the "Confirm Purchase" tab
        />
      </View>
    </ScrollView>
  );
};
const ConfirmPurchase = () => {
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    getData("user")
      .then((user) => {
        setUserId(user.user._id);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("cart is ", cart);
  }, []);
  const clearCart = () => {
    setCart([]);
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    setError(null);
    try {
      // Gather the necessary data from the cart
      const ordersData = cart.map((item) => ({
        userId: userId, // replace with actual user ID
        food: {
          id: item.foodId,
          quantity: item.quantity,
        },
        restaurantId: item.restaurantId,
        foodPreferences: item.foodPreferences,
      }));

      // Create the orders
      for (const orderData of ordersData) {
        await createOrder(orderData);
      }

      // Clear the cart and navigate to the "ThanksForOrdering" screen
      clearCart();
      navigation.navigate("ThanksForOrdering");
    } catch (error) {
      setError("Error creating order");
      console.log(error);
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };
  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>You have nothing in the Cart</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      <OrderSummary items={cart} />
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          type="outline"
          buttonStyle={styles.cancelButton}
          titleStyle={{ color: "gray" }}
          onPress={clearCart}
        />
        <Button
          title="Confirm Purchase"
          buttonStyle={styles.confirmButton}
          containerStyle={{ width: "70%" }}
          onPress={handleConfirmPurchase}
          disabled={loading}
        />
        <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
          {error}
        </Snackbar>
      </View>
    </ScrollView>
  );
};
const OrderTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "product", title: "Confirm Product" },
    { key: "purchase", title: "Confirm Purchase" },
  ]);

  const renderScene = SceneMap({
    product: () => <ConfirmProduct setIndex={setIndex} />,
    purchase: ConfirmPurchase,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "green" }}
      style={{ backgroundColor: "transparent", shadowColor: "none" }}
      renderLabel={({ route, focused, color }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {route.key === "product" && (
            <Icon
              name="cube"
              size={20}
              color={focused ? COLORS.PRIMARY : "gray"}
            />
          )}
          {route.key === "purchase" && (
            <Icon
              name="card-outline"
              size={20}
              color={focused ? COLORS.PRIMARY : "gray"}
            />
          )}
          <Text style={{ color: focused ? COLORS.PRIMARY : "gray", margin: 8 }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: "100%" }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    borderColor: "gray",
    padding: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    color: "gray",
  },
});

export default OrderTabs;
