import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/color";
import FoodItem from "./FoodItem";
import OrderSummary from "./OrderSummary";

const dummyData = [
  {
    image: "https://via.placeholder.com/150",
    foodName: "Food 1",
    restaurantName: "Restaurant 1",
    price: "$10",
  },
  {
    image: "https://via.placeholder.com/150",
    foodName: "Food 2",
    restaurantName: "Restaurant 2",
    price: "$20",
  },
  // Add more dummy data here
];
const ConfirmProduct = () => {
  return (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      {dummyData.map((item, index) => (
        <FoodItem key={index} item={item} />
      ))}
      <OrderSummary items={dummyData} />
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          type="outline"
          buttonStyle={styles.cancelButton}
          titleStyle={{ color: "gray" }}
        />
        <Button
          title="Confirm Product"
          buttonStyle={styles.confirmButton}
          containerStyle={{ width: "70%" }}
        />
      </View>
    </ScrollView>
  );
};
const ConfirmPurchase = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.scene} showsVerticalScrollIndicator={false}>
      <OrderSummary items={dummyData} />
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          type="outline"
          buttonStyle={styles.cancelButton}
          titleStyle={{ color: "gray" }}
        />
        <Button
          title="Confirm Purchase"
          buttonStyle={styles.confirmButton}
          containerStyle={{ width: "70%" }}
          onPress={() => navigation.navigate("ThanksForOrdering")}
        />
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
    product: ConfirmProduct,
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
});

export default OrderTabs;
