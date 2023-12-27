import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import { COLORS } from "../../constants/color";
import { paystackDeposit } from "../../utils/API/api";

export default function Deposit({ navigation }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [authorizationUrl, setAuthorizationUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = await paystackDeposit(email, amount, phoneNumber);
      setAuthorizationUrl(url);
      setSnackbarVisible(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = () => {
    Linking.openURL(authorizationUrl);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="envelope" type="font-awesome" color="#808080" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#808080"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="money" type="font-awesome" color="#808080" />
        <TextInput
          placeholder="Amount"
          style={styles.input}
          placeholderTextColor="#808080"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" type="font-awesome" color="#808080" />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          placeholderTextColor="#808080"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Button
        color={COLORS.PRIMARY}
        title="Deposit"
        onPress={handleSubmit}
        loading={loading}
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
        timeout={2000}
        action={{
          label: "Complete Payment Here",
          onPress: handlePayment,
        }}
        wrapperStyle={{
          backgroundColor: COLORS.PRIMARY,
        }}
      >
        Amount would be deposited once it has been verified
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
