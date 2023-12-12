import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { COLORS } from "../constants/color";

const PendingFoodOrder = ({ item }) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={{ fontWeight: "900", fontSize: 24 }}>{item.name}</Text>
          <Text>${item.price}</Text>
          <Text>Preferences: {item.preferences.join(", ")}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Total: $ {item.total}</Text>
        </View>
      </View>
      <Button
        title={item.status}
        color={item.status === "Pending" ? "orange" : "green"}
        buttonStyle={{
          backgroundColor: COLORS.COMPLIMENTARY,
          width: "100%",
          borderRadius: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.SECONDARY,
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

export default PendingFoodOrder;
