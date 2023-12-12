import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { COLORS } from "../constants/color";

const FoodList = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item?.image }} // replace with the path to your logo image
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={{ fontWeight: "900", fontSize: 24 }}>{item.name}</Text>
        <Text style={{ color: COLORS.PRIMARY, fontWeight: "900" }}>
          ${item?.price}
        </Text>
        <Text style={styles.locationText}>{item.location}</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            navigation.navigate("FoodDetails", { foodId: item._id });
          }}
        >
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationText: {
    fontWeight: "400",
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: COLORS.PRIMARY, // replace with your preferred color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white", // replace with your preferred color
  },
});
