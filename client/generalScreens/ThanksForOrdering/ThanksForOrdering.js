import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import OrderSummary from "../../components/OrderSummary";
import UserInfo from "../../components/UserInfo";
import { COLORS } from "../../constants/color";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../../context/CartContext";

const ThanksForOrdering = ({  }) => {
  const navigation = useNavigation();
const [cart, setCart] = useContext(CartContext);
  

  return (
    <ScrollView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView>
          <UserInfo navigation={navigation} />
          <Image
            source={require("../../assets/shoppingBag.png")}
            style={styles.shoppingBag}
          />
          <Text style={styles.thanksText}>Thanks for Ordering</Text>
          <OrderSummary items={cart} />
          <View style={styles.buttonContainer}>
            {/* <Button
              title="Cancel"
              type="outline"
              buttonStyle={styles.cancelButton}
              titleStyle={{ color: "gray" }}
            /> */}
            <Button
              title="Continue Finding Food"
              buttonStyle={styles.confirmButton}
              containerStyle={{ width: "100%" }}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  shoppingBag: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  thanksText: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.PRIMARY,
    textAlign: "center",
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  cancelButton: {
    borderColor: "gray",
    padding: 20,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
});

export default ThanksForOrdering;
