import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS } from "../../constants/color";
import { Button } from "react-native-elements";
import { Input, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { createFood, getUser } from "../../utils/API/api";
import { getData } from "../../utils/Storage/storage";
import { Snackbar } from "react-native-paper";

export default function UploadFood({ navigation }) {
  const [foodImage, setFoodImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [preferences, setPreferences] = useState("");
  const [location, setLocation] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const selectFoodImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFoodImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!name || !description || !price || !foodImage) {
        setSnackbarMessage("All fields are required");
        setSnackbarVisible(true);
        return;
      }

      const user = await getData("user");
      const userDetails = await getUser(user.user._id);
      setRestaurantId(userDetails.data.restaurantId);
      console.log(restaurantId);

      const newFood = {
        name: name,
        description: description,
        price: price,
        image: foodImage,
        preferences: preferences.split(",").map((pref) => pref.trim()), // assuming preferences are comma-separated
        location: location,
        restaurantId: restaurantId,
      };

      const response = await createFood(newFood);
      console.log(response.data);
      navigation.navigate("Home");
      setSnackbarMessage("Food uploaded successfully");
      setSnackbarVisible(true);
    } catch (error) {
      console.error(error);
      setSnackbarMessage("An error occurred");
      setSnackbarVisible(true);
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
            Upload Your Food on{" "}
            <Text style={{ color: COLORS.PRIMARY }}>HereFirst! </Text>{" "}
          </Text>
          <View style={styles.inputContainer}>
            <Button
              title="Select Food Image"
              buttonStyle={{ backgroundColor: COLORS.PRIMARY }}
              onPress={selectFoodImage}
            />
            {foodImage && (
              <Image
                source={{ uri: foodImage }}
                style={{ width: 50, height: 50 }}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Icon name="cutlery" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Food Name"
              style={styles.input}
              placeholderTextColor="#808080"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="info-circle" type="font-awesome" color="#808080" />

            <TextInput
              placeholder="Food Description"
              style={styles.input}
              placeholderTextColor="#808080"
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="dollar" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Food Price"
              style={styles.input}
              placeholderTextColor="#808080"
              value={price}
              onChangeText={setPrice}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="map-marker" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Food Location"
              style={styles.input}
              placeholderTextColor="#808080"
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="list" type="font-awesome" color="#808080" />
            <TextInput
              placeholder="Food Preferences (comma-separated)"
              style={styles.input}
              placeholderTextColor="#808080"
              value={preferences}
              onChangeText={setPreferences}
            />
          </View>

          <Button
            color={COLORS.PRIMARY}
            title="Upload Food"
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
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerText}>
              Don't want to upload a Food? Go back
            </Text>
          </TouchableOpacity>
        </View>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={Snackbar.DURATION_SHORT}
          wrapperStyle={{
            backgroundColor: COLORS.PRIMARY,
          }}
        >
          {snackbarMessage}
        </Snackbar>
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
  input: {
    width: "100%",
    backgroundColor: "#D3D3D3",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    textAlign: "center",
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
