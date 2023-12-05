import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS } from "../constants/color";

const UserInfo = ({ navigation }) => {
  const walletAmount = Math.floor(Math.random() * 1000); // Generate a random amount

  return (
    <View style={styles.infoView}>
      <View style={styles.geoInfoView}>
        <Text>My location</Text>
        <Text style={styles.locationText}>Accra, Ghana</Text>
      </View>
      <View style={styles.profilePicView}>
        <Text
          style={styles.walletAmount}
          onPress={() => navigation.navigate("Wallet")}
        >
          ${walletAmount}
        </Text>{" "}
        <Avatar
          rounded
          title="SA"
          size="medium"
          containerStyle={{ backgroundColor: COLORS.PRIMARY }}
          onPress={() => navigation.navigate("User")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  locationText: {
    color: COLORS.PRIMARY,
    fontWeight: "900",
    fontSize: 20,
  },
  walletAmount: {
    color: COLORS.PRIMARY,
    fontWeight: "900",
    fontSize: 16,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    borderColor: COLORS.PRIMARY,
  },
  profilePicView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default UserInfo;
