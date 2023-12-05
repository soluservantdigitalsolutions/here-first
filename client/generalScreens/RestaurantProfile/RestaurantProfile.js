import React from "react";
import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RestaurantProfile() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Restaurant Profile Page</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
