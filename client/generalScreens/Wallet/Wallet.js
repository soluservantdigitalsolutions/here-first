import React, { useState } from "react";
import {
  View,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../constants/color";

export default function Wallet() {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleTransaction = async () => {
    // Handle the transaction here
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>HF</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Deposit or Withdraw using MTN Mobile Money
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="money" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Amount"
              style={styles.input}
              placeholderTextColor="#808080"
              onChangeText={setAmount}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              placeholderTextColor="#808080"
              onChangeText={setPhoneNumber}
            />
          </View>
          <Button
            color={COLORS.PRIMARY}
            title="Submit"
            onPress={handleTransaction}
            containerStyle={{
              width: "100%",
              justifyContent: "center",
            }}
            buttonStyle={{
              backgroundColor: COLORS.PRIMARY,
              padding: 10,
              borderRadius: 10,
            }}
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
  formContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    margin: 20,
    borderRadius: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
});
