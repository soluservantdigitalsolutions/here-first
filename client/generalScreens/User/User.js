import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Header, Icon } from "react-native-elements";
import { COLORS } from "../../constants/color";
import RestaurantForm from "../../generalScreens/ResturantForm/ResturantForm.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkUserHasRestaurant } from "../../utils/API/api";
import { getData } from "../../utils/Storage/storage";

export default function User({ navigation }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userHasRestaurant, setUserHasRestaurant] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = await getData("user");
      setCurrentUser(user.user);
      if (user) {
        setIsSignedIn(true);
        try {
          const { data: hasRestaurant } = await checkUserHasRestaurant(
            user.user._id
          );
          setUserHasRestaurant(hasRestaurant);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    checkAuthStatus();
  }, []);
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
              <Text style={styles.fullName}>{currentUser?.fullName}</Text>
              <Text style={styles.username}>{currentUser?.username}</Text>
            </View>

            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>Current Balance</Text>
              <Text style={styles.balanceAmount}>${currentUser?.wallet}</Text>
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
                  onPress={() =>
                    userHasRestaurant
                      ? navigation.navigate("RestaurantProfile", {
                          userId: currentUser._id,
                        })
                      : navigation.navigate("RestaurantForm")
                  }
                />
              </View>
              <View style={styles.menucontainer}>
                <Icon
                  name="money-bill"
                  type="font-awesome-5"
                  color={COLORS.PRIMARY}
                />
                <Text style={styles.infoText}>Deposit</Text>
                <Icon
                  name="angle-right"
                  type="font-awesome"
                  color={COLORS.PRIMARY}
                  onPress={() => navigation.navigate("Deposit")}
                />
              </View>
              <View style={styles.menucontainer}>
                <Icon
                  name="wallet"
                  type="font-awesome-5"
                  color={COLORS.PRIMARY}
                />
                <Text style={styles.infoText}>Withdrawal</Text>
                <Icon
                  name="angle-right"
                  type="font-awesome"
                  color={COLORS.PRIMARY}
                  onPress={() => navigation.navigate("Withdrawal")}
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
    backgroundColor: COLORS.SECONDARY,
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
  balanceContainer: {
    width: "100%",
    height: 100,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  balanceText: {
    color: "#fff",
    fontSize: 16,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
