import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../constants/color";
import { useNavigation } from "@react-navigation/native";

export default Section = ({ header, deals }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.foodCard}>
      <Text style={{ fontWeight: "900" }}>{item.name}</Text>
      <Text style={{ color: COLORS.PRIMARY, fontWeight: "900" }}>
        GHC{item.price}
      </Text>
      <Image style={styles.imageStyle} source={{ uri: item.image }} />
      <Text style={styles.restaurantStyle}>{item.restaurantId.name}</Text>
      <Text style={styles.locationStyle}>{item.location}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.PRIMARY,
          padding: 10,
          alignItems: "center",
          borderRadius: 5,
        }}
        onPress={() => navigation.navigate("FoodDetails", { foodId: item._id })}
      >
        <Text style={{ color: "white" }}>View More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.sectionView}>
      <Text style={styles.SectionHeader}>{header}</Text>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2} // set number of columns
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  SectionHeader: {
    fontWeight: "700",
    fontSize: 24,
  },
  sectionView: {
    marginTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  foodCard: {
    backgroundColor: COLORS.SECONDARY,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    width: "50%", // adjust width for grid layout
    margin: "1%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  list: {
    justifyContent: "space-between",
  },
  locationStyle: {
    color: "black",
  },
  restaurantStyle: {
    color: COLORS.PRIMARY,
    textDecorationLine: "underline",
    fontWeight: "200",
    fontSize: 16,
    textAlign: "center",
  },
});
