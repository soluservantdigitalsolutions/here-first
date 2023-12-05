import React, { useState } from "react";
import { View, TextInput, ImageBackground, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { signin } from "../../utils/API/api.js";
import { Snackbar } from "react-native-paper";
import { storeData } from "../../utils/Storage/storage.js";
import { AuthContext } from "../../context/AuthContext";
import { COLORS } from "../../constants/color";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { changeAuthStatus } = React.useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await signin({ email, password });
      await storeData("user", response.data);
      changeAuthStatus(true);
      navigation.navigate("Home");
      setSnackbarMessage("Login Successful!");
      setVisible(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Email or Password is Incorrect!");
      setVisible(true);
    } finally {
      setLoading(false);
    }
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
            Login to Your Account on
            <Text style={{ color: COLORS.PRIMARY }}>HereFirst! </Text>{" "}
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="envelope" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#808080"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="lock" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              style={styles.input}
              placeholderTextColor="#808080"
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Icon
                name={isPasswordVisible ? "eye-slash" : "eye"}
                type="font-awesome"
                color="#808080"
              />
            </TouchableOpacity>
          </View>
          <Button
            color={COLORS.PRIMARY}
            title="Login"
            onPress={handleLogin}
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
          <Button
            titleStyle={{
              color: COLORS.PRIMARY,
            }}
            title="Don't have an account? Register"
            type="clear"
            onPress={() => navigation.navigate("Register")}
          />
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={Snackbar.DURATION_SHORT}
          >
            {snackbarMessage}
          </Snackbar>
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