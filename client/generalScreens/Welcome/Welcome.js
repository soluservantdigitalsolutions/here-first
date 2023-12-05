import React from "react";
import { View, ImageBackground, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/color";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>HF</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => navigation.navigate("Login")}
            containerStyle={styles.button}
            buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
            containerStyle={styles.button}
            buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(46, 204, 64, 0.5)",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 48,
    fontWeight: "900",
    color: COLORS.SECONDARY,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    padding: 10,
  },
});
