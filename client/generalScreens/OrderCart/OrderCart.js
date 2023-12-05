import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserInfo from "../../components/UserInfo";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import OrderTabs from "../../components/OrderTabs";

const OrderCart = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { flex: 1 }]}>
          <UserInfo navigation={navigation} />
          <View>
            <Text style={styles.pageTitle}>Order Cart</Text>
          </View>

          <OrderTabs />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: "900",
  },
});

export default OrderCart;
