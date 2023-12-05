import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Header, Icon } from "react-native-elements";
import { COLORS } from "../../constants/color";
import RestaurantForm from "../../generalScreens/ResturantForm/ResturantForm.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function User({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <Header
            style={{
              padding: 20,
            }}
            backgroundColor={COLORS.PRIMARY}
            leftComponent={{
              icon: "close",
              color: "#fff",
              onPress: () => navigation.goBack(),
            }}
            centerComponent={{ text: "Your Profile", style: { color: "#fff" } }}
            rightComponent={{ icon: "notifications", color: "#fff" }}
          />
          <View style={styles.container}>
            <View style={{ padding: 20 }}>
              <Avatar
                size="large"
                rounded
                title="SA"
                containerStyle={{ backgroundColor: COLORS.PRIMARY }}
              />
              <Text style={styles.fullName}>Sylvester Asante</Text>
              <Text style={styles.username}>@asantesylvesterkwame</Text>
            </View>
            <View style={{ width: "100%" }}>
              <View style={styles.menucontainer}>
                <Icon
                  name="user-o"
                  type="font-awesome"
                  color={COLORS.PRIMARY}
                />
                <Text style={styles.infoText}>Personal Information</Text>
                <Icon
                  name={isMenuOpen ? "angle-up" : "angle-down"}
                  type="font-awesome"
                  color={COLORS.PRIMARY}
                  onPress={() => setIsMenuOpen(!isMenuOpen)}
                />
              </View>
              {isMenuOpen && (
                <View style={styles.menuContainer}>
                  <View
                    style={{
                      width: "100",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Text style={styles.personalInfoText}>
                      Sylvester Asante
                    </Text>
                    <Text style={styles.personalInfoText}>
                      soluservant@gmail.com
                    </Text>
                  </View>
                  <Button
                    buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
                    title="Edit"
                    onPress={() => {}}
                  />
                </View>
              )}
              <View style={styles.menucontainer}>
                <Icon
                  name="restaurant"
                  type="material-icons"
                  color={COLORS.PRIMARY}
                />
                <Text style={styles.infoText}>My Restaurant</Text>
                <Icon
                  name="angle-right"
                  type="font-awesome"
                  color={COLORS.PRIMARY}
                  onPress={() => navigation.navigate("RestaurantForm")}
                />
              </View>
              <View style={styles.menucontainer}>
                <Icon name="logout" type="material-icons" color={"red"} />
                <Text style={{ ...styles.infoText, color: "red" }}>Logout</Text>
                <Icon
                  name="angle-right"
                  type="font-awesome"
                  color={"red"}
                  onPress={async () => {
                    await AsyncStorage.removeItem("user"); // replace 'userToken' with the key you used to store the token
                    navigation.navigate("Login"); // replace 'Login' with the name of your login screen
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    backgroundColor: COLORS.COMPLIMENTARY,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 24,
    color: COLORS.PRIMARY,
  },
  menucontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: COLORS.SECONDARY,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },
  menuContainer: {
    padding: 10,
    gap: 10,
    backgroundColor: COLORS.SECONDARY,
    width: "100%", // Add this line
    flexDirection: "row",
  },
  fullNameMenu: {
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  email: {
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  personalInfoText: {
    fontSize: 16,
    fontWeight: "200",
  },
});
