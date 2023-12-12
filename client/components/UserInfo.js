import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { COLORS } from "../constants/color";
import * as Location from "expo-location";
import { getData } from "../utils/Storage/storage";
import { LinearGradient } from "expo-linear-gradient";

const UserInfo = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [region, setRegion] = useState(null);
  console.log(locationName);
  useEffect(() => {
    // Fetch user data from the local storage
    getData("user")
      .then((user) => {
        setUser(user.user);
      })
      .catch((error) => {
        console.error(error);
      });

    // Get device location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Get location name
      let geocoded = await Location.reverseGeocodeAsync(location.coords);
      setLocationName(geocoded[0].name); // Use the city as the location name
      setRegion(geocoded[0].region); // Use the city as the location name

      console.log(geocoded);
    })();
  }, []);

if (!user || !location) {
  return (
    <LinearGradient
      colors={["#eeeeee", "#dddddd", "#eeeeee"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: 20, width: "100%", marginBottom: 10 }}
    />
  );
}

  return (
    <View style={styles.infoView}>
      <View style={styles.geoInfoView}>
        <Text>My location</Text>
        <Text style={styles.locationText}>
          {locationName}, {region}
        </Text>
      </View>
      <View style={styles.profilePicView}>
        <Text
          style={styles.walletAmount}
          onPress={() => navigation.navigate("Wallet")}
        >
          ${user.wallet}
        </Text>
        <Avatar
          rounded
          title={user.fullName
            .split(" ")
            .map((name) => name[0])
            .join("")}
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
  geoInfoView: {
    flex: 1,
  },
});

export default UserInfo;
